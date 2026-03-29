import { useState, useEffect } from 'react'

const START = new Date('2023-11-22T09:00:00+02:00')

function fmt(n) {
  return n.toLocaleString('ar-EG')
}

export default function Counters() {
  const [vals, setVals] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const tick = () => {
      const diff = Date.now() - START.getTime()
      setVals({
        days: Math.floor(diff / 86400000),
        hours: Math.floor(diff / 3600000),
        minutes: Math.floor(diff / 60000),
        seconds: Math.floor(diff / 1000),
      })
    }
    tick()
    const t = setInterval(tick, 1000)
    return () => clearInterval(t)
  }, [])

  const cards = [
    { label: 'أيام', val: vals.days, unit: 'يوم معكِ' },
    { label: 'ساعات', val: vals.hours, unit: 'ساعة من السعادة' },
    { label: 'دقائق', val: vals.minutes, unit: 'دقيقة لا تُنسى' },
    { label: 'ثواني', val: vals.seconds, unit: 'ثانية من القلب' },
  ]

  return (
    <>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(2,1fr)',
        gap: 20, width: '100%', maxWidth: 600,
        margin: '20px 0 50px', animation: 'fadeUp 1.4s ease forwards'
      }}>
        {cards.map(({ label, val, unit }) => (
          <div key={label} className="counter-card" style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.85), rgba(255,220,235,0.6))',
            border: '1px solid rgba(232,115,154,0.3)',
            borderRadius: 16, padding: '28px 20px',
            textAlign: 'center', position: 'relative',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 20px rgba(232,115,154,0.12)',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,transparent,#e8739a,#f4a7c3,transparent)' }} />
            <div style={{ fontSize: 'clamp(10px,2vw,12px)', letterSpacing: 3, textTransform: 'uppercase', color: '#f4a7c3', marginBottom: 12, fontWeight: 700 }}>
              {label}
            </div>
            <div className="counter-number" style={{ fontSize: 'clamp(36px,8vw,64px)', fontWeight: 700, color: '#9e3d65', lineHeight: 1 }}>
              {fmt(val)}
            </div>
            <div style={{ fontSize: 'clamp(10px,2vw,13px)', color: '#e8739a', marginTop: 10, opacity: 0.8 }}>
              {unit}
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', margin: '0 0 30px', color: '#e8739a', opacity: 0.5, fontSize: 20 }}>♡</div>

      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#f4a7c3', opacity: 0.7, marginBottom: 8 }}>
          بدأت القصة
        </div>
        <div style={{ fontSize: 'clamp(14px,3vw,18px)', color: '#9e3d65', fontWeight: 700 }}>
          ٢٢ نوفمبر ٢٠٢٣ — الساعة ٩:٠٠ صباحاً
        </div>
      </div>
    </>
  )
}
