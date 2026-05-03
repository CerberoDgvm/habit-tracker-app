// src/components/ViewToggle.jsx
// ── Selector de vista: diario / semanal / mensual ──

const VIEWS = ['diario', 'semanal', 'mensual']

function ViewToggle({ view, onChange }) {
  return (
    <div className="vt-wrap">
      {VIEWS.map(v => (
        <button
          key={v}
          className={`vt-btn ${view === v ? 'vt-btn--active' : ''}`}
          onClick={() => onChange(v)}
        >
          {v.charAt(0).toUpperCase() + v.slice(1)}
        </button>
      ))}
    </div>
  )
}

export default ViewToggle