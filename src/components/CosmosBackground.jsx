import { useEffect, useRef } from 'react'

// Layers: far stars move slow, near stars move fast (parallax depth)
const LAYERS = [
  { count: 130, radius: 0.6,  speedRange: [0.08, 0.18], opacity: 0.5  }, // far
  { count:  75, radius: 1.15, speedRange: [0.22, 0.42], opacity: 0.72 }, // mid
  { count:  35, radius: 1.9,  speedRange: [0.5,  0.85], opacity: 0.95 }, // near
]

const COLORS = ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#F0A73A', '#4EC995', '#4E9FFF']

function createStars(canvas) {
  const stars = []
  for (const layer of LAYERS) {
    const [minS, maxS] = layer.speedRange
    for (let i = 0; i < layer.count; i++) {
      // Each star gets its own movement angle — spread across all directions
      const angle = Math.random() * Math.PI * 2
      const speed = minS + Math.random() * (maxS - minS)
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: layer.radius * (0.65 + Math.random() * 0.7),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        opacity: layer.opacity,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.018 + Math.random() * 0.03,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        // shooting star properties
        trail: [],
        trailLen: Math.floor(2 + Math.random() * 5),
      })
    }
  }
  return stars
}

export default function CosmosBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let stars = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      stars = createStars(canvas)
    }

    const wrap = (val, size) => {
      if (val < -10) return size + 10
      if (val > size + 10) return -10
      return val
    }

    const draw = () => {
      // Fade trail — partial clear creates subtle motion blur without accumulating
      ctx.fillStyle = 'rgba(5, 8, 15, 0.55)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (const s of stars) {
        // twinkle
        s.twinklePhase += s.twinkleSpeed
        const tw = 0.5 + 0.5 * Math.sin(s.twinklePhase)
        const alpha = s.opacity * (0.45 + 0.55 * tw)

        // move
        s.x += s.vx
        s.y += s.vy
        s.x = wrap(s.x, canvas.width)
        s.y = wrap(s.y, canvas.height)

        // draw glow aura first (behind)
        if (s.r > 1.1 || s.color !== '#ffffff') {
          const glowR = s.r * 5
          const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowR)
          const hex = s.color + '44'
          grad.addColorStop(0, hex)
          grad.addColorStop(1, 'transparent')
          ctx.save()
          ctx.globalAlpha = alpha * 0.6
          ctx.beginPath()
          ctx.arc(s.x, s.y, glowR, 0, Math.PI * 2)
          ctx.fillStyle = grad
          ctx.fill()
          ctx.restore()
        }

        // draw star core
        ctx.save()
        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = s.color
        ctx.shadowBlur = s.r > 1.3 ? 6 : 0
        ctx.shadowColor = s.color
        ctx.fill()
        ctx.restore()
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  )
}
