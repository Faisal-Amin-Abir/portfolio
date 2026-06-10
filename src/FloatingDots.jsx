import { useEffect, useRef, useState } from 'react'

const DOT_COLORS = [
  'rgb(255, 255, 255)',
  'rgb(255, 96, 96)',
  'rgb(92, 146, 255)',
]

const randomBetween = (min, max) => Math.random() * (max - min) + min
const pickRandom = (items) => items[Math.floor(Math.random() * items.length)]

const createDot = (id, viewportWidth, viewportHeight) => {
  const size = randomBetween(viewportWidth < 680 ? 4 : 5, viewportWidth < 680 ? 9 : 11)
  const angle = randomBetween(0, Math.PI * 2)
  const speed = randomBetween(0.004, 0.014)
  const life = randomBetween(viewportWidth < 680 ? 4200 : 5200, viewportWidth < 680 ? 8200 : 10800)
  const maxDistance = randomBetween(viewportHeight * 0.22, viewportHeight * 0.58)

  return {
    id,
    x: randomBetween(0, Math.max(viewportWidth - size, 1)),
    y: randomBetween(0, Math.max(viewportHeight - size, 1)),
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    swayX: randomBetween(-0.01, 0.01),
    swayY: randomBetween(-0.01, 0.01),
    swaySpeed: randomBetween(0.0008, 0.002),
    swayPhase: randomBetween(0, Math.PI * 2),
    size,
    color: pickRandom(DOT_COLORS),
    baseOpacity: randomBetween(0.65, 1),
    life,
    maxDistance,
    age: 0,
    travelled: 0,
    opacity: 1,
  }
}

export default function FloatingDots() {
  const [dots, setDots] = useState([])
  const [reduceMotion, setReduceMotion] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })
  const frameRef = useRef(0)
  const spawnTimerRef = useRef(0)
  const dotsRef = useRef([])
  const nextIdRef = useRef(0)
  const lastTimeRef = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const clearAnimation = () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current)
        frameRef.current = 0
      }

      if (spawnTimerRef.current) {
        window.clearInterval(spawnTimerRef.current)
        spawnTimerRef.current = 0
      }

      lastTimeRef.current = 0
      dotsRef.current = []
      setDots([])
    }

    const spawnDot = () => {
      const dot = createDot(nextIdRef.current, window.innerWidth, window.innerHeight)
      nextIdRef.current += 1
      dotsRef.current = [...dotsRef.current.slice(-18), dot]
      setDots(dotsRef.current)
    }

    const tick = (time) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time
      }

      const delta = Math.min(time - lastTimeRef.current, 34)
      lastTimeRef.current = time
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      dotsRef.current = dotsRef.current.flatMap((dot) => {
        const nextAge = dot.age + delta
        const sway = Math.sin(nextAge * dot.swaySpeed + dot.swayPhase)
        const sway2 = Math.cos(nextAge * dot.swaySpeed * 0.8 + dot.swayPhase * 1.37)
        const nextX = dot.x + dot.vx * delta + sway * dot.swayX * delta * 10
        const nextY = dot.y + dot.vy * delta + sway2 * dot.swayY * delta * 10
        const nextTravelled = dot.travelled + Math.hypot(nextX - dot.x, nextY - dot.y)
        const fadeByAge = 1 - nextAge / dot.life
        const fadeByDistance = 1 - nextTravelled / dot.maxDistance
        const fade = Math.max(0, Math.min(fadeByAge, fadeByDistance))

        if (
          fade <= 0 ||
          nextX < -40 ||
          nextX > viewportWidth + 40 ||
          nextY < -40 ||
          nextY > viewportHeight + 40
        ) {
          return []
        }

        return [
          {
            ...dot,
            x: nextX,
            y: nextY,
            age: nextAge,
            travelled: nextTravelled,
            opacity: dot.baseOpacity * fade,
          },
        ]
      })

      setDots(dotsRef.current)
      frameRef.current = window.requestAnimationFrame(tick)
    }

    const start = () => {
      clearAnimation()

      dotsRef.current = Array.from({ length: window.innerWidth < 680 ? 3 : 4 }, () =>
        createDot(nextIdRef.current++, window.innerWidth, window.innerHeight),
      )
      setDots(dotsRef.current)

      spawnTimerRef.current = window.setInterval(
        spawnDot,
        window.innerWidth < 680 ? 1000 : 780,
      )
      frameRef.current = window.requestAnimationFrame(tick)
    }

    const stop = () => {
      clearAnimation()
    }

    const syncPreference = () => {
      const prefersReduced = mediaQuery.matches
      setReduceMotion(prefersReduced)

      if (prefersReduced) {
        stop()
        return
      }

      start()
    }

    syncPreference()

    const handlePreferenceChange = () => {
      syncPreference()
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handlePreferenceChange)
    } else {
      mediaQuery.addListener(handlePreferenceChange)
    }

    return () => {
      stop()
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handlePreferenceChange)
      } else {
        mediaQuery.removeListener(handlePreferenceChange)
      }
    }
  }, [])

  if (reduceMotion) {
    return null
  }

  return (
    <div className="floating-dots" aria-hidden="true">
      {dots.map((dot) => (
        <span
          key={dot.id}
          className="floating-dot"
          style={{
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            backgroundColor: dot.color,
            opacity: dot.opacity,
            transform: `translate3d(${dot.x}px, ${dot.y}px, 0)`,
          }}
        />
      ))}
    </div>
  )
}
