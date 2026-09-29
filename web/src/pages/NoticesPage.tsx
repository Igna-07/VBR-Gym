import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../api'

type Notice = { id: string; paymentId: string; type: 'MESSAGE_FAILED' | 'LONG_OVERDUE' | 'REMINDER_PENDING'; severity: 'HIGH' | 'MEDIUM'; title: string; detail: string; memberName: string; phone: string; whatsappAllowed: boolean; dueDate: string; schedule: string }
type TodayReminder = { id: string; paymentId: string; memberName: string; phone: string; schedule: string; dueDate: string; sentAt: string; paid: boolean; paidAt: string | null }
type TodayReminderSummary = { date: string; total: number; paid: number; pending: number; people: TodayReminder[] }
const emptyTodaySummary: TodayReminderSummary = { date: '', total: 0, paid: 0, pending: 0, people: [] }

export function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [todayReminders, setTodayReminders] = useState<TodayReminderSummary>(emptyTodaySummary)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadNotices() {
    try {
      const [noticesResponse, todayResponse] = await Promise.all([
        apiFetch(`/notices`),
        apiFetch(`/notices/today-reminders`),
      ])
      if (!noticesResponse.ok || !todayResponse.ok) throw new Error()
      setNotices(await noticesResponse.json())
      setTodayReminders(await todayResponse.json())
      setError('')
    } catch { setError('No se pudieron cargar los avisos.') }
    finally { setLoading(false) }
  }
  useEffect(() => {
    void loadNotices()
    const refreshTimer = window.setInterval(() => void loadNotices(), 15_000)
    return () => window.clearInterval(refreshTimer)
  }, [])

  async function retry(notice: Notice) {
    try {
      setError('')
      const response = await apiFetch(`/payments/${notice.paymentId}/send-reminder`, { method: 'POST' })
      if (!response.ok) { const body = await response.json(); throw new Error(body.message || 'No se pudo enviar el aviso.') }
      await loadNotices()
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : 'No se pudo enviar el aviso.') }
  }

  const failed = notices.filter((notice) => notice.type === 'MESSAGE_FAILED').length
  const longOverdue = notices.filter((notice) => notice.type === 'LONG_OVERDUE').length
  const pending = notices.filter((notice) => notice.type === 'REMINDER_PENDING').length

  return <>
    <header className="page-header"><div><h1>Avisos</h1><p>Situaciones automáticas que necesitan atención del administrador.</p></div><button className="secondary-button" onClick={() => void loadNotices()}>Actualizar</button></header>
    <section className="daily-reminder-panel">
      <header><div><span className="live-indicator"><i />Actualización automática</span><h2>Avisos de cuota vencida enviados hoy</h2><p>Revisá quién pagó después del mensaje y quién todavía sigue pendiente.</p></div><strong>{todayReminders.total}</strong></header>
      <div className="daily-reminder-stats"><article><strong>{todayReminders.total}</strong><span>Personas avisadas</span></article><article className="paid"><strong>{todayReminders.paid}</strong><span>Ya pagaron</span></article><article className="pending"><strong>{todayReminders.pending}</strong><span>Siguen pendientes</span></article></div>
      {todayReminders.people.length === 0
        ? <div className="daily-reminder-empty">Todavía no se enviaron avisos de vencimiento hoy.</div>
        : <div className="table-scroll"><table className="daily-reminder-table"><thead><tr><th>Socio</th><th>Teléfono</th><th>Turno</th><th>Aviso enviado</th><th>Estado actual</th></tr></thead><tbody>
          {todayReminders.people.map((person) => <tr key={person.id}><td><Link className="daily-reminder-member-link" to={`/pagos?socio=${encodeURIComponent(person.memberName)}&pago=${person.paymentId}`}>{person.memberName}</Link></td><td>{person.phone}</td><td>{person.schedule}</td><td>{new Date(person.sentAt).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Argentina/Buenos_Aires' })}</td><td><span className={`daily-reminder-status ${person.paid ? 'paid' : 'pending'}`}>{person.paid ? 'Pagó después del aviso' : 'Sigue pendiente'}</span></td></tr>)}
        </tbody></table></div>}
    </section>
    <section className="notice-summary"><article><strong>{notices.length}</strong><span>Total</span></article><article className="danger"><strong>{failed}</strong><span>Mensajes fallidos</span></article><article className="danger"><strong>{longOverdue}</strong><span>Deudas antiguas</span></article><article className="warning"><strong>{pending}</strong><span>Avisos pendientes</span></article></section>
    {error && <div className="error-message">{error}</div>}
    <section className="notice-list">{loading ? <div className="empty-state notice-empty"><p>Cargando avisos...</p></div> : notices.length === 0 ? <div className="empty-state notice-empty"><h2>Todo está al día</h2><p>No hay pagos atrasados ni mensajes con errores.</p></div> : notices.map((notice) => <article className={`notice-card ${notice.severity.toLowerCase()}`} key={notice.id}>
      <div className="notice-icon">{notice.type === 'MESSAGE_FAILED' ? '!' : notice.type === 'LONG_OVERDUE' ? '⏱' : '↗'}</div>
      <div className="notice-content"><div className="notice-title"><h2>{notice.title}</h2><span>{notice.schedule}</span></div><strong>{notice.memberName}</strong><p>{notice.detail}</p><small>{notice.phone} · Vencimiento {new Date(notice.dueDate).toLocaleDateString('es-AR', { timeZone: 'UTC' })}</small></div>
      <div className="notice-actions"><a className="small-button secondary" href={`https://wa.me/${notice.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">Abrir WhatsApp</a>{notice.whatsappAllowed ? <button className="small-button" onClick={() => void retry(notice)}>{notice.type === 'MESSAGE_FAILED' ? 'Reintentar' : 'Enviar aviso'}</button> : <span className="notice-no-consent">Sin autorización automática</span>}</div>
    </article>)}</section>
  </>
}
