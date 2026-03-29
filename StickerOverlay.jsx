export default function StickerOverlay({ open, onClose }) {
  if (!open) return null
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer'
    }}>
      <div style={{ position: 'absolute', top: 20, right: 24, color: 'white', fontSize: 28, opacity: 0.8 }}>✕</div>
      <img
        src="/sticker.jpg"
        alt="sticker"
        style={{
          maxWidth: '85vw', maxHeight: '85vh',
          borderRadius: 20,
          boxShadow: '0 10px 60px rgba(232,115,154,0.5)',
          animation: 'imgPop 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards',
          border: '3px solid rgba(255,200,225,0.6)'
        }}
      />
    </div>
  )
}
