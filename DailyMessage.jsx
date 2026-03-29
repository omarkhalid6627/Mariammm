import { useMemo } from 'react'
import messages from '../messages.json'

function getSunTimes() {
  const lat = 30.0444
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const dayOfYear = Math.floor((now - start) / 86400000)
  const B = (360 / 365) * (dayOfYear - 81) * (Math.PI / 180)
  const eot = 9.87 * Math.sin(2*B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B)
  const decl = 23.45 * Math.sin(B) * (Math.PI / 180)
  const latRad = lat * (Math.PI / 180)
  const hourAngle = Math.acos(-Math.tan(latRad) * Math.tan(decl)) * (180 / Math.PI)
  const solarNoon = 12 - (31.2357 - 2 * 15) / 15 - eot / 60
  return { sunrise: solarNoon - hourAngle / 15, sunset: solarNoon + hourAngle / 15 }
}

export default function DailyMessage() {
  const { greeting, msg } = useMemo(() => {
    const now = new Date()
    const hour = now.getHours() + now.getMinutes() / 60
    const { sunrise, sunset } = getSunTimes()
    const greeting = hour >= sunrise && hour < sunset
      ? 'صباح الخير يا مريومتي ☀️'
      : 'مساء الخير يا مريومتي 🌙'
    const day = now.getDate() + now.getMonth() * 31
    const msg = messages[day % messages.length]
    return { greeting, msg }
  }, [])

  return (
    <div style={{
      position: 'fixed', top: 24, right: 24, zIndex: 999,
      background: 'linear-gradient(135deg, rgba(255,240,248,0.95), rgba(255,210,230,0.92))',
      border: '1.5px solid rgba(232,115,154,0.35)',
      borderRadius: 16, padding: '12px 18px',
      maxWidth: 220, textAlign: 'right',
      backdropFilter: 'blur(12px)',
      boxShadow: '0 4px 18px rgba(232,115,154,0.18)',
      fontFamily: "'Amiri', serif",
      color: '#9e3d65', direction: 'rtl'
    }}>
      <div style={{ fontSize: 11, opacity: 0.65, marginBottom: 5, letterSpacing: 0.5 }}>{greeting}</div>
      <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.5 }}>{msg}</div>
    </div>
  )
}
