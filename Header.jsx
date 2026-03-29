export default function Header() {
  return (
    <div style={{ textAlign: 'center', marginBottom: 50, animation: 'fadeDown 1.2s ease forwards' }}>
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontStyle: 'italic',
        fontSize: 'clamp(11px, 2vw, 13px)',
        letterSpacing: 4,
        color: '#e8739a',
        textTransform: 'uppercase',
        marginBottom: 16,
        opacity: 0.8
      }}>
        منذ اللحظة الأولى
      </div>

      <h1 className="main-title" style={{
        fontSize: 'clamp(32px, 7vw, 62px)',
        fontWeight: 700,
        lineHeight: 1.1,
        color: '#9e3d65',
        position: 'relative',
        display: 'inline-block'
      }}>
        يوم ميلادي الحقيقي
        <span style={{
          position: 'absolute', bottom: -8, left: '50%',
          transform: 'translateX(-50%)', width: '60%', height: 2,
          background: 'linear-gradient(90deg, transparent, #e8739a, transparent)',
          display: 'block'
        }} />
      </h1>

      <div style={{ marginTop: 20, fontSize: 'clamp(14px,2.5vw,17px)', color: '#e8739a', opacity: 0.85, letterSpacing: 1 }}>
        من يوم ما الروح دخلت جسمي والحب اتولد في حياتي
      </div>

      <div style={{ fontSize: 'clamp(18px,4vw,28px)', color: '#9e3d65', marginTop: 8, letterSpacing: 2 }}>
        <span style={{ color: '#e8739a' }}>عمورتك</span>
        <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#f4a7c3', margin: '0 10px' }}>&</span>
        <span style={{ color: '#e8739a' }}>مريومتي</span>
      </div>
    </div>
  )
}
