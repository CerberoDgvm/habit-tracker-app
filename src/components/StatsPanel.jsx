// src/components/StatsPanel.jsx
// ── Estadísticas: gráfica de barras + porcentaje ──

function StatsPanel({ habits, getStats, view }) {

  // Según la vista elegida, cuántos días mostramos
  const days = view === 'diario' ? 1 : view === 'semanal' ? 7 : 30

  if (habits.length === 0) return null

  return (
    <div className="sp-wrap">
      <h2 className="sp-title">Estadísticas</h2>

      {habits.map(habit => {
        const { data, percentage, completed, total } = getStats(habit, days)

        return (
          <div key={habit.id} className="sp-habit">

            {/* Encabezado del hábito */}
            <div className="sp-habit-header">
              <div className="sp-dot" style={{ background: habit.color }} />
              <span className="sp-habit-name">{habit.name}</span>
              <span className="sp-percent">{percentage}%</span>
            </div>

            {/* Barra de progreso */}
            <div className="sp-bar-bg">
              <div
                className="sp-bar-fill"
                style={{
                  width: `${percentage}%`,
                  background: habit.color
                }}
              />
            </div>

            {/* Mini gráfica de días — solo en vista semanal y mensual */}
            {days > 1 && (
              <div className="sp-days">
                {data.map(d => (
                  <div
                    key={d.date}
                    className={`sp-day ${d.done ? 'sp-day--done' : ''}`}
                    style={{ background: d.done ? habit.color : undefined }}
                    title={d.date}
                  />
                ))}
              </div>
            )}

            {/* Resumen en texto */}
            <p className="sp-summary">
              {completed} de {total} {total === 1 ? 'día' : 'días'} completado{completed !== 1 ? 's' : ''}
            </p>

          </div>
        )
      })}
    </div>
  )
}

export default StatsPanel