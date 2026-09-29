export function Brand({ large = false }: { large?: boolean }) {
  return <div className={`brand ${large ? 'brand-large' : ''}`}><span className="brand-mark">PG</span><span className="brand-name">Profesional<strong>Gym</strong></span></div>
}
