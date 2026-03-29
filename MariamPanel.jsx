import { useState } from 'react'
import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const PASS = 'mariam'

export default function MariamPanel({ open, onClose }) {
  const [unlocked, setUnlocked] = useState(false)
  const [msg, setMsg] = useState('')

  const tryOpen = () => {
    const p = prompt('أدخلي كلمة السر يا مريومتي 🔑')
    if (p === PASS) setUnlocked(true)
    else if (p !== null) alert('كلمة السر غلط ❌')
  }

  const addPhoto = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (ev) => {
        const img = new Image()
        img.onload = async () => {
          const canvas = document.createElement('canvas')
          const scale = Math.min(1, 800 / img.width)
          canvas.width = img.width * scale
          canvas.height = img.height * scale
          canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
          const compressed = canvas.toDataURL('image/jpeg', 0.7)
          await addDoc(collection(db, 'photos'), { url: compressed, time: serverTimestamp() })
          alert('✅ الصورة اتضافت!')
        }
        img.src = ev.target.result
      }
      reader.readAsDataURL(file)
    }
    input.click()
  }

  const sendMsg = async () => {
    if (!msg.trim()) return
    await addDoc(collection(db, 'messages'), { text: msg.trim(), time: serverTimestamp() })
    setMsg('')
    alert('✅ الرسالة اتبعتت!')
  }

  if (!open) return null

  if (!unlocked) {
    tryOpen()
    return null
  }

  const panelBtn = {
    background: 'linear-gradient(135deg, #e8739a, #f4a7c3)',
    border: 'none', borderRadius: 50,
    padding: '10px 20px', color: 'white',
    fontFamily: "'Amiri', serif", fontSize: 14, fontWeight: 700,
    cursor: 'pointer', width: '100%', marginTop: 8
  }

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'linear-gradient(135deg, #fff0f8, #ffd6e8)',
        borderRadius: 24, padding: '28px 24px',
        width: '85vw', maxWidth: 380,
        position: 'relative', direction: 'rtl',
        boxShadow: '0 10px 50px rgba(232,115,154,0.3)'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 14, left: 14,
          background: 'none', border: 'none', fontSize: 20,
          cursor: 'pointer', color: '#9e3d65', opacity: 0.6
        }}>✕</button>

        <div style={{ fontFamily: "'Amiri',serif", fontSize: 20, fontWeight: 700, color: '#9e3d65', textAlign: 'center', marginBottom: 20 }}>
          لوحة مريومتي 🌸
        </div>

        <div style={{ background: 'rgba(255,255,255,0.6)', borderRadius: 16, padding: 16, marginBottom: 14 }}>
          <div style={{ fontFamily: "'Amiri',serif", fontSize: 14, color: '#9e3d65', fontWeight: 700, marginBottom: 12 }}>
            ✨ ضيفي صورة للسلايد شو
          </div>
          <button style={panelBtn} onClick={addPhoto}>📷 اختاري صورة</button>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.6)', borderRadius: 16, padding: 16 }}>
          <div style={{ fontFamily: "'Amiri',serif", fontSize: 14, color: '#9e3d65', fontWeight: 700, marginBottom: 12 }}>
            💌 ابعتيلي رسالة سرية
          </div>
          <textarea
            value={msg}
            onChange={e => setMsg(e.target.value)}
            placeholder="اكتبي هنا..."
            style={{
              width: '100%', border: '1px solid rgba(232,115,154,0.3)',
              borderRadius: 12, padding: 10,
              fontFamily: "'Amiri',serif", fontSize: 14, color: '#5a1f3a',
              background: 'rgba(255,255,255,0.8)', resize: 'none', height: 80,
              direction: 'rtl', outline: 'none', boxSizing: 'border-box'
            }}
          />
          <button style={panelBtn} onClick={sendMsg}>إرسال 💗</button>
        </div>
      </div>
    </div>
  )
}
