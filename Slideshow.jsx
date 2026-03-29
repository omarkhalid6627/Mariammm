import { useState, useEffect, useRef } from 'react'
import { db } from '../firebase'
import { collection, onSnapshot } from 'firebase/firestore'

const LOCAL_PHOTOS = Array.from({ length: 45 }, (_, i) => `/photo${i + 1}.jpg`)

export default function Slideshow() {
  const [current, setCurrent] = useState(0)
  const [photos, setPhotos] = useState(LOCAL_PHOTOS)
  const timerRef = useRef(null)

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'photos'), (snap) => {
      const extra = []
      snap.forEach(doc => extra.push(doc.data().url))
      if (extra.length > 0) setPhotos([...LOCAL_PHOTOS, ...extra])
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % photos.length)
    }, 3500)
    return () => clearInterval(timerRef.current)
  }, [photos.length])

  const go = (n) => {
    clearInterval(timerRef.current)
    setCurrent(((n % photos.length) + photos.length) % photos.length)
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % photos.length)
    }, 3500)
  }

  return (
    <div style={{ width: '100%', maxWidth: 480, margin: '0 auto 40px', animation: 'fadeUp 1.3s ease forwards' }}>
      <div style={{ textAlign: 'center', fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#e8739a', opacity: 0.7, marginBottom: 16 }}>
        حياتنا ♡
      </div>

      <div style={{
        position: 'relative', width: '100%', aspectRatio: '1/1',
        borderRadius: 20, overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(232,115,154,0.25)',
        border: '3px solid rgba(244,167,195,0.4)',
        background: 'rgba(255,240,248,0.5)'
      }}>
        {photos.map((src, i) => (
          <div key={i} style={{
            position: 'absolute', inset: 0,
            opacity: i === current ? 1 : 0,
            transition: 'opacity 0.9s ease'
          }}>
            <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(158,61,101,0.25) 0%, transparent 50%)'
            }} />
          </div>
        ))}

        <button onClick={() => go(current - 1)} style={navBtn('right')}>‹</button>
        <button onClick={() => go(current + 1)} style={navBtn('left')}>›</button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 14, flexWrap: 'wrap' }}>
        {photos.map((_, i) => (
          <div key={i} onClick={() => go(i)} style={{
            width: 7, height: 7, borderRadius: '50%', cursor: 'pointer',
            background: i === current ? '#e8739a' : 'rgba(232,115,154,0.3)',
            transform: i === current ? 'scale(1.3)' : 'scale(1)',
            transition: 'all 0.3s ease'
          }} />
        ))}
      </div>
    </div>
  )
}

function navBtn(side) {
  return {
    position: 'absolute', top: '50%', transform: 'translateY(-50%)',
    [side]: 10,
    background: 'rgba(255,255,255,0.5)',
    border: 'none', borderRadius: '50%',
    width: 34, height: 34, fontSize: 20,
    color: '#9e3d65', cursor: 'pointer',
    backdropFilter: 'blur(4px)', zIndex: 5,
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  }
}
