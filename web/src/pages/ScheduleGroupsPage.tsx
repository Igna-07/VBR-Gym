import { useEffect, useState, type FormEvent } from 'react'
import { apiFetch } from '../api'

type Member = { id: string; name: string; phone: string; attendanceFrequency: 'THREE_DAYS' | 'DAILY'; attendanceDays: string[]; scheduleGroupId: string | null }
type Group = { id: string; name: string; startTime: string; endTime: string; capacity: number; members: Member[] }
const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

export function ScheduleGroupsPage() {
  const [groups, setGroups] = useState<Group[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [selectedDay, setSelectedDay] = useState(DAYS[Math.min(new Date().getDay() - 1, 5)] || 'Lunes')
  const [showForm, setShowForm] = useState(false)
  const [addingTo, setAddingTo] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  async function loadData() {
    try {
      const [groupsResponse, membersResponse] = await Promise.all([apiFetch(`/schedule-groups`), apiFetch(`/members`)])
      if (!groupsResponse.ok || !membersResponse.ok) throw new Error()
      setGroups(await groupsResponse.json()); setMembers(await membersResponse.json())
    } catch { setError('No se pudieron cargar los turnos.') }
    finally { setIsLoading(false) }
  }
  useEffect(() => { void loadData() }, [])

  async function createGroup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = new FormData(event.currentTarget)
    try {
      setIsSaving(true); setError('')
      const response = await apiFetch(`/schedule-groups`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: String(form.get('name')), startTime: String(form.get('startTime')), endTime: String(form.get('endTime')), capacity: Number(form.get('capacity')) }) })
      if (!response.ok) throw new Error('No se pudo crear el horario.')
      setShowForm(false); await loadData()
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : 'No se pudo crear el horario.') }
    finally { setIsSaving(false) }
  }

  async function addMember(groupId: string, memberId: string) {
    try {
      setError('')
      const response = await apiFetch(`/schedule-groups/${groupId}/members/${memberId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ day: selectedDay }) })
      if (!response.ok) { const body = await response.json(); throw new Error(body.message || 'No se pudo agregar el socio.') }
      setAddingTo(null); await loadData()
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : 'No se pudo agregar el socio.') }
  }

  async function removeMember(groupId: string, memberId: string) {
    await apiFetch(`/schedule-groups/${groupId}/members/${memberId}`, { method: 'DELETE' }); await loadData()
  }

  async function deleteGroup(group: Group) {
    if (!window.confirm(`¿Eliminar el turno ${group.startTime} — ${group.endTime}? Los socios quedarán sin turno asignado.`)) return
    const response = await apiFetch(`/schedule-groups/${group.id}`, { method: 'DELETE' })
    if (!response.ok) { setError('No se pudo eliminar el turno.'); return }
    setAddingTo(null); await loadData()
  }

  return <>
    <header className="page-header"><div><h1>Turnos </h1><p>Consultá cada jornada con sus horarios y socios asignados.</p></div><button className="primary-button" onClick={() => setShowForm(true)}>Nuevo horario</button></header>
    <nav className="day-tabs" aria-label="Días de asistencia">{DAYS.map((day) => <button key={day} className={selectedDay === day ? 'active' : ''} onClick={() => { setSelectedDay(day); setAddingTo(null) }}>{day}</button>)}</nav>
    {error && <div className="error-message">{error}</div>}
    {showForm && <section className="form-card"><div className="form-title"><h2>Crear grupo horario</h2><button className="close-button" onClick={() => setShowForm(false)}>Cerrar</button></div><form className="schedule-form" onSubmit={createGroup}><label>Nombre<input name="name" placeholder="Grupo mañana" required /></label><label>Inicio<input name="startTime" type="time" required /></label><label>Fin<input name="endTime" type="time" required /></label><label>Cupo por día<input name="capacity" type="number" min="1" max="100" defaultValue="15" required /></label><div className="form-actions"><button className="secondary-button" type="button" onClick={() => setShowForm(false)}>Cancelar</button><button className="primary-button" disabled={isSaving}>{isSaving ? 'Guardando...' : 'Crear horario'}</button></div></form></section>}
    <section className="selected-day-heading"><div><span>Agenda del día</span><h2>{selectedDay}</h2></div><strong>{groups.reduce((total, group) => total + group.members.filter((member) => member.attendanceDays.includes(selectedDay)).length, 0)} socios</strong></section>
    <section className="schedule-list">{isLoading ? <div className="empty-state"><p>Cargando horarios...</p></div> : groups.map((group) => {
      const dayMembers = group.members.filter((member) => member.attendanceDays.includes(selectedDay))
      const compatibleMembers = members.filter((member) => member.attendanceDays.includes(selectedDay) && member.scheduleGroupId !== group.id)
      return <article className="schedule-group" key={group.id}>
        <header className="schedule-group-header"><div><span className="schedule-name">{group.name}</span><h2>{group.startTime} — {group.endTime}</h2></div><div className="group-header-actions"><span className="capacity-badge">{dayMembers.length} / {group.capacity}</span><button className="add-member-button" onClick={() => setAddingTo(addingTo === group.id ? null : group.id)}>+ <span>Agregar socio</span></button><button className="delete-group-button" onClick={() => void deleteGroup(group)}>Eliminar</button></div></header>
        {addingTo === group.id && <div className="member-picker"><strong>Socios que asisten el {selectedDay.toLowerCase()}</strong>{compatibleMembers.length === 0 ? <p>No hay socios compatibles disponibles.</p> : <div className="member-picker-list">{compatibleMembers.map((member) => <button key={member.id} onClick={() => void addMember(group.id, member.id)}><span>{member.name}</span><small>{member.scheduleGroupId ? 'Mover desde otro horario' : member.phone}</small></button>)}</div>}</div>}
        {dayMembers.length === 0 ? <p className="group-empty">No hay personas asignadas a este horario el {selectedDay.toLowerCase()}.</p> : <div className="schedule-members">{dayMembers.map((member) => <div className="schedule-member" key={member.id}><div><strong>{member.name}</strong><span>{member.phone}</span></div><div className="member-row-actions"><span className="attendance-chip">{member.attendanceFrequency === 'DAILY' ? 'Todos los días' : member.attendanceDays.join(', ')}</span><button className="remove-member-button" title="Quitar del turno" onClick={() => void removeMember(group.id, member.id)}>×</button></div></div>)}</div>}
      </article>
    })}</section>
  </>
}
