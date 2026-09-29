import { useEffect, useState } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom'
import { MembersPage } from './pages/MembersPage'
import { ScheduleGroupsPage } from './pages/ScheduleGroupsPage'
import { PaymentsPage } from './pages/PaymentsPage'
import { NoticesPage } from './pages/NoticesPage'
import { AuthPage } from './pages/AuthPage'
import { CheckInPage } from './pages/CheckInPage'
import { CashPage } from './pages/CashPage'
import { PlansPage } from './pages/PlansPage'
import { Brand } from './Brand'
import { apiFetch, METHODS, money, type Method } from './api'

type Admin = { id: string; email: string }
type Stats = {
  activeMembers: number; pausedMembers: number; overduePayments: number; sentMessages: number; checkInsToday: number; newMembers: number
  incomeThisMonth: number; expectedMonthly: number; byMethod: Partial<Record<Method, number>>
  monthly: { month: string; total: number }[]
  atRisk: { id: string; name: string; phone: string; lastCheckIn: string | null }[]
}

const monthLabel = (month: string) => new Date(`${month}-15T12:00:00Z`).toLocaleDateString('es-AR', { month: 'short' })

function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    void apiFetch('/dashboard').then(async (response) => { if (response.ok) setStats(await response.json()) })
  }, [])

  const value = (amount?: number) => stats ? amount : '—'
  const collected = stats && stats.expectedMonthly ? Math.min(100, Math.round((stats.incomeThisMonth / stats.expectedMonthly) * 100)) : 0
  const maxMonth = Math.max(1, ...(stats?.monthly.map((item) => item.total) ?? []))

  return <>
    <header className="page-header"><div><h1>Panel general</h1><p>Cómo viene el gimnasio hoy y este mes.</p></div><Link className="primary-button button-link" to="/ingreso">Registrar ingreso</Link></header>
    <section className="stats">
      <article className="card"><span>Socios activos</span><strong>{value(stats?.activeMembers)}</strong>{stats && <small>{stats.newMembers} nuevos este mes · {stats.pausedMembers} pausados</small>}</article>
      <article className="card"><span>Ingresos de hoy</span><strong>{value(stats?.checkInsToday)}</strong><small>Check-ins registrados</small></article>
      <article className="card warning"><span>Cuotas vencidas</span><strong>{value(stats?.overduePayments)}</strong><small><Link to="/pagos?socio=Vencido">Ver deudores</Link></small></article>
      <article className="card"><span>Avisos enviados hoy</span><strong>{value(stats?.sentMessages)}</strong><small>Recordatorios por WhatsApp</small></article>
    </section>

    <section className="dashboard-grid">
      <article className="panel">
        <header><h2>Cobranza del mes</h2><Link to="/caja">Ver caja</Link></header>
        <strong className="panel-figure">{stats ? money(stats.incomeThisMonth) : '—'}</strong>
        <p className="panel-muted">de {stats ? money(stats.expectedMonthly) : '—'} esperados en cuotas activas</p>
        <div className="progress" role="progressbar" aria-valuenow={collected} aria-valuemin={0} aria-valuemax={100}><i style={{ width: `${collected}%` }} /></div>
        <ul className="method-list">{stats && Object.entries(stats.byMethod).map(([method, total]) => <li key={method}><span>{METHODS[method as Method]}</span><strong>{money(total ?? 0)}</strong></li>)}</ul>
      </article>

      <article className="panel">
        <header><h2>Ingresos últimos 6 meses</h2></header>
        <div className="bar-chart">{stats?.monthly.map((item) => <div key={item.month} title={money(item.total)}>
          <i style={{ height: `${Math.max(2, (item.total / maxMonth) * 100)}%` }} /><span>{monthLabel(item.month)}</span>
        </div>)}</div>
      </article>

      <article className="panel panel-wide">
        <header><h2>Socios en riesgo de abandono</h2><span className="panel-muted">Sin venir hace más de 14 días</span></header>
        {!stats ? <p className="panel-muted">Cargando...</p> : stats.atRisk.length === 0 ? <p className="panel-muted">Todos los socios activos vinieron en las últimas dos semanas.</p> : <ul className="risk-list">{stats.atRisk.map((member) => <li key={member.id}>
          <div><strong>{member.name}</strong><span>{member.lastCheckIn ? `Último ingreso ${new Date(member.lastCheckIn).toLocaleDateString('es-AR')}` : 'Sin ingresos registrados'}</span></div>
          <a className="small-button secondary" href={`https://wa.me/${member.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`¡Hola ${member.name.split(' ')[0]}! Te extrañamos en Profesional Gym 💪 ¿Te esperamos esta semana?`)}`} target="_blank" rel="noreferrer">Escribirle</a>
        </li>)}</ul>}
      </article>
    </section>
  </>
}

function App() {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    void apiFetch('/auth/me').then(async (response) => {
      if (response.ok) setAdmin(await response.json())
    }).finally(() => setCheckingAuth(false))
  }, [])

  async function logout() {
    await apiFetch('/auth/logout', { method: 'POST' })
    setAdmin(null)
  }

  if (checkingAuth) return <main className="auth-page"><div className="auth-loading">Cargando Profesional Gym...</div></main>
  if (!admin) return <AuthPage onAuthenticated={setAdmin} />

  return <BrowserRouter><div className="layout">
    <aside className="sidebar"><Brand /><nav className="navigation">
      <NavLink to="/" end>Inicio</NavLink><NavLink to="/ingreso">Ingreso</NavLink><NavLink to="/socios">Socios</NavLink><NavLink to="/turnos">Turnos</NavLink><NavLink to="/pagos">Pagos</NavLink><NavLink to="/caja">Caja</NavLink><NavLink to="/avisos">Avisos</NavLink><NavLink to="/planes">Planes</NavLink>
    </nav><div className="sidebar-account"><span>Administrador</span><strong>{admin.email}</strong><button onClick={() => void logout()}>Cerrar sesión</button></div></aside>
    <main className="content"><Routes>
      <Route path="/" element={<Dashboard />} /><Route path="/ingreso" element={<CheckInPage />} /><Route path="/socios" element={<MembersPage />} /><Route path="/turnos" element={<ScheduleGroupsPage />} />
      <Route path="/pagos" element={<PaymentsPage />} /><Route path="/caja" element={<CashPage />} /><Route path="/avisos" element={<NoticesPage />} /><Route path="/planes" element={<PlansPage />} />
    </Routes></main>
  </div></BrowserRouter>
}

export default App
