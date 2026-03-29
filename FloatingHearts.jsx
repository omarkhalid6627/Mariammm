import { useEffect, useRef } from 'react'

const HEARTS = ['♡', '♥', '❤', '💕', '💗', '💓', '💖']
const COLORS = ['#e8739a', '#f4a7c3', '#ff85a1', '#ff6b9d', '#ffb3d1', '#d63384']

export default function FloatingHearts() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current

    const create = () => {
      const h = document.createElement('div')
      h.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)]
      h.style.cssText = `
        position:absolute;
        left:${Math.random() * 98}vw;
        bottom:-30px;
        font-size:${16 + Math.random() * 22}px;
        color:${COLORS[Math.floor(Math.random() * COLORS.length)]};
        pointer-events:none;
        animation:floatHeart ${12 + Math.random() * 16}s linear forwards;
        opacity:1;
      `
      container.appendChild(h)
      setTimeout(() => h.remove(), 28000)
    }

    for (let i = 0; i < 15; i++) setTimeout(create, i * 400)
    const interval = setInterval(create, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} style={{
      position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden'
    }} />
  )
}
