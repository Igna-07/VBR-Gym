import { useEffect, useState, type FormEvent } from 'react'
import { apiFetch } from '../api'
import { Brand } from '../Brand'

type Admin = { id: string; email: string }

export function AuthPage({ onAuthenticated }: { onAuthenticated: (admin: Admin) => void }) {
  const [hasAdmin, setHasAdmin] = useState<boolean | null>(null)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  async function checkStatus() {
    try {
      setError('')
      const response = await apiFetch('/auth/status')
      if (!response.ok) throw new Error()
      const data = await response.json()
      setHasAdmin(data.hasAdmin)
    } catch { setError('No se pudo conectar con el servidor. Verificá que la API esté encendida.') }
  }

  useEffect(() => { void checkStatus() }, [])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = new FormData(event.currentTarget)
    try {
      setSaving(true); setError('')
      const response = await apiFetch(hasAdmin ? '/auth/login' : '/auth/setup', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: String(form.get('email')), password: String(form.get('password')) }),
      })
      const body = await response.json()
      if (!response.ok) throw new Error(Array.isArray(body.message) ? body.message.join(', ') : body.message)
      onAuthenticated(body)
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : 'No se pudo iniciar sesión.') }
    finally { setSaving(false) }
  }

  return <main className="auth-page"><section className="auth-card">
    <Brand large />
    {hasAdmin === null ? <div className="auth-connection-state"><p>{error || 'Preparando acceso...'}</p>{error && <button className="secondary-button" onClick={() => void checkStatus()}>Reintentar conexión</button>}</div> : <><div className="auth-heading"><span>Panel administrativo</span><h1>{hasAdmin ? 'Iniciar sesión' : 'Crear administrador'}</h1><p>{hasAdmin ? 'Ingresá para administrar socios, turnos y pagos.' : 'Este será el único acceso inicial al sistema.'}</p></div>
      {error && <div className="inline-form-error">{error}</div>}
      <form className="auth-form" onSubmit={submit}><label>Correo electrónico<input name="email" type="email" autoComplete="email" placeholder="administrador@correo.com" required autoFocus /></label><label>Contraseña<input name="password" type="password" autoComplete={hasAdmin ? 'current-password' : 'new-password'} minLength={8} required /><small>Mínimo 8 caracteres.</small></label><button className="primary-button" disabled={saving}>{saving ? 'Ingresando...' : hasAdmin ? 'Ingresar' : 'Crear cuenta y entrar'}</button></form>
    </>}
  </section></main>
}
