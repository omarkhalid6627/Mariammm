import { useState, useRef, useEffect } from 'react'

const SONGS = [
  { src: '/song1.mp3', name: 'Mia & Sebastian' },
  { src: '/song2.mp3', name: 'Die With A Smile' },
]

export default function MusicPlayer() {
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.src = SONGS[current].src
    audio.loop = true
    audio.volume = 0.7
    if (playing) audio.play().catch(() => {})
  }, [current])

  useEffect(() => {
    const tryPlay = () => {
      if (startedRef.current) return
      startedRef.current = true
      audioRef.current?.play().then(() => setPlaying(true)).catch(() => {})
      document.removeEventListener('click', tryPlay)
      document.removeEventListener('touchstart', tryPlay)
    }
    // Try autoplay first
    audioRef.current?.play().then(() => {
      startedRef.current = true
      setPlaying(true)
    }).catch(() => {
      document.addEventListener('click', tryPlay)
      document.addEventListener('touchstart', tryPlay)
    })
    return () => {
      document.removeEventListener('click', tryPlay)
      document.removeEventListener('touchstart', tryPlay)
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    startedRef.current = true
    if (playing) { audio.pause(); setPlaying(false) }
    else { audio.play(); setPlaying(true) }
  }

  const switchSong = () => {
    const audio = audioRef.current
    if (!audio) return
    const wasPlaying = playing
    audio.pause()
    const next = (current + 1) % SONGS.length
    setCurrent(next)
    audio.src = SONGS[next].src
    audio.loop = true
    audio.volume = 0.7
    if (wasPlaying) { audio.play().catch(() => {}); setPlaying(true) }
  }

  const btn = {
    background: playing
      ? 'linear-gradient(135deg, rgba(255,200,225,0.95), rgba(232,115,154,0.25))'
      : 'linear-gradient(135deg, rgba(255,240,248,0.95), rgba(255,210,230,0.95))',
    border: '1.5px solid rgba(232,115,154,0.4)',
    borderRadius: 50, cursor: 'pointer',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 4px 18px rgba(232,115,154,0.2)',
    transition: 'all 0.3s ease',
    fontFamily: "'Amiri', serif",
    color: '#9e3d65',
    display: 'flex', alignItems: 'center', gap: 6,
    animation: playing ? 'musicPulse 2.5s ease-in-out infinite' : 'none'
  }

  return (
    <>
      <audio ref={audioRef} loop />
      <div style={{
        position: 'fixed', bottom: 24, left: 24, zIndex: 999,
        display: 'flex', flexDirection: 'column',
        alignItems: 'flex-start', gap: 6, direction: 'rtl'
      }}>
        <div style={{ fontSize: 11, color: '#9e3d65', opacity: 0.75, paddingRight: 4 }}>
          {SONGS[current].name}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button onClick={toggle} style={{ ...btn, padding: '9px 18px', fontSize: 14, fontWeight: 700 }}>
            <span style={{ fontSize: 18 }}>{playing ? '♫' : '♪'}</span>
            <span>{playing ? 'إيقاف' : 'تشغيل'}</span>
          </button>
          <button onClick={switchSong} style={{ ...btn, padding: '9px 13px', fontSize: 16 }}>⏭</button>
        </div>
      </div>
    </>
  )
}
