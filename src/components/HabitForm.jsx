import { useState } from 'react'

const COLORS = [
  '#C8341A', '#D4961C', '#181410', '#2A7F6F',
  '#4A6FA5', '#8B4A8B', '#E85D9A', '#3D9E56',
  '#E8873A', '#5B8DB8', '#A0522D', '#708090',
]

const EMOJIS = [
  '💧','🏃','📚','🧘','🍎','💪',
  '✍️','🎯','🌙','☀️','🎨','🎵',
  '🧠','💊','🚴','🥗','😴','🙏',
]

function HabitForm({ onAdd }) {
  const [name,  setName]  = useState('')
  const [color, setColor] = useState(COLORS[0])
  const [emoji, setEmoji] = useState('💧')
  const [error, setError] = useState('')
  const [showEmojis, setShowEmojis] = useState(false)

  const handleSubmit = () => {
    if (!name.trim()) {
      setError('Escribe el nombre del hábito.')
      return
    }
    onAdd(name.trim(), color, emoji)
    setName('')
    setColor(COLORS[0])
    setEmoji('💧')
    setError('')
    setShowEmojis(false)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="hf-wrap">
      <h2 className="hf-title">Nuevo hábito</h2>

      <div className="hf-row">

        {/* Botón emoji — abre el selector */}
        <button
          className="hf-emoji-btn"
          onClick={() => setShowEmojis(!showEmojis)}
          title="Elegir emoji"
        >
          {emoji}
        </button>

        <input
          className="hf-input"
          placeholder="Ej: Leer 30 min, Ejercicio, Agua..."
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={handleKey}
        />

        <button className="hf-btn" onClick={handleSubmit}>
          + Agregar
        </button>
      </div>

      {/* Selector de emojis — aparece al hacer clic en el botón */}
      {showEmojis && (
        <div className="hf-emoji-grid">
          {EMOJIS.map(e => (
            <button
              key={e}
              className={`hf-emoji-option ${emoji === e ? 'hf-emoji-option--active' : ''}`}
              onClick={() => { setEmoji(e); setShowEmojis(false); }}
            >
              {e}
            </button>
          ))}
        </div>
      )}

      {/* Selector de colores */}
      <div className="hf-colors" style={{ marginTop: 12 }}>
        {COLORS.map(c => (
          <button
            key={c}
            className={`hf-color ${color === c ? 'hf-color--active' : ''}`}
            style={{ background: c }}
            onClick={() => setColor(c)}
            title={c}
          />
        ))}
      </div>

      {error && <p className="hf-error">{error}</p>}
    </div>
  )
}

export default HabitForm