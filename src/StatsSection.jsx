import { useEffect, useRef, useState } from 'react'
import { Award, Code2, Target, Trophy } from 'lucide-react'

const defaultStats = [
  {
    icon: Trophy,
    value: '20+ IUPCs',
    label: 'Participated since 2022',
    featured: true,
  },
  {
    icon: Target,
    value: '1850+',
    label: 'Problems solved',
  },
  {
    icon: Code2,
    value: '230+',
    label: 'Online contests',
  },
  {
    icon: Award,
    value: '3×',
    label: 'Intra-AIUB champion',
  },
]

function StatCard({ icon, value, label, featured = false, delay = 0 }) {
  const Icon = icon

  return (
    <div
      className={`stat-card ${featured ? 'cp-overview-main' : ''}`}
      style={{ '--card-delay': `${delay}ms` }}
    >
      <div className="stat-icon" aria-hidden="true">
        <Icon size={featured ? 28 : 24} />
      </div>
      <strong>{value}</strong>
      <span className="stat-label">{label}</span>
    </div>
  )
}

export default function StatsSection({ stats = defaultStats }) {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const syncPreference = () => {
      setReduceMotion(mediaQuery.matches)
    }

    syncPreference()

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', syncPreference)
    } else {
      mediaQuery.addListener(syncPreference)
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', syncPreference)
      } else {
        mediaQuery.removeListener(syncPreference)
      }
    }
  }, [])

  useEffect(() => {
    if (reduceMotion) {
      setIsVisible(true)
      return undefined
    }

    const node = sectionRef.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.35,
        rootMargin: '0px 0px -10% 0px',
      },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [reduceMotion])

  return (
    <div
      ref={sectionRef}
      className={`cp-overview stats-section ${isVisible ? 'is-visible' : ''}`}
    >
      {stats.map((stat, index) => (
        <StatCard
          key={stat.label}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
          featured={stat.featured}
          delay={index * 120}
        />
      ))}
    </div>
  )
}


