import { useEffect, useState, type FormEvent } from 'react'
import { apiFetch, apiSend, money } from '../api'

export type Plan = { id: string; name: string; price: number; frequency: 'THREE_DAYS' | 'DAILY' | 'TWO_DAYS'; exempt: boolean }

export function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => { void apiFetch('/plans').then(async (response) => response.ok && setPlans(await response.json())) }, [])

  async function save(event: FormEvent<HTMLFormElement>, plan: Plan) {
    event.preventDefault()
    const price = Number(new FormData(event.currentTarget).get('price'))
    try {
      setError(''); setMessage('')
      const saved = await apiSend<Plan>(`/plans/${plan.id}`, 'PATCH', { price })
      setPlans((current) => current.map((item) => item.id === saved.id ? saved : item))
      setMessage(`Precio de "${plan.name}" actualizado a ${money(price)}.`)
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : 'No se pudo guardar.') }
  }

  return <>
    <header className="page-header"><div><h1>Planes y precios</h1><p>El precio se usa como cuota por defecto al registrar socios y al cobrar. Cambiarlo no modifica la cuota de socios existentes.</p></div></header>
    {error && <div className="error-message">{error}</div>}
    {message && <div className="success-message">{message}</div>}
    <section className="plan-list">{plans.map((plan) => <form className="panel plan-card" key={plan.id} onSubmit={(event) => void save(event, plan)}>
      <header><h2>{plan.name}</h2><span className="panel-muted">{plan.exempt ? 'Sin cuota' : plan.frequency === 'DAILY' ? 'Todos los días' : '3 días por semana'}</span></header>
      {plan.exempt ? <p className="panel-muted">Socios promocionados: no generan cuota ni avisos de deuda.</p> : <label>Cuota mensual (ARS)<div className="plan-price"><input name="price" type="number" min={0} step={100} defaultValue={plan.price} required /><button className="primary-button">Guardar</button></div></label>}
    </form>)}</section>
  </>
}
