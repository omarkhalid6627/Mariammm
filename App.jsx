import { useState, useEffect } from 'react'
import Header from './components/Header'
import Slideshow from './components/Slideshow'
import Counters from './components/Counters'
import SecretSection from './components/SecretSection'
import FloatingHearts from './components/FloatingHearts'
import MusicPlayer from './components/MusicPlayer'
import DailyMessage from './components/DailyMessage'
import Controls from './components/Controls'
import StickerOverlay from './components/StickerOverlay'
import StarsCanvas from './components/StarsCanvas'
import MariamPanel from './components/MariamPanel'
import BorderFrame from './components/BorderFrame'

export default function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true')
  const [stickerOpen, setStickerOpen] = useState(false)
  const [mariamOpen, setMariamOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode)
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  return (
    <>
      <BorderFrame />
      <StarsCanvas visible={darkMode} />
      <FloatingHearts />

      {/* Fixed Controls */}
      <Controls
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(d => !d)}
        onSticker={() => setStickerOpen(true)}
        onMariam={() => setMariamOpen(true)}
      />

      <DailyMessage />
      <MusicPlayer />

      {/* Main Content */}
      <div className="page" style={{
        position: 'relative', zIndex: 1,
        minHeight: '100vh', display: 'flex',
        flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '40px 20px'
      }}>
        <Header />
        <Slideshow />
        <Counters />
        <SecretSection />
      </div>

      {/* Overlays */}
      <StickerOverlay open={stickerOpen} onClose={() => setStickerOpen(false)} />
      <MariamPanel open={mariamOpen} onClose={() => setMariamOpen(false)} />
    </>
  )
}
