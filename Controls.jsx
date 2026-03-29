export default function Controls({ darkMode, onToggleDark, onSticker, onMariam }) {
  const btnStyle = {
    background: 'linear-gradient(135deg, rgba(255,240,248,0.92), rgba(255,210,230,0.92))',
    border: '1.5px solid rgba(232,115,154,0.4)',
    borderRadius: '50%', width: 42, height: 42,
    fontSize: 20, cursor: 'pointer',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 4px 18px rgba(232,115,154,0.2)',
    transition: 'all 0.3s ease',
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  }

  return (
    <div style={{ position: 'fixed', top: 24, left: 24, zIndex: 999, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <button style={btnStyle} onClick={onToggleDark} title="وضع ليلي">
        {darkMode ? '☀️' : '🌙'}
      </button>
      <button style={btnStyle} onClick={onSticker} title="ستيكر">🫶</button>
      <button style={btnStyle} onClick={onMariam} title="مريم فقط">🌸</button>
    </div>
  )
}
