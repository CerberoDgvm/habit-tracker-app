// src/components/HabitCard.jsx
// ── Tarjeta individual de cada hábito ──

function HabitCard({ habit, onToggle, onDelete, today }) {
  // Verificamos si el hábito fue completado hoy
  const doneToday = habit.completedDates.includes(today)

  return (
    <div className={`hc-card ${doneToday ? 'hc-card--done' : ''}`}>

      {/* Barra de color izquierda — identifica el hábito */}
      <div className="hc-bar" style={{ background: habit.color }} />

      <div className="hc-content">
        <div className="hc-top">
          <span className="hc-name">{habit.emoji} {habit.name}</span>

          {/* Botón eliminar */}
          <button
            className="hc-delete"
            onClick={() => onDelete(habit.id)}
            title="Eliminar hábito"
          >
            ✕
          </button>
        </div>

        {/* Streak — cuántos días seguidos lleva */}
        <span className="hc-streak">
          🔥 {getStreak(habit.completedDates)} días seguidos
        </span>
      </div>

      {/* Botón principal — marcar como completado */}
      <button
        className={`hc-check ${doneToday ? 'hc-check--done' : ''}`}
        onClick={() => onToggle(habit.id)}
      >
        {doneToday ? '✓' : '○'}
      </button>

    </div>
  )
}

// Calcula cuántos días seguidos lleva completado el hábito
// Cuenta hacia atrás desde hoy hasta encontrar un día sin completar
function getStreak(completedDates) {
  let streak = 0
  const d = new Date()

  while (true) {
    const dateStr = d.toISOString().split('T')[0]
    if (!completedDates.includes(dateStr)) break
    streak++
    d.setDate(d.getDate() - 1)
  }

  return streak
}

export default HabitCard