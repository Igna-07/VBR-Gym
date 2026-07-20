import { useEffect, useState } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import { MembersPage } from './pages/MembersPage'
import { ScheduleGroupsPage } from './pages/ScheduleGroupsPage'
import { PaymentsPage } from './pages/PaymentsPage'
import { NoticesPage } from './pages/NoticesPage'
import { AuthPage } from './pages/AuthPage'
import { apiFetch } from './api'

type Admin = { id: string; email: string }

function Dashboard() {
  const [stats, setStats] = useState({ activeMembers: 0, activeScheduleGroups: 0, overduePayments: 0, sentMessages: 0 })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const response = await apiFetch('/dashboard')
        if (response.ok) setStats(await response.json())
      } finally { setIsLoading(false) }
    }
    void loadStats()
  }, [])

  const value = (amount: number) => isLoading ? '—' : amount
  return <>
    <header className="page-header"><div><h1>Bienvenido a VBR Gym</h1><p>Administrá socios, turnos, pagos y mensajes.</p></div><Link className="primary-button button-link" to="/turnos">Gestionar turnos</Link></header>
    <section className="stats">
      <article className="card"><span>Socios activos</span><strong>{value(stats.activeMembers)}</strong></article>
      <article className="card"><span>Turnos de hoy</span><strong>{value(stats.activeScheduleGroups)}</strong></article>
      <article className="card warning"><span>Cuotas vencidas</span><strong>{value(stats.overduePayments)}</strong></article>
      <article className="card"><span>Mensajes enviados</span><strong>{value(stats.sentMessages)}</strong></article>
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

  if (checkingAuth) return <main className="auth-page"><div className="auth-loading">Cargando V-BR Garage Gym...</div></main>
  if (!admin) return <AuthPage onAuthenticated={setAdmin} />

  return <BrowserRouter><div className="layout">
    <aside className="sidebar"><img className="sidebar-logo" src="/logo2.png" alt="V-BR Garage Gym" /><nav className="navigation"><NavLink to="/" end>Inicio</NavLink><NavLink to="/socios">Socios</NavLink><NavLink to="/turnos">Turnos</NavLink><NavLink to="/pagos">Pagos</NavLink><NavLink to="/avisos">Avisos</NavLink></nav><div className="sidebar-account"><span>Administrador</span><strong>{admin.email}</strong><button onClick={() => void logout()}>Cerrar sesión</button></div></aside>
    <main className="content"><Routes><Route path="/" element={<Dashboard />} /><Route path="/socios" element={<MembersPage />} /><Route path="/turnos" element={<ScheduleGroupsPage />} /><Route path="/pagos" element={<PaymentsPage />} /><Route path="/avisos" element={<NoticesPage />} /></Routes></main>
  </div></BrowserRouter>
}

export default App
