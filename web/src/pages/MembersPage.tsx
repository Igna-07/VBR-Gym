import { useEffect, useState, type FormEvent } from 'react'
import { apiFetch, apiSend, money, shortDate } from '../api'
import type { Plan } from './PlansPage'

type Member = {
  id: string; name: string; phone: string; email: string | null; dni: string | null; plan: string; monthlyFee: number; dueDate: string | null
  whatsappAllowed: boolean; portalToken: string; status: 'ACTIVE' | 'OVERDUE' | 'SUSPENDED' | 'INACTIVE'; attendanceDays: string[]; scheduleGroupId: string | null
  payments?: { status: 'PENDING' | 'PAID' | 'OVERDUE' | 'EXEMPT' }[]; checkIns?: { checkedAt: string }[]
}
type ScheduleGroup = { id: string; name: string; startTime: string; endTime: string }

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

function todayInputValue() {
  const today = new Date()
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
}

function memberState(member: Member) {
  if (member.status === 'SUSPENDED') return { label: 'Pausado', className: 'exempt' }
  const status = member.payments?.[0]?.status
  if (status === 'OVERDUE') return { label: 'Debe', className: 'overdue' }
  if (status === 'EXEMPT') return { label: 'Promocionado', className: 'exempt' }
  return { label: 'Al día', className: 'paid' }
}

export function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [groups, setGroups] = useState<ScheduleGroup[]>([])
  const [plans, setPlans] = useState<Plan[]>([])
  const [editing, setEditing] = useState<Member | 'new' | null>(null)
  const [selectedPlan, setSelectedPlan] = useState('')
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [formError, setFormError] = useState('')
  const [search, setSearch] = useState('')
  const plan = plans.find((item) => item.name === selectedPlan)
  const frequency = plan?.frequency
  const isPromoted = Boolean(plan?.exempt)
  const requiredDays = frequency === 'THREE_DAYS' ? 3 : 0
  const current = editing === 'new' ? null : editing
  const filteredMembers = members.filter((member) => {
    const query = search.trim().toLocaleLowerCase('es')
    if (!query) return true
    return [member.name, member.phone, member.dni ?? '', member.plan, memberState(member).label, ...member.attendanceDays]
      .some((value) => value.toLocaleLowerCase('es').includes(query))
  })

  async function loadData() {
    try {
      const [membersResponse, groupsResponse, plansResponse] = await Promise.all([apiFetch('/members'), apiFetch('/schedule-groups'), apiFetch('/plans')])
      if (!membersResponse.ok || !groupsResponse.ok || !plansResponse.ok) throw new Error()
      setMembers(await membersResponse.json()); setGroups(await groupsResponse.json()); setPlans(await plansResponse.json())
    } catch { setError('No se pudo conectar con el servidor.') }
    finally { setIsLoading(false) }
  }
  useEffect(() => { void loadData() }, [])

  function openForm(member: Member | 'new') {
    setEditing(member); setFormError('')
    setSelectedPlan(member === 'new' ? '' : member.plan)
    setSelectedDays(member === 'new' ? [] : member.attendanceDays)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function closeForm() {
    setEditing(null); setSelectedPlan(''); setSelectedDays([]); setFormError('')
  }

  function toggleDay(day: string) {
    setFormError('')
    setSelectedDays((days) => days.includes(day) ? days.filter((item) => item !== day) : requiredDays && days.length >= requiredDays ? days : [...days, day])
  }

  async function run(action: () => Promise<unknown>) {
    try { setError(''); await action(); await loadData() }
    catch (requestError) { setError(requestError instanceof Error ? requestError.message : 'No se pudo completar la acción.') }
  }

  function deleteMember(member: Member) {
    if (!window.confirm(`¿Eliminar a ${member.name}? También se quitará su historial de pagos e ingresos.`)) return
    void run(() => apiSend(`/members/${member.id}`, 'DELETE'))
  }

  async function copyPortalLink(member: Member) {
    const link = `${window.location.origin}/portal/${member.portalToken}`
    try { await navigator.clipboard.writeText(link); window.alert(`Enlace de ${member.name} copiado:
${link}`) }
    catch { window.prompt('Copiá el enlace del portal:', link) }
  }

  function regeneratePortalLink(member: Member) {
    if (!window.confirm(`¿Generar un enlace nuevo para ${member.name}? El anterior dejará de funcionar.`)) return
    void run(() => apiSend(`/members/${member.id}/portal-link`, 'POST'))
  }

  function togglePause(member: Member) {
    const pausing = member.status !== 'SUSPENDED'
    if (pausing && !window.confirm(`¿Pausar la cuota de ${member.name}? No recibirá avisos y, al reactivarla, el vencimiento se correrá los días que estuvo pausada.`)) return
    void run(() => apiSend(`/members/${member.id}/${pausing ? 'pause' : 'resume'}`, 'POST'))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!frequency) { setFormError('Seleccioná un plan.'); return }
    if (requiredDays && selectedDays.length !== requiredDays) { setFormError(`Elegí exactamente ${requiredDays} días de asistencia.`); return }

    const form = new FormData(event.currentTarget)
    const payload = {
      name: String(form.get('name')).trim(), phone: String(form.get('phone')).trim(), email: String(form.get('email')).trim() || undefined,
      dni: String(form.get('dni') ?? '').replace(/\D/g, '') || undefined,
      plan: selectedPlan, monthlyFee: isPromoted ? undefined : Number(form.get('monthlyFee')),
      dueDate: isPromoted ? undefined : String(form.get('dueDate')), whatsappAllowed: form.get('whatsappAllowed') === 'on',
      attendanceFrequency: frequency, attendanceDays: frequency === 'DAILY' ? DAYS : selectedDays,
      scheduleGroupId: String(form.get('scheduleGroupId')) || undefined,
    }
    try {
      setIsSaving(true); setFormError('')
      await apiSend(current ? `/members/${current.id}` : '/members', current ? 'PUT' : 'POST', payload)
      closeForm(); await loadData()
    } catch (requestError) { setFormError(requestError instanceof Error ? requestError.message : 'No se pudo guardar el socio.') }
    finally { setIsSaving(false) }
  }

  return <>
    <header className="page-header"><div><h1>Socios</h1><p>Administrá las personas registradas en el gimnasio.</p></div><button className="primary-button" onClick={() => openForm('new')}>Nuevo socio</button></header>
    {error && <div className="error-message">{error}</div>}
    {editing && <section className="form-card member-form-card"><div className="form-title"><div><h2>{current ? `Editar a ${current.name}` : 'Registrar socio'}</h2><p>Completá sus datos, plan y turno habitual.</p></div><button className="close-button" type="button" onClick={closeForm}>Cerrar</button></div>
      {formError && <div className="inline-form-error">{formError}</div>}
      <form className="member-form" onSubmit={handleSubmit} key={current?.id ?? 'new'}>
        <label>Nombre completo<input name="name" autoComplete="name" placeholder="Ej. Juan Pérez" defaultValue={current?.name} required /></label>
        <label>Teléfono con código de área<input name="phone" type="tel" autoComplete="tel" placeholder="Ej. 351 555 0000" pattern="[0-9+() -]{8,20}" defaultValue={current?.phone} required /><small>Este número recibirá los avisos de pago.</small></label>
        <label>DNI <span className="optional-label">Opcional</span><input name="dni" inputMode="numeric" placeholder="Ej. 35123456" pattern="[0-9.]{7,11}" defaultValue={current?.dni ?? ''} /><small>Se usa para registrar el ingreso en recepción.</small></label>
        <label>Correo electrónico <span className="optional-label">Opcional</span><input name="email" type="email" autoComplete="email" placeholder="socio@correo.com" defaultValue={current?.email ?? ''} /></label>
        <label>Plan<select name="plan" value={selectedPlan} onChange={(event) => { setSelectedPlan(event.target.value); setSelectedDays([]); setFormError('') }} required><option value="" disabled>Seleccionar plan</option>{plans.map((item) => <option key={item.id} value={item.name}>{item.name}{item.exempt ? '' : ` · ${money(item.price)}`}</option>)}</select></label>
        {isPromoted ? <div className="promoted-plan-note"><strong>Socio promocionado</strong><span>No tendrá cuota, vencimiento ni avisos automáticos de deuda.</span></div> : <>
          <label>Cuota mensual (ARS)<input name="monthlyFee" type="number" min={0} step={100} key={`fee-${selectedPlan}`} defaultValue={current && current.plan === selectedPlan ? current.monthlyFee : plan?.price ?? 0} required /><small>Por defecto, el precio del plan. Podés aplicar un descuento.</small></label>
          <label>{current ? 'Próximo vencimiento' : 'Primer vencimiento'}<input name="dueDate" type="date" min={current ? undefined : todayInputValue()} defaultValue={current?.dueDate?.slice(0, 10)} required /><small>La cuota aparecerá automáticamente en Pagos.</small></label>
        </>}
        <label>Grupo horario<select name="scheduleGroupId" defaultValue={current?.scheduleGroupId ?? ''}><option value="">Asignar más adelante</option>{groups.map((group) => <option value={group.id} key={group.id}>{group.startTime} — {group.endTime} · {group.name}</option>)}</select></label>

        <fieldset className={`days-field ${frequency === 'DAILY' ? 'days-field-disabled' : ''}`} disabled={!frequency || frequency === 'DAILY'}>
          <legend>Días de asistencia</legend>
          <p>{!frequency ? 'Primero seleccioná un plan.' : isPromoted ? 'El plan libre incluye todos los días y no genera una cuota mensual.' : frequency === 'DAILY' ? 'Este plan incluye todos los días.' : `Elegí ${requiredDays} días (${selectedDays.length}/${requiredDays}).`}</p>
          <div>{DAYS.map((day) => <label key={day} className={selectedDays.includes(day) ? 'day-selected' : ''}><input type="checkbox" checked={frequency === 'DAILY' || selectedDays.includes(day)} onChange={() => toggleDay(day)} />{day}</label>)}</div>
        </fieldset>

        <label className="checkbox-field whatsapp-consent"><input name="whatsappAllowed" type="checkbox" defaultChecked={current?.whatsappAllowed} /><span><strong>Autoriza mensajes por WhatsApp</strong><small>Necesario para enviar recordatorios automáticos de vencimiento.</small></span></label>
        {current && <div className="portal-link-field"><span><strong>Portal del socio</strong><small>Enlace personal para ver su cuota y pagar online.</small></span><button type="button" className="small-button secondary" onClick={() => void copyPortalLink(current)}>Copiar enlace</button><button type="button" className="small-button secondary" onClick={() => { regeneratePortalLink(current); closeForm() }}>Generar nuevo</button></div>}
        <div className="form-actions"><button className="secondary-button" type="button" onClick={closeForm}>Cancelar</button><button className="primary-button" disabled={isSaving}>{isSaving ? 'Guardando...' : current ? 'Guardar cambios' : 'Guardar socio'}</button></div>
      </form>
    </section>}
    <section className="table-container members-directory">
      {!isLoading && members.length > 0 && <div className="members-toolbar"><div><h2>Listado de socios</h2><span>{filteredMembers.length} de {members.length}</span></div><label className="member-search"><span>Buscar socio</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Nombre, DNI, teléfono, plan, estado..." /></label></div>}
      {isLoading ? <div className="empty-state"><p>Cargando socios...</p></div> : members.length === 0 ? <div className="empty-state"><h2>Todavía no hay socios</h2><p>Cuando registres el primero, aparecerá aquí.</p></div> : filteredMembers.length === 0 ? <div className="empty-state search-empty"><h2>No encontramos socios</h2><p>Probá con otro nombre, teléfono, plan o día.</p></div> : <div className="table-scroll"><table className="members-table"><thead><tr><th>Nombre</th><th>Estado</th><th>Plan</th><th>Cuota</th><th>Vencimiento</th><th>Días</th><th>Última visita</th><th><span className="visually-hidden">Acciones</span></th></tr></thead><tbody>{filteredMembers.map((member) => {
        const state = memberState(member)
        return <tr key={member.id}>
          <td><strong>{member.name}</strong><div className="cell-sub">{member.phone}{member.dni ? ` · DNI ${member.dni}` : ''}</div></td>
          <td><span className={`payment-status ${state.className}`}>{state.label}</span></td>
          <td>{member.plan}</td><td>{member.monthlyFee ? money(member.monthlyFee) : '—'}</td>
          <td>{member.dueDate ? shortDate(member.dueDate) : 'Sin cuota'}</td>
          <td><div className="member-days">{member.attendanceDays.map((day) => <span key={day}>{day.slice(0, 3)}</span>)}</div></td>
          <td>{member.checkIns?.[0] ? new Date(member.checkIns[0].checkedAt).toLocaleDateString('es-AR') : 'Nunca'}</td>
          <td><div className="payment-actions">
            <button className="small-button secondary" onClick={() => openForm(member)}>Editar</button>
            <button className="small-button secondary" onClick={() => void copyPortalLink(member)} title="Copiar enlace del portal del socio">Portal</button>
            {member.payments?.[0]?.status !== 'EXEMPT' && <button className="small-button secondary" onClick={() => togglePause(member)}>{member.status === 'SUSPENDED' ? 'Reactivar' : 'Pausar'}</button>}
            <button className="delete-member-button" type="button" title={`Eliminar a ${member.name}`} aria-label={`Eliminar a ${member.name}`} onClick={() => deleteMember(member)}>×</button>
          </div></td>
        </tr>
      })}</tbody></table></div>}
    </section>
  </>
}
