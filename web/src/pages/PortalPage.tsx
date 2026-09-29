import { useEffect, useState } from 'react'
import { apiFetch, apiSend, METHODS, money, shortDate, type Method } from '../api'
import { Brand } from '../Brand'

type Portal = {
  name: string; plan: string; dni: string | null; monthlyFee: number; dueDate: string | null; paused: boolean
  paymentStatus: 'PENDING' | 'PAID' | 'OVERDUE' | 'EXEMPT'; canPay: boolean; onlinePayment: boolean
  schedule: string | null; attendanceDays: string[]; visitsThisMonth: number
  receipts: { amount: number; method: Method; period: string; paidAt: string }[]
}

function statusCard(portal: Portal) {
  if (portal.paused) return { tone: 'neutral', title: 'Cuota pausada', detail: 'Consultá en recepción para reactivarla.' }
  if (portal.paymentStatus === 'EXEMPT') return { tone: 'ok', title: 'Plan sin cuota', detail: 'Tu plan no tiene cuota mensual.' }
  if (portal.paymentStatus === 'OVERDUE') return { tone: 'bad', title: 'Cuota vencida', detail: `Venció el ${shortDate(portal.dueDate)}.` }
  if (portal.canPay) return { tone: 'warn', title: 'Cuota por vencer', detail: `Vence el ${shortDate(portal.dueDate)}.` }
  return { tone: 'ok', title: 'Cuota al día', detail: `Próximo vencimiento: ${shortDate(portal.dueDate)}.` }
}

export function PortalPage({ token }: { token: string }) {
  const [portal, setPortal] = useState<Portal | null>(null)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [paying, setPaying] = useState(false)

  useEffect(() => {
    async function load() {
      // Si volvemos de Mercado Pago, confirmamos el pago antes de mostrar el estado.
      const params = new URLSearchParams(window.location.search)
      const paymentId = params.get('payment_id') ?? params.get('collection_id')
      if (paymentId && paymentId !== 'null') {
        try {
          const { status } = await apiSend<{ status: string }>(`/portal/${token}/confirm`, 'POST', { paymentId })
          setNotice(status === 'approved' ? '¡Pago acreditado! Gracias.' : status === 'rejected' ? 'El pago fue rechazado. Probá con otro medio.' : 'Tu pago está en proceso. Te avisamos cuando se acredite.')
        } catch { setNotice('No pudimos confirmar el pago todavía. Si se debitó, se acreditará en unos minutos.') }
        window.history.replaceState(null, '', window.location.pathname)
      }
      const response = await apiFetch(`/portal/${token}`)
      const body = await response.json()
      if (!response.ok) throw new Error(body.message)
      setPortal(body)
    }
    load().catch((loadError) => setError(loadError instanceof Error && loadError.message ? loadError.message : 'No pudimos cargar tu información.'))
  }, [token])

  async function pay() {
    try {
      setPaying(true); setError('')
      const { url } = await apiSend<{ url: string }>(`/portal/${token}/checkout`, 'POST')
      window.location.href = url
    } catch (payError) { setError(payError instanceof Error ? payError.message : 'No se pudo iniciar el pago.'); setPaying(false) }
  }

  const card = portal && statusCard(portal)

  return <main className="portal">
    <header className="portal-header"><Brand /></header>
    {error && <div className="error-message" role="alert">{error}</div>}
    {notice && <div className="success-message" role="status">{notice}</div>}
    {!portal ? !error && <p className="portal-loading">Cargando...</p> : <>
      <h1>Hola, {portal.name.split(' ')[0]}</h1>
      <section className={`portal-status ${card!.tone}`}>
        <span>{card!.title}</span>
        <p>{card!.detail}</p>
        {portal.canPay && <>
          <strong>{money(portal.monthlyFee)}</strong>
          {portal.onlinePayment
            ? <button className="primary-button portal-pay" onClick={() => void pay()} disabled={paying}>{paying ? 'Abriendo Mercado Pago...' : 'Pagar con Mercado Pago'}</button>
            : <small>Podés abonar en recepción.</small>}
        </>}
      </section>

      <section className="portal-grid">
        <article><span>Plan</span><strong>{portal.plan}</strong></article>
        <article><span>Visitas este mes</span><strong>{portal.visitsThisMonth}</strong></article>
        <article><span>Horario</span><strong>{portal.schedule ?? 'A coordinar'}</strong></article>
        <article><span>Días</span><strong>{portal.attendanceDays.length === 6 ? 'Todos los días' : portal.attendanceDays.map((day) => day.slice(0, 3)).join(' · ') || '—'}</strong></article>
      </section>

      {portal.dni && <section className="portal-code"><span>Tu código de ingreso</span><strong>{portal.dni}</strong><small>Ingresalo en la pantalla de recepción al llegar.</small></section>}

      {portal.receipts.length > 0 && <section className="portal-history">
        <h2>Últimos pagos</h2>
        <ul>{portal.receipts.map((receipt) => <li key={receipt.paidAt}><div><strong>{money(receipt.amount)}</strong><span>{METHODS[receipt.method]}</span></div><span>{new Date(receipt.paidAt).toLocaleDateString('es-AR')}</span></li>)}</ul>
      </section>}
      <p className="portal-footer">Este enlace es personal. No lo compartas.</p>
    </>}
  </main>
}
