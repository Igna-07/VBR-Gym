import { useEffect, useRef, useState, type FormEvent } from 'react'
import jsQR from 'jsqr'
import { apiSend, shortDate } from '../api'

type Result = { name: string; plan: string; dueDate: string | null; access: 'OK' | 'OVERDUE' | 'PAUSED'; alreadyToday: boolean; visitsThisMonth: number }

const ACCESS = {
  OK: { title: '¡Bienvenido!', detail: 'Cuota al día.' },
  OVERDUE: { title: 'Cuota vencida', detail: 'Pasá por recepción para regularizar.' },
  PAUSED: { title: 'Cuota pausada', detail: 'Consultá en recepción para reactivarla.' },
}
const SAME_CODE_COOLDOWN_MS = 5000

export function CheckInPage() {
  const [result, setResult] = useState<Result | null>(null)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [scanning, setScanning] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const clearTimer = useRef<number>(undefined)
  const scanTimer = useRef<number>(undefined)
  const lastScan = useRef({ code: '', at: 0 })

  async function checkIn(query: string) {
    window.clearTimeout(clearTimer.current)
    try {
      setSaving(true); setError(''); setResult(null)
      setResult(await apiSend<Result>('/members/check-in', 'POST', { query }))
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : 'No se pudo registrar el ingreso.') }
    finally {
      setSaving(false)
      // Modo kiosco: la pantalla se limpia sola para el siguiente socio.
      clearTimer.current = window.setTimeout(() => { setResult(null); setError('') }, 8000)
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const input = inputRef.current!
    void checkIn(input.value)
    input.value = ''; input.focus()
  }

  function stopScan() {
    window.clearTimeout(scanTimer.current)
    const stream = videoRef.current?.srcObject as MediaStream | null
    stream?.getTracks().forEach((track) => track.stop())
    if (videoRef.current) videoRef.current.srcObject = null
    setScanning(false)
  }

  async function startScan() {
    try {
      setError('')
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      setScanning(true)
      const video = videoRef.current!
      video.srcObject = stream
      await video.play()
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d', { willReadFrequently: true })!
      const scan = () => {
        if (video.readyState >= video.HAVE_ENOUGH_DATA) {
          canvas.width = video.videoWidth; canvas.height = video.videoHeight
          context.drawImage(video, 0, 0)
          const code = jsQR(context.getImageData(0, 0, canvas.width, canvas.height).data, canvas.width, canvas.height, { inversionAttempts: 'dontInvert' })
          const now = Date.now()
          // Ignora el mismo QR mientras sigue frente a la cámara.
          if (code?.data && (code.data !== lastScan.current.code || now - lastScan.current.at > SAME_CODE_COOLDOWN_MS)) {
            lastScan.current = { code: code.data, at: now }
            void checkIn(code.data)
          }
        }
        scanTimer.current = window.setTimeout(scan, 200)
      }
      scan()
    } catch {
      stopScan()
      setError('No se pudo acceder a la cámara. Revisá los permisos del navegador o usá el DNI.')
    }
  }

  useEffect(() => stopScan, [])

  return <>
    <header className="page-header"><div><h1>Ingreso de socios</h1><p>El socio muestra el QR de su portal o escribe su DNI. Podés dejar esta pantalla abierta en recepción.</p></div>
      <button className={scanning ? 'secondary-button' : 'primary-button'} onClick={() => scanning ? stopScan() : void startScan()}>{scanning ? 'Detener cámara' : 'Escanear QR con la cámara'}</button>
    </header>
    <section className="checkin">
      <div className={`checkin-camera ${scanning ? '' : 'hidden'}`}><video ref={videoRef} muted playsInline /><i aria-hidden="true" /><span>Acercá el QR a la cámara</span></div>
      <form className="checkin-form" onSubmit={submit}>
        <label htmlFor="checkin-query">DNI, teléfono o lector QR</label>
        <div><input id="checkin-query" ref={inputRef} autoComplete="off" placeholder="Ej. 35123456" autoFocus required /><button className="primary-button" disabled={saving}>{saving ? 'Buscando...' : 'Ingresar'}</button></div>
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
