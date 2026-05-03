import { useState } from 'react'
import { useHabits } from './hooks/useHabits'
import HabitForm from './components/HabitForm'
import HabitCard from './components/HabitCard'
import StatsPanel from './components/StatsPanel'
import ViewToggle from './components/ViewToggle'

function App() {
  const { habits, addHabit, deleteHabit, toggleHabit, getStats, today } = useHabits()

  // Vista activa — diario por defecto
  const [view, setView] = useState('diario')

  return (
    <div className="app-wrap">
      <header className="app-header">
        <h1 className="app-logo">Habit<em>Tracker</em></h1>
        <p className="app-sub">{habits.length} hábitos activos</p>
      </header>

      <main className="app-main">
        <HabitForm onAdd={addHabit} />

        {habits.length > 0 && (
          <ViewToggle view={view} onChange={setView} />
        )}

        {/* Grid de dos columnas: hábitos izquierda, stats derecha */}
        <div className="app-grid">

          {/* Columna izquierda — lista de hábitos */}
          <div>
            {habits.length === 0 ? (
              <p className="app-empty">
                No tienes hábitos todavía. ¡Agrega uno arriba!
              </p>
            ) : (
              habits.map(habit => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onToggle={toggleHabit}
                  onDelete={deleteHabit}
                  today={today()}
                />
              ))
            )}
          </div>

          {/* Columna derecha — estadísticas */}
          <div>
            <StatsPanel
              habits={habits}
              getStats={getStats}
              view={view}
            />
          </div>

        </div>
      </main>
    </div>
  )
}

export default App