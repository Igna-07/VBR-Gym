import { useEffect, useState } from 'react'
import { apiFetch } from '../api'

type Notice = { id: string; paymentId: string; type: 'MESSAGE_FAILED' | 'LONG_OVERDUE' | 'REMINDER_PENDING'; severity: 'HIGH' | 'MEDIUM'; title: string; detail: string; memberName: string; phone: string; whatsappAllowed: boolean; dueDate: string; schedule: string }
const API_URL = 'http://localhost:3000'

export function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadNotices() {
    try {
      const response = await apiFetch(`${API_URL}/notices`)
      if (!response.ok) throw new Error()
      setNotices(await response.json())
    } catch { setError('No se pudieron cargar los avisos.') }
    finally { setLoading(false) }
  }
  useEffect(() => { void loadNotices() }, [])

  async function retry(notice: Notice) {
    try {
      setError('')
      const response = await apiFetch(`${API_URL}/payments/${notice.paymentId}/send-reminder`, { method: 'POST' })
      if (!response.ok) { const body = await response.json(); throw new Error(body.message || 'No se pudo enviar el aviso.') }
      await loadNotices()
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : 'No se pudo enviar el aviso.') }
  }

  const failed = notices.filter((notice) => notice.type === 'MESSAGE_FAILED').length
  const longOverdue = notices.filter((notice) => notice.type === 'LONG_OVERDUE').length
  const pending = notices.filter((notice) => notice.type === 'REMINDER_PENDING').length

  return <>
    <header className="page-header"><div><h1>Avisos</h1><p>Situaciones automáticas que necesitan atención del administrador.</p></div><button className="secondary-button" onClick={() => void loadNotices()}>Actualizar</button></header>
    <section className="notice-summary"><article><strong>{notices.length}</strong><span>Total</span></article><article className="danger"><strong>{failed}</strong><span>Mensajes fallidos</span></article><article className="danger"><strong>{longOverdue}</strong><span>Deudas antiguas</span></article><article className="warning"><strong>{pending}</strong><span>Avisos pendientes</span></article></section>
    {error && <div className="error-message">{error}</div>}
    <section className="notice-list">{loading ? <div className="empty-state notice-empty"><p>Cargando avisos...</p></div> : notices.length === 0 ? <div className="empty-state notice-empty"><h2>Todo está al día</h2><p>No hay pagos atrasados ni mensajes con errores.</p></div> : notices.map((notice) => <article className={`notice-card ${notice.severity.toLowerCase()}`} key={notice.id}>
      <div className="notice-icon">{notice.type === 'MESSAGE_FAILED' ? '!' : notice.type === 'LONG_OVERDUE' ? '⏱' : '↗'}</div>
      <div className="notice-content"><div className="notice-title"><h2>{notice.title}</h2><span>{notice.schedule}</span></div><strong>{notice.memberName}</strong><p>{notice.detail}</p><small>{notice.phone} · Vencimiento {new Date(notice.dueDate).toLocaleDateString('es-AR', { timeZone: 'UTC' })}</small></div>
      <div className="notice-actions"><a className="small-button secondary" href={`https://wa.me/${notice.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">Abrir WhatsApp</a>{notice.whatsappAllowed ? <button className="small-button" onClick={() => void retry(notice)}>{notice.type === 'MESSAGE_FAILED' ? 'Reintentar' : 'Enviar aviso'}</button> : <span className="notice-no-consent">Sin autorización automática</span>}</div>
    </article>)}</section>
  </>
}
