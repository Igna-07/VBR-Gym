import { useEffect, useState } from 'react'
import { apiFetch } from '../api'

type Payment = {
  id: string
  dueDate: string
  status: 'PENDING' | 'PAID' | 'OVERDUE'
  reminderSentAt: string | null
  reminderError: string | null
  member: {
    name: string
    phone: string
    whatsappAllowed: boolean
    scheduleGroup: { id: string; name: string; startTime: string; endTime: string } | null
  }
}

const API_URL = 'http://localhost:3000'
const labels = { PENDING: 'Pendiente', PAID: 'Pagado', OVERDUE: 'Vencido' }

function paymentUrgency(payment: Payment) {
  if (payment.status === 'PAID') return 'paid-payment-row'
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const dueDate = new Date(payment.dueDate); dueDate.setHours(0, 0, 0, 0)
  const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / 86400000)
  if (daysUntilDue <= 0) return 'overdue-payment-row'
  if (daysUntilDue <= 3) return 'upcoming-payment-row'
  return ''
}

function isDue(payment: Payment) {
  const today = new Date(); today.setHours(23, 59, 59, 999)
  return new Date(payment.dueDate) <= today
}

export function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [configured, setConfigured] = useState(false)
  const [sender, setSender] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  async function loadData() {
    try {
      const [paymentsResponse, statusResponse] = await Promise.all([
        apiFetch(`${API_URL}/payments`),
        apiFetch(`${API_URL}/payments/whatsapp-status`),
      ])
      if (!paymentsResponse.ok || !statusResponse.ok) throw new Error()
      setPayments(await paymentsResponse.json())
      const status = await statusResponse.json()
      setConfigured(status.configured)
      setSender(status.senderNumber)
    } catch { setError('No se pudieron cargar los pagos.') }
    finally { setLoading(false) }
  }

  useEffect(() => { void loadData() }, [])

  async function action(id: string, path: string) {
    try {
      setError('')
      const response = await apiFetch(`${API_URL}/payments/${id}/${path}`, {
        method: path === 'paid' ? 'PATCH' : 'POST',
      })
      if (!response.ok) {
        const body = await response.json()
        throw new Error(body.message || 'No se pudo completar la acción.')
      }
      await loadData()
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'No se pudo completar la acción.')
    }
  }

  const filteredPayments = payments.filter((payment) => {
    const query = search.trim().toLocaleLowerCase('es')
    if (!query) return true
    const schedule = payment.member.scheduleGroup
    return [payment.member.name, payment.member.phone, labels[payment.status], schedule?.name || '', schedule ? `${schedule.startTime} ${schedule.endTime}` : 'sin turno']
      .some((value) => value.toLocaleLowerCase('es').includes(query))
  })

  const groupedPayments = Object.values(filteredPayments.reduce<Record<string, { title: string; startTime: string; payments: Payment[] }>>((groups, payment) => {
    const schedule = payment.member.scheduleGroup
    const startHour = schedule ? Number(schedule.startTime.split(':')[0]) : null
    const key = startHour === null ? 'without-schedule' : startHour < 12 ? 'morning' : 'afternoon'
    groups[key] ||= {
      title: key === 'morning' ? 'Turno mañana' : key === 'afternoon' ? 'Turno tarde' : 'Socios sin turno asignado',
      startTime: schedule?.startTime || '99:99',
      payments: [],
    }
    if (schedule && schedule.startTime < groups[key].startTime) groups[key].startTime = schedule.startTime
    groups[key].payments.push(payment)
    return groups
  }, {}))
    .map((group) => ({
      ...group,
      payments: group.payments.sort((a, b) => {
        const timeA = a.member.scheduleGroup?.startTime || '99:99'
        const timeB = b.member.scheduleGroup?.startTime || '99:99'
        return timeA.localeCompare(timeB) || a.member.name.localeCompare(b.member.name)
      }),
    }))
    .sort((a, b) => a.startTime.localeCompare(b.startTime))

  return <>
    <header className="page-header"><div><h1>Pagos</h1><p>Controlá vencimientos y recordatorios organizados por turno.</p></div></header>
    {!configured && <div className="whatsapp-notice"><strong>WhatsApp pendiente de conexión</strong><span>{sender ? `Número emisor: ${sender}. ` : ''}Cuando vinculemos WhatsApp Business, los recordatorios se enviarán automáticamente.</span></div>}
    {error && <div className="error-message">{error}</div>}
    {!loading && payments.length > 0 && <div className="payments-toolbar"><div><strong>Listado de pagos</strong><span>{filteredPayments.length} de {payments.length}</span></div><label className="member-search"><span>Buscar pago</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Socio, teléfono, horario o estado..." /></label></div>}
    {loading ? <section className="table-container"><div className="empty-state"><p>Cargando pagos...</p></div></section> : payments.length === 0 ? <section className="table-container"><div className="empty-state"><h2>No hay pagos registrados</h2><p>Se crearán automáticamente al registrar socios.</p></div></section> : filteredPayments.length === 0 ? <section className="table-container"><div className="empty-state search-empty"><h2>No encontramos pagos</h2><p>Probá con otro nombre, teléfono, horario o estado.</p></div></section> : <section className="payment-groups">
      {groupedPayments.map((group) => <article className="payment-group" key={group.title}>
        <header><h2>{group.title}</h2><span>{group.payments.length} socios</span></header>
        <div className="table-scroll"><table className="members-table payments-table"><thead><tr><th>Socio</th><th>Horario</th><th>Teléfono</th><th>Vencimiento</th><th>Estado</th><th>WhatsApp</th><th>Acciones</th></tr></thead><tbody>
          {group.payments.map((payment) => <tr key={payment.id} className={paymentUrgency(payment)}>
            <td><strong className={payment.status === 'PAID' ? 'paid-member-name' : ''}>{payment.member.name}</strong></td>
            <td><span className="payment-schedule">{payment.member.scheduleGroup ? `${payment.member.scheduleGroup.startTime} — ${payment.member.scheduleGroup.endTime}` : 'Sin asignar'}</span></td>
            <td>{payment.member.phone}</td><td>{new Date(payment.dueDate).toLocaleDateString('es-AR', { timeZone: 'UTC' })}</td>
            <td><span className={`payment-status ${payment.status.toLowerCase()}`}>{labels[payment.status]}</span></td>
            <td>{payment.reminderSentAt ? 'Enviado' : payment.reminderError ? 'Con error' : payment.member.whatsappAllowed ? 'Pendiente' : 'No autorizado'}</td>
            <td><div className="payment-actions">{payment.status !== 'PAID' && <button className="small-button" onClick={() => void action(payment.id, 'paid')}>Marcar pagado</button>}{payment.status !== 'PAID' && payment.member.whatsappAllowed && isDue(payment) && <button className="small-button secondary" disabled={!configured} onClick={() => void action(payment.id, 'send-reminder')}>Dar aviso</button>}</div></td>
          </tr>)}
        </tbody></table></div>
      </article>)}
    </section>}
  </>
}
