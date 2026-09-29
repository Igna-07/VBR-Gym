import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { apiFetch, apiSend, METHODS, money } from '../api'

type Payment = {
  id: string
  dueDate: string | null
  status: 'PENDING' | 'PAID' | 'OVERDUE' | 'EXEMPT'
  upcomingReminderSentAt: string | null
  upcomingReminderError: string | null
  reminderSentAt: string | null
  reminderError: string | null
  member: {
    name: string
    phone: string
    plan: string
    monthlyFee: number
    portalToken: string
    status: 'ACTIVE' | 'OVERDUE' | 'SUSPENDED' | 'INACTIVE'
    whatsappAllowed: boolean
    scheduleGroup: { id: string; name: string; startTime: string; endTime: string } | null
  }
}

const labels = { PENDING: 'Pendiente', PAID: 'Pagado', OVERDUE: 'Vencido', EXEMPT: 'Promocionado' }

function paymentUrgency(payment: Payment) {
  if (payment.status === 'EXEMPT') return 'promoted-payment-row'
  if (payment.status === 'PAID') return 'paid-payment-row'
  if (!payment.dueDate) return ''
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const dueDate = new Date(payment.dueDate); dueDate.setHours(0, 0, 0, 0)
  const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / 86400000)
  if (daysUntilDue <= 0) return 'overdue-payment-row'
  if (daysUntilDue <= 3) return 'upcoming-payment-row'
  return ''
}

// Misma regla que la API: impaga, o vence dentro de 7 días (pago anticipado).
function canCharge(payment: Payment) {
  if (!payment.dueDate || payment.status === 'EXEMPT') return false
  const limit = new Date(); limit.setDate(limit.getDate() + 7); limit.setHours(23, 59, 59, 999)
  return payment.status !== 'PAID' || new Date(payment.dueDate) <= limit
}

function paymentLinkMessage(payment: Payment) {
  const link = `${window.location.origin}/portal/${payment.member.portalToken}`
  const due = payment.dueDate ? new Date(payment.dueDate).toLocaleDateString('es-AR', { timeZone: 'UTC' }) : ''
  return `https://wa.me/${payment.member.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`¡Hola ${payment.member.name.split(' ')[0]}! Tu cuota de Profesional Gym ${payment.status === 'OVERDUE' ? 'venció' : 'vence'} el ${due}. Podés ver tu estado y pagar desde acá: ${link}`)}`
}

function isDue(payment: Payment) {
  if (!payment.dueDate || payment.status === 'EXEMPT') return false
  const today = new Date(); today.setHours(23, 59, 59, 999)
  return new Date(payment.dueDate) <= today
}

export function PaymentsPage() {
  const [searchParams] = useSearchParams()
  const selectedPaymentId = searchParams.get('pago')
  const [payments, setPayments] = useState<Payment[]>([])
  const [configured, setConfigured] = useState(false)
  const [sender, setSender] = useState('')
  const [mercadoPago, setMercadoPago] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(searchParams.get('socio') || '')
  const [charging, setCharging] = useState<Payment | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  useEffect(() => { if (charging) dialogRef.current?.showModal() }, [charging])

  async function confirmPaid(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    try {
      await apiSend(`/payments/${charging!.id}/paid`, 'PATCH', { amount: Number(form.get('amount')), method: form.get('method') })
      dialogRef.current?.close(); setCharging(null); setError('')
      await loadData()
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : 'No se pudo registrar el cobro.'); dialogRef.current?.close(); setCharging(null) }
  }

  async function loadData() {
    try {
      const [paymentsResponse, statusResponse] = await Promise.all([
        apiFetch(`/payments`),
        apiFetch(`/payments/whatsapp-status`),
      ])
      if (!paymentsResponse.ok || !statusResponse.ok) throw new Error()
      setPayments(await paymentsResponse.json())
      const status = await statusResponse.json()
      setConfigured(status.configured)
      setSender(status.senderNumber)
      setMercadoPago(status.mercadoPago)
    } catch { setError('No se pudieron cargar los pagos.') }
    finally { setLoading(false) }
  }

  useEffect(() => { void loadData() }, [])
  useEffect(() => {
    if (loading || !selectedPaymentId) return
    window.requestAnimationFrame(() => {
      document.getElementById(`payment-${selectedPaymentId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
  }, [loading, payments, selectedPaymentId])

  async function sendReminder(id: string) {
    try {
      setError('')
      await apiSend(`/payments/${id}/send-reminder`, 'POST')
      await loadData()
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'No se pudo completar la acción.')
    }
  }

  const filteredPayments = payments.filter((payment) => {
    const query = search.trim().toLocaleLowerCase('es')
    if (!query) return true
    const schedule = payment.member.scheduleGroup
    return [payment.member.name, payment.member.phone, payment.member.plan, labels[payment.status], schedule?.name || '', schedule ? `${schedule.startTime} ${schedule.endTime}` : 'sin turno']
      .some((value) => value.toLocaleLowerCase('es').includes(query))
  })

  const groupedPayments = Object.values(filteredPayments.reduce<Record<string, { title: string; startTime: string; payments: Payment[] }>>((groups, payment) => {
    const schedule = payment.member.scheduleGroup
    const startHour = schedule ? Number(schedule.startTime.split(':')[0]) : null
    const key = payment.status === 'EXEMPT' ? 'promoted' : startHour === null ? 'without-schedule' : startHour < 12 ? 'morning' : 'afternoon'
    groups[key] ||= {
      title: key === 'morning' ? 'Turno mañana' : key === 'afternoon' ? 'Turno tarde' : key === 'promoted' ? 'Socios promocionados' : 'Socios sin turno asignado',
      startTime: key === 'promoted' ? '98:98' : schedule?.startTime || '99:99',
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
    {!mercadoPago && <div className="whatsapp-notice"><strong>Mercado Pago sin conectar</strong><span>Los socios pueden ver su estado en el portal, pero el pago online se habilita al cargar las credenciales de Mercado Pago.</span></div>}
    {error && <div className="error-message">{error}</div>}
    {!loading && payments.length > 0 && <div className="payments-toolbar"><div><strong>Listado de pagos</strong><span>{filteredPayments.length} de {payments.length}</span></div><label className="member-search"><span>Buscar pago</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Socio, teléfono, horario o estado..." /></label></div>}
    {loading ? <section className="table-container"><div className="empty-state"><p>Cargando pagos...</p></div></section> : payments.length === 0 ? <section className="table-container"><div className="empty-state"><h2>No hay pagos registrados</h2><p>Se crearán automáticamente al registrar socios.</p></div></section> : filteredPayments.length === 0 ? <section className="table-container"><div className="empty-state search-empty"><h2>No encontramos pagos</h2><p>Probá con otro nombre, teléfono, horario o estado.</p></div></section> : <section className="payment-groups">
      {groupedPayments.map((group) => <article className="payment-group" key={group.title}>
        <header><h2>{group.title}</h2><span>{group.payments.length} socios</span></header>
        <div className="table-scroll"><table className="members-table payments-table"><thead><tr><th>Socio</th><th>Horario</th><th>Teléfono</th><th>Vencimiento</th><th>Estado</th><th>WhatsApp</th><th>Acciones</th></tr></thead><tbody>
          {group.payments.map((payment) => <tr id={`payment-${payment.id}`} key={payment.id} className={`${paymentUrgency(payment)} ${payment.id === selectedPaymentId ? 'target-payment-row' : ''}`.trim()}>
            <td><strong className={payment.status === 'PAID' ? 'paid-member-name' : ''}>{payment.member.name}</strong></td>
            <td><span className="payment-schedule">{payment.member.scheduleGroup ? `${payment.member.scheduleGroup.startTime} — ${payment.member.scheduleGroup.endTime}` : 'Sin asignar'}</span></td>
            <td>{payment.member.phone}</td><td>{payment.dueDate ? new Date(payment.dueDate).toLocaleDateString('es-AR', { timeZone: 'UTC' }) : 'Sin cuota'}</td>
            <td>{payment.member.status === 'SUSPENDED' ? <span className="payment-status exempt">Pausado</span> : <span className={`payment-status ${payment.status.toLowerCase()}`}>{labels[payment.status]}</span>}</td>
            <td>{payment.status === 'EXEMPT'
              ? 'Sin avisos de pago'
              : payment.reminderError
                ? 'Aviso vencido con error'
                : payment.reminderSentAt
                  ? 'Aviso de vencimiento enviado hoy'
                  : payment.upcomingReminderError
                    ? 'Aviso previo con error'
                    : payment.upcomingReminderSentAt
                      ? 'Aviso previo enviado'
                      : payment.member.whatsappAllowed ? 'Pendiente' : 'No autorizado'}</td>
            <td><div className="payment-actions">{payment.status === 'EXEMPT' ? <span className="no-payment-required">No requiere pago</span> : <>{canCharge(payment) && <button className="small-button" onClick={() => setCharging(payment)}>Cobrar</button>}{canCharge(payment) && payment.member.status !== 'SUSPENDED' && <a className="small-button secondary" href={paymentLinkMessage(payment)} target="_blank" rel="noreferrer" title="Abre WhatsApp con el enlace de pago del socio">Enviar link</a>}{payment.status !== 'PAID' && payment.member.status !== 'SUSPENDED' && payment.member.whatsappAllowed && isDue(payment) && <button className="small-button secondary" disabled={!configured} onClick={() => void sendReminder(payment.id)}>Dar aviso</button>}</>}</div></td>
          </tr>)}
        </tbody></table></div>
      </article>)}
    </section>}
    {charging && <dialog ref={dialogRef} className="modal" onClose={() => setCharging(null)}>
      <form onSubmit={confirmPaid}>
        <h2>Registrar cobro</h2>
        <p>{charging.member.name} · {charging.member.plan}</p>
        <label>Monto (ARS)<input name="amount" type="number" min={0} step={100} defaultValue={charging.member.monthlyFee} required autoFocus /></label>
        <label>Medio de pago<select name="method" defaultValue="CASH">{Object.entries(METHODS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
        <small>La próxima cuota vencerá un mes después. Cuota del socio: {money(charging.member.monthlyFee)}.</small>
        <div className="form-actions"><button type="button" className="secondary-button" onClick={() => dialogRef.current?.close()}>Cancelar</button><button className="primary-button">Confirmar cobro</button></div>
      </form>
    </dialog>}
  </>
}
