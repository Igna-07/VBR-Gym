import { useEffect, useState } from 'react'
import { apiFetch, METHODS, money, shortDate, type Method } from '../api'

type Receipt = { id: string; amount: number; method: Method; period: string; paidAt: string; member: { name: string; phone: string; plan: string } }

const inputDate = (date: Date) => date.toLocaleDateString('en-CA', { timeZone: 'America/Argentina/Buenos_Aires' })
const monthStart = () => { const today = inputDate(new Date()); return `${today.slice(0, 8)}01` }

export function CashPage() {
  const [from, setFrom] = useState(monthStart())
  const [to, setTo] = useState(inputDate(new Date()))
  const [receipts, setReceipts] = useState<Receipt[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Rango en hora argentina: desde las 00:00 del primer día hasta las 23:59 del último.
    const params = new URLSearchParams({ from: `${from}T00:00:00-03:00`, to: `${to}T23:59:59-03:00` })
    void apiFetch(`/payments/receipts?${params}`)
      .then(async (response) => { if (!response.ok) throw new Error(); setReceipts(await response.json()); setError('') })
      .catch(() => setError('No se pudieron cargar los cobros.'))
      .finally(() => setLoading(false))
  }, [from, to])

  const total = receipts.reduce((sum, receipt) => sum + receipt.amount, 0)
  const byMethod = receipts.reduce<Partial<Record<Method, number>>>((acc, receipt) => ({ ...acc, [receipt.method]: (acc[receipt.method] ?? 0) + receipt.amount }), {})

  function exportCsv() {
    const rows = [['Fecha', 'Socio', 'Teléfono', 'Plan', 'Período', 'Medio', 'Monto'], ...receipts.map((r) => [new Date(r.paidAt).toLocaleString('es-AR'), r.member.name, r.member.phone, r.member.plan, shortDate(r.period), METHODS[r.method], String(r.amount)])]
    const csv = rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(';')).join('\n')
    const link = document.createElement('a')
    link.href = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }))
    link.download = `caja_${from}_${to}.csv`
    link.click()
    URL.revokeObjectURL(link.href)
  }

  return <>
    <header className="page-header"><div><h1>Caja</h1><p>Todos los cobros registrados, con totales por medio de pago.</p></div><button className="secondary-button" onClick={exportCsv} disabled={receipts.length === 0}>Exportar a Excel (CSV)</button></header>
    <div className="payments-toolbar cash-toolbar">
      <label className="member-search"><span>Desde</span><input type="date" value={from} max={to} onChange={(event) => setFrom(event.target.value)} /></label>
      <label className="member-search"><span>Hasta</span><input type="date" value={to} min={from} onChange={(event) => setTo(event.target.value)} /></label>
    </div>
    <section className="stats">
      <article className="card"><span>Total cobrado</span><strong>{money(total)}</strong><small>{receipts.length} cobros</small></article>
      {(Object.keys(METHODS) as Method[]).map((method) => <article className="card" key={method}><span>{METHODS[method]}</span><strong>{money(byMethod[method] ?? 0)}</strong></article>)}
    </section>
    {error && <div className="error-message">{error}</div>}
    <section className="table-container">
      {loading ? <div className="empty-state"><p>Cargando cobros...</p></div> : receipts.length === 0 ? <div className="empty-state"><h2>No hay cobros en este período</h2><p>Se registran al marcar una cuota como pagada.</p></div> : <div className="table-scroll"><table className="members-table">
        <thead><tr><th>Fecha</th><th>Socio</th><th>Plan</th><th>Período</th><th>Medio</th><th>Monto</th></tr></thead>
        <tbody>{receipts.map((receipt) => <tr key={receipt.id}><td>{new Date(receipt.paidAt).toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' })}</td><td><strong>{receipt.member.name}</strong></td><td>{receipt.member.plan}</td><td>{shortDate(receipt.period)}</td><td>{METHODS[receipt.method]}</td><td><strong>{money(receipt.amount)}</strong></td></tr>)}</tbody>
      </table></div>}
    </section>
  </>
}
