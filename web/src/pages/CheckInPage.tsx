import { useRef, useState, type FormEvent } from 'react'
import { apiSend, shortDate } from '../api'

type Result = { name: string; plan: string; dueDate: string | null; access: 'OK' | 'OVERDUE' | 'PAUSED'; alreadyToday: boolean; visitsThisMonth: number }

const ACCESS = {
  OK: { title: '¡Bienvenido!', detail: 'Cuota al día.' },
  OVERDUE: { title: 'Cuota vencida', detail: 'Pasá por recepción para regularizar.' },
  PAUSED: { title: 'Cuota pausada', detail: 'Consultá en recepción para reactivarla.' },
}

export function CheckInPage() {
  const [result, setResult] = useState<Result | null>(null)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const clearTimer = useRef<number>(undefined)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const input = inputRef.current!
    window.clearTimeout(clearTimer.current)
    try {
      setSaving(true); setError(''); setResult(null)
      setResult(await apiSend<Result>('/members/check-in', 'POST', { query: input.value }))
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : 'No se pudo registrar el ingreso.') }
    finally {
      setSaving(false); input.value = ''; input.focus()
      // Modo kiosco: la pantalla se limpia sola para el siguiente socio.
      clearTimer.current = window.setTimeout(() => { setResult(null); setError('') }, 8000)
    }
  }

  return <>
    <header className="page-header"><div><h1>Ingreso de socios</h1><p>El socio escribe su DNI o teléfono. Podés dejar esta pantalla abierta en recepción.</p></div></header>
    <section className="checkin">
      <form className="checkin-form" onSubmit={submit}>
        <label htmlFor="checkin-query">DNI o teléfono</label>
        <div><input id="checkin-query" ref={inputRef} inputMode="numeric" autoComplete="off" placeholder="Ej. 35123456" autoFocus required /><button className="primary-button" disabled={saving}>{saving ? 'Buscando...' : 'Ingresar'}</button></div>
      </form>
      {error && <div className="checkin-result denied" role="alert"><h2>No pudimos registrarte</h2><p>{error}</p></div>}
      {result && <div className={`checkin-result ${result.access === 'OK' ? 'granted' : 'denied'}`} role="status">
        <span>{ACCESS[result.access].title}</span>
        <h2>{result.name}</h2>
        <p>{ACCESS[result.access].detail}{result.alreadyToday ? ' Ya habías registrado tu ingreso hoy.' : ''}</p>
        <dl><div><dt>Plan</dt><dd>{result.plan}</dd></div><div><dt>Vence</dt><dd>{shortDate(result.dueDate)}</dd></div><div><dt>Visitas este mes</dt><dd>{result.visitsThisMonth}</dd></div></dl>
      </div>}
    </section>
  </>
}
