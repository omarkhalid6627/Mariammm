export default function BorderFrame() {
  const cornerSvg = (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 38 C2 20 20 2 38 2" stroke="#e8739a" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <circle cx="4" cy="36" r="2" fill="#f4a7c3" opacity="0.6"/>
      <circle cx="36" cy="4" r="2" fill="#f4a7c3" opacity="0.6"/>
      <path d="M8 32 C8 20 20 8 32 8" stroke="#f4a7c3" strokeWidth="0.5" strokeLinecap="round" opacity="0.4"/>
    </svg>
  )
  const s = { position: 'fixed', width: 40, height: 40, zIndex: 11, pointerEvents: 'none' }
  return (
    <>
      <div style={{ ...s, top: 8, right: 8 }}>{cornerSvg}</div>
      <div style={{ ...s, top: 8, left: 8, transform: 'scaleX(-1)' }}>{cornerSvg}</div>
      <div style={{ ...s, bottom: 8, right: 8, transform: 'scaleY(-1)' }}>{cornerSvg}</div>
      <div style={{ ...s, bottom: 8, left: 8, transform: 'scale(-1)' }}>{cornerSvg}</div>
      <div style={{
        position: 'fixed', inset: 12,
        border: '1.5px solid rgba(232,115,154,0.35)',
        borderRadius: 8, pointerEvents: 'none', zIndex: 10
      }} />
    </>
  )
}
