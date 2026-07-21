import { useEffect, useState, type FormEvent } from 'react'
import { apiFetch } from '../api'

type Member = { id: string; name: string; phone: string; plan: string; dueDate: string | null; whatsappAllowed: boolean; attendanceDays: string[] }
type ScheduleGroup = { id: string; name: string; startTime: string; endTime: string; capacity?: number; members?: unknown[] }
type Frequency = 'THREE_DAYS' | 'DAILY'

const API_URL = 'http://localhost:3000'
const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const PLAN_FREQUENCY: Record<string, Frequency> = {
  'Tres veces por semana': 'THREE_DAYS',
  'Todos los días': 'DAILY',
  'Plan libre': 'DAILY',
}

function todayInputValue() {
  const today = new Date()
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
}

export function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [groups, setGroups] = useState<ScheduleGroup[]>([])
  const [showForm, setShowForm] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('')
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [formError, setFormError] = useState('')
  const [search, setSearch] = useState('')
  const frequency = PLAN_FREQUENCY[selectedPlan]
  const isPromoted = selectedPlan === 'Plan libre'
  const requiredDays = frequency === 'THREE_DAYS' ? 3 : 0
  const filteredMembers = members.filter((member) => {
    const query = search.trim().toLocaleLowerCase('es')
    if (!query) return true
    return [member.name, member.phone, member.plan, ...member.attendanceDays]
      .some((value) => value.toLocaleLowerCase('es').includes(query))
  })

  async function loadData() {
    try {
      const [membersResponse, groupsResponse] = await Promise.all([apiFetch(`${API_URL}/members`), apiFetch(`${API_URL}/schedule-groups`)])
      if (!membersResponse.ok || !groupsResponse.ok) throw new Error()
      setMembers(await membersResponse.json()); setGroups(await groupsResponse.json())
    } catch { setError('No se pudo conectar con el servidor.') }
    finally { setIsLoading(false) }
  }
  useEffect(() => { void loadData() }, [])

  function closeForm() {
    setShowForm(false); setSelectedPlan(''); setSelectedDays([]); setFormError('')
  }

  function toggleDay(day: string) {
    setFormError('')
    setSelectedDays((current) => current.includes(day) ? current.filter((item) => item !== day) : requiredDays && current.length >= requiredDays ? current : [...current, day])
  }

  async function deleteMember(member: Member) {
    if (!window.confirm(`¿Eliminar a ${member.name}? También se quitará su registro de pagos.`)) return
    try {
      setError('')
      const response = await apiFetch(`${API_URL}/members/${member.id}`, { method: 'DELETE' })
      if (!response.ok) {
        const body = await response.json()
        throw new Error(body.message || 'No se pudo eliminar el socio.')
      }
      setMembers((current) => current.filter((item) => item.id !== member.id))
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'No se pudo eliminar el socio.')
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!frequency) { setFormError('Seleccioná un plan.'); return }
    if (requiredDays && selectedDays.length !== requiredDays) { setFormError(`Elegí exactamente ${requiredDays} días de asistencia.`); return }

    const form = new FormData(event.currentTarget)
    const payload = {
      name: String(form.get('name')).trim(), phone: String(form.get('phone')).trim(), email: String(form.get('email')).trim() || undefined,
      plan: selectedPlan, dueDate: isPromoted ? undefined : String(form.get('dueDate')), whatsappAllowed: form.get('whatsappAllowed') === 'on',
      attendanceFrequency: frequency, attendanceDays: frequency === 'DAILY' ? DAYS : selectedDays,
      scheduleGroupId: String(form.get('scheduleGroupId')) || undefined,
    }
    try {
      setIsSaving(true); setFormError('')
      const response = await apiFetch(`${API_URL}/members`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!response.ok) { const body = await response.json(); throw new Error(Array.isArray(body.message) ? body.message.join(', ') : body.message) }
      const savedMember: Member = await response.json()
      setMembers((current) => [savedMember, ...current]); closeForm()
    } catch (requestError) { setFormError(requestError instanceof Error ? requestError.message : 'No se pudo guardar el socio.') }
    finally { setIsSaving(false) }
  }

  return <>
    <header className="page-header"><div><h1>Socios</h1><p>Administrá las personas registradas en el gimnasio.</p></div><button className="primary-button" onClick={() => setShowForm(true)}>Nuevo socio</button></header>
    {error && <div className="error-message">{error}</div>}
    {showForm && <section className="form-card member-form-card"><div className="form-title"><div><h2>Registrar socio</h2><p>Completá sus datos, plan y turno habitual.</p></div><button className="close-button" type="button" onClick={closeForm}>Cerrar</button></div>
      {formError && <div className="inline-form-error">{formError}</div>}
      <form className="member-form" onSubmit={handleSubmit}>
        <label>Nombre completo<input name="name" autoComplete="name" placeholder="Ej. Juan Pérez" required /></label>
        <label>Teléfono con código de área<input name="phone" type="tel" autoComplete="tel" placeholder="Ej. 351 555 0000" pattern="[0-9+() -]{8,20}" required /><small>Este número recibirá los avisos de pago.</small></label>
        <label>Correo electrónico <span className="optional-label">Opcional</span><input name="email" type="email" autoComplete="email" placeholder="socio@correo.com" /></label>
        <label>Plan<select name="plan" value={selectedPlan} onChange={(event) => { setSelectedPlan(event.target.value); setSelectedDays([]); setFormError('') }} required><option value="" disabled>Seleccionar plan</option>{Object.keys(PLAN_FREQUENCY).map((plan) => <option key={plan}>{plan}</option>)}</select></label>
        {isPromoted ? <div className="promoted-plan-note"><strong>Socio promocionado</strong><span>No tendrá cuota, vencimiento ni avisos automáticos de deuda.</span></div> : <label>Primer vencimiento<input name="dueDate" type="date" min={todayInputValue()} required /><small>La cuota aparecerá automáticamente en Pagos.</small></label>}
        <label>Grupo horario<select name="scheduleGroupId" defaultValue=""><option value="">Asignar más adelante</option>{groups.map((group) => <option value={group.id} key={group.id}>{group.startTime} — {group.endTime} · {group.name}</option>)}</select></label>

        <fieldset className={`days-field ${frequency === 'DAILY' ? 'days-field-disabled' : ''}`} disabled={!frequency || frequency === 'DAILY'}>
          <legend>Días de asistencia</legend>
          <p>{!frequency ? 'Primero seleccioná un plan.' : isPromoted ? 'El plan libre incluye todos los días y no genera una cuota mensual.' : frequency === 'DAILY' ? 'Este plan incluye todos los días.' : `Elegí ${requiredDays} días (${selectedDays.length}/${requiredDays}).`}</p>
          <div>{DAYS.map((day) => <label key={day} className={selectedDays.includes(day) ? 'day-selected' : ''}><input type="checkbox" checked={frequency === 'DAILY' || selectedDays.includes(day)} onChange={() => toggleDay(day)} />{day}</label>)}</div>
        </fieldset>

        <label className="checkbox-field whatsapp-consent"><input name="whatsappAllowed" type="checkbox" /><span><strong>Autoriza mensajes por WhatsApp</strong><small>Necesario para enviar recordatorios automáticos de vencimiento.</small></span></label>
        <div className="form-actions"><button className="secondary-button" type="button" onClick={closeForm}>Cancelar</button><button className="primary-button" disabled={isSaving}>{isSaving ? 'Guardando...' : 'Guardar socio'}</button></div>
      </form>
    </section>}
    <section className="table-container members-directory">
      {!isLoading && members.length > 0 && <div className="members-toolbar"><div><h2>Listado de socios</h2><span>{filteredMembers.length} de {members.length}</span></div><label className="member-search"><span>Buscar socio</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Nombre, teléfono, plan o día..." /></label></div>}
      {isLoading ? <div className="empty-state"><p>Cargando socios...</p></div> : members.length === 0 ? <div className="empty-state"><h2>Todavía no hay socios</h2><p>Cuando registres el primero, aparecerá aquí.</p></div> : filteredMembers.length === 0 ? <div className="empty-state search-empty"><h2>No encontramos socios</h2><p>Probá con otro nombre, teléfono, plan o día.</p></div> : <div className="table-scroll"><table className="members-table"><thead><tr><th className="member-delete-column"><span className="visually-hidden">Eliminar</span></th><th>Nombre</th><th>Teléfono</th><th>Plan</th><th>Días</th><th>Vencimiento</th><th>WhatsApp</th></tr></thead><tbody>{filteredMembers.map((member) => <tr key={member.id}><td className="member-delete-column"><button className="delete-member-button" type="button" title={`Eliminar a ${member.name}`} aria-label={`Eliminar a ${member.name}`} onClick={() => void deleteMember(member)}>×</button></td><td><strong>{member.name}</strong></td><td>{member.phone}</td><td>{member.plan}</td><td><div className="member-days">{member.attendanceDays.map((day) => <span key={day}>{day.slice(0, 3)}</span>)}</div></td><td>{member.dueDate ? new Date(member.dueDate).toLocaleDateString('es-AR', { timeZone: 'UTC' }) : 'Sin cuota'}</td><td>{member.whatsappAllowed ? 'Autorizado' : 'No autorizado'}</td></tr>)}</tbody></table></div>}
    </section>
  </>
}
