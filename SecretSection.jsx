import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

const DEFAULT_MSG = `مريم أنا عملت الموقع ده عشان امبارح أنا عملت غلط كبير جدا اني حاولت انهي حياتي ، اه حرفيا هي حياتي علاقتنا دي روحي منغيرها مقدرش اتنفس او اعيش<br/><br/>عملت الموقع ده عشان افتكر قد ايه احنا مرينا بكتير حلو او وحش<br/><br/>أنا بحبك اوي اوي اوي اوي اوي اوي اوي اوي ومقدرش استغنى عنك`

export default function SecretSection() {
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState(DEFAULT_MSG)

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('time', 'desc'))
    const unsub = onSnapshot(q, (snap) => {
      if (!snap.empty) setMsg(snap.docs[0].data().text)
    })
    return () => unsub()
  }, [])

  return (
    <div style={{ textAlign: 'center', margin: '20px 0 40px' }}>
      <button onClick={() => setOpen(true)} style={{
        background: 'linear-gradient(135deg, #e8739a, #f4a7c3)',
        border: 'none', borderRadius: 50, padding: '14px 32px',
        color: 'white', fontSize: 'clamp(14px,3vw,17px)',
        fontFamily: "'Amiri', serif", fontWeight: 700,
        cursor: 'pointer', letterSpacing: 1,
        boxShadow: '0 6px 24px rgba(232,115,154,0.35)',
        transition: 'all 0.3s ease'
      }}>
        🤫 اضغطي هنا
      </button>

      {open && (
        <div onClick={() => setOpen(false)} style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(158,61,101,0.4)',
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 20
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.97), rgba(255,220,240,0.95))',
            borderRadius: 24, padding: '40px 32px',
            maxWidth: 500, width: '100%',
            textAlign: 'center', position: 'relative',
            boxShadow: '0 20px 60px rgba(158,61,101,0.3)',
            border: '1px solid rgba(232,115,154,0.3)',
            animation: 'fadeUp 0.4s ease'
          }}>
            <button onClick={() => setOpen(false)} style={{
              position: 'absolute', top: 16, left: 16,
              background: 'rgba(232,115,154,0.15)',
              border: 'none', borderRadius: '50%',
              width: 32, height: 32, cursor: 'pointer',
              color: '#9e3d65', fontSize: 16
            }}>✕</button>

            <div style={{ fontSize: 48, marginBottom: 16 }}>💗</div>
            <div style={{
              fontSize: 'clamp(14px,3vw,17px)',
              lineHeight: 2, color: '#5a1f3a',
              fontFamily: "'Amiri', serif"
            }} dangerouslySetInnerHTML={{ __html: msg }} />
          </div>
        </div>
      )}
    </div>
  )
}
