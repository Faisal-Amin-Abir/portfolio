import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  ExternalLink,
  Menu,
  Trophy,
  X,
} from 'lucide-react'
import { portfolioData as data } from './data'

const navItems = [
  { label: 'Competitive', id: 'competitive' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Contact', id: 'contact' },
]

const randomBetween = (min, max) => Math.random() * (max - min) + min

function FloatingBubbles() {
  const [bubbles, setBubbles] = useState([])
  const [reduceMotion, setReduceMotion] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })
  const loopTimerRef = useRef(null)
  const cleanupTimersRef = useRef(new Set())
  const runningRef = useRef(false)
  const nextIdRef = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const clearTimers = () => {
      if (loopTimerRef.current !== null) {
        window.clearTimeout(loopTimerRef.current)
        loopTimerRef.current = null
      }

      cleanupTimersRef.current.forEach((timerId) => window.clearTimeout(timerId))
      cleanupTimersRef.current.clear()
    }

    const removeBubble = (id) => {
      setBubbles((current) => current.filter((bubble) => bubble.id !== id))
    }

    const spawnBubble = () => {
      const smallScreen = window.innerWidth < 680
      const id = nextIdRef.current + 1
      nextIdRef.current = id
      const size = randomBetween(smallScreen ? 8 : 10, smallScreen ? 18 : 28)
      const duration = randomBetween(smallScreen ? 10 : 8, smallScreen ? 15 : 13)
      const rise = -(window.innerHeight + randomBetween(120, 320))
      const bubble = {
        id,
        style: {
          '--bubble-size': `${size.toFixed(1)}px`,
          '--bubble-left': `${randomBetween(0, 100).toFixed(2)}vw`,
          '--bubble-drift-x': `${randomBetween(-90, 90).toFixed(1)}px`,
          '--bubble-rise': `${rise.toFixed(1)}px`,
          '--bubble-duration': `${duration.toFixed(2)}s`,
          '--bubble-opacity': randomBetween(0.14, 0.34).toFixed(2),
        },
      }

      setBubbles((current) => [...current.slice(-32), bubble])

      const timerId = window.setTimeout(() => {
        removeBubble(id)
        cleanupTimersRef.current.delete(timerId)
      }, duration * 1000 + 200)

      cleanupTimersRef.current.add(timerId)
    }

    const scheduleSpawn = () => {
      if (!runningRef.current) return
      spawnBubble()

      const nextDelay = randomBetween(500, 1100)
      loopTimerRef.current = window.setTimeout(scheduleSpawn, nextDelay)
    }

    const start = () => {
      if (runningRef.current) return
      runningRef.current = true

      for (let index = 0; index < 4; index += 1) {
        spawnBubble()
      }

      scheduleSpawn()
    }

    const stop = (clearBubbles = true) => {
      runningRef.current = false
      clearTimers()
      if (clearBubbles) {
        setBubbles([])
      }
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
      stop(false)
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
    <div className="floating-bubbles" aria-hidden="true">
      {bubbles.map((bubble) => (
        <span key={bubble.id} className="floating-bubble" style={bubble.style} />
      ))}
    </div>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="brand" href="#top" aria-label="Go to the top">
        <span>{data.initials}</span>
        <span className="brand-dot" />
      </a>

      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <a key={item.id} href={`#${item.id}`}>
            {item.label}
          </a>
        ))}
      </nav>

      <a className="header-cta" href={`mailto:${data.email}`}>
        Contact <ArrowUpRight size={16} />
      </a>

      <button
        className="menu-button"
        type="button"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>

      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}>
        <nav aria-label="Mobile navigation">
          {navItems.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMenuOpen(false)}
            >
              <span>0{index + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

function SectionHeading({ index, label, title, accent, description }) {
  return (
    <div className="section-heading reveal">
      <div className="section-label">
        <span>{index}</span>
        {label}
      </div>
      <div>
        <h2>
          {title} {accent && <em>{accent}</em>}
        </h2>
        {description && <p className="section-intro">{description}</p>}
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="hero compact-hero" id="top">
      <div className="hero-glow" aria-hidden="true" style={{ position: 'absolute' }} />
      <div className="compact-hero-grid">
        <div className="hero-copy reveal">
          <div className="hero-status">
            <span className="status-dot" />
            {data.availability}
          </div>
          <span className="eyebrow">Competitive programmer · Software engineer</span>
          <div className="hero-about">
            <h1>About me</h1>
            <p>
              I am a Computer Science and Engineering graduate from American
              International University-Bangladesh, passionate about competitive
              programming and software engineering.
            </p>
            <p>{data.intro}</p>
          </div>
          <div className="hero-actions">
            <a className="primary-link" href="#competitive">
              Explore results <ArrowRight size={18} />
            </a>
            <a className="secondary-link" href="#projects">
              View projects
            </a>
          </div>
        </div>

        <figure className="hero-portrait reveal">
          <img src={data.profileImage} alt={`${data.name} at the AIUB campus`} />
          <figcaption>
            <span>{data.name}</span>
            <small>{data.role}</small>
          </figcaption>
        </figure>
      </div>

      <div className="compact-about reveal">
        <div className="education-summary">
          <span className="card-label">Education</span>
          <div className="education-summary-grid">
            <div>
              <strong>{data.education[0].degree}</strong>
              <small>{data.education[0].school}</small>
              <small>{data.education[0].period}</small>
            </div>
            <div>
              <span className="education-subtitle">Academic focus</span>
              <p>
                Algorithms, data structures, object-oriented programming,
                databases, web technologies, and software engineering.
              </p>
            </div>
          </div>
        </div>
        <div>
          <span className="card-label">Professional profiles</span>
          <div className="inline-links">
            {data.socials.map((social) => (
              <a key={social.label} href={social.url} target="_blank" rel="noreferrer">
                {social.label} <ArrowUpRight size={13} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ResultRow({ result }) {
  const hasLink = result.url !== '#'
  const content = (
    <>
      <strong className="result-rank">{result.rank}</strong>
      <div className="result-name">
        <h4>{result.title}</h4>
        <span>{result.detail}</span>
      </div>
      <div className="result-team">
        <span>{result.team}</span>
        <small>{result.year}</small>
      </div>
      <span className="result-link-icon">
        {hasLink ? <ExternalLink size={17} /> : '—'}
      </span>
    </>
  )

  if (!hasLink) {
    return <div className="competition-result">{content}</div>
  }

  return (
    <a
      className="competition-result"
      href={result.url}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open rank list for ${result.title}`}
    >
      {content}
    </a>
  )
}

function CompetitiveProgramming() {
  return (
    <section className="section competitive-section" id="competitive">
      <SectionHeading
        index="01"
        label="Competitive programming"
        title="Achievements"
        accent="& results."
        description="A detailed record of team and individual results across ICPC, national IUPCs, university contests, and online judges."
      />

      <div className="cp-overview reveal">
        <div className="cp-overview-main">
          <Trophy size={28} />
          <strong>20+ IUPCs</strong>
          <span>Participated since 2022</span>
        </div>
        <div>
          <strong>1850+</strong>
          <span>Problems solved</span>
        </div>
        <div>
          <strong>230+</strong>
          <span>Online contests</span>
        </div>
        <div>
          <strong>3×</strong>
          <span>Intra-AIUB champion</span>
        </div>
      </div>

      <a
        className="featured-recognition reveal"
        href={data.featuredRecognition.url}
        target="_blank"
        rel="noreferrer"
        style={{
          '--featured-image': `url(${data.featuredRecognition.image})`,
        }}
      >
        <div className="featured-recognition-meta">
          <span>{data.featuredRecognition.label}</span>
          <small>{data.featuredRecognition.published}</small>
        </div>
        <div className="featured-recognition-copy">
          <span>{data.featuredRecognition.source}</span>
          <h3>{data.featuredRecognition.title}</h3>
          <p>{data.featuredRecognition.description}</p>
        </div>
        <span className="featured-recognition-link">
          Read article <ArrowUpRight size={18} />
        </span>
      </a>

      <div className="competition-groups">
        {data.competitionGroups.map((group, groupIndex) => (
          <article className="competition-group reveal" key={group.label}>
            <header className="competition-group-head">
              <span>0{groupIndex + 1}</span>
              <div>
                <h3>{group.label}</h3>
                <p>{group.description}</p>
              </div>
            </header>
            <div className="competition-results">
              {group.results.map((result) => (
                <ResultRow
                  key={`${result.title}-${result.year}-${result.team}`}
                  result={result}
                />
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="judge-showcase reveal">
        <div className="judge-copy">
          <span className="card-label">Online judge profiles</span>
          <h3>Practice measured over thousands of problems.</h3>
          <p>
            Regular participation across online platforms built the speed,
            pattern recognition, and implementation discipline behind the
            contest results.
          </p>
        </div>
        <div className="judge-profile-list">
          {data.judges.map((judge) => (
            <a href={judge.url} key={judge.label} target="_blank" rel="noreferrer">
              <span>{judge.label}</span>
              <strong>{judge.value}</strong>
              <small>{judge.note}</small>
              <ExternalLink size={16} />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section className="section projects-section" id="projects">
      <SectionHeading
        index="02"
        label="Software development"
        title="Personal Projects"
        description="Practical applications built with structured code, thoughtful architecture, data models, and useful features."
      />

      <div className="case-study-list">
        {data.projects.map((project) => (
          <article className="case-study reveal" key={project.title}>
            <div className="case-study-side">
              <span className="project-number">{project.number}</span>
              <span>{project.category}</span>
            </div>
            <div className="case-study-content">
              <div className="case-study-title">
                <h3>{project.title}</h3>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View ${project.title} source code`}
                >
                  Source code <ArrowUpRight size={17} />
                </a>
              </div>
              <p className="case-study-lead">{project.description}</p>
              <div className="case-study-details">
                <div>
                  <span className="card-label">Architecture</span>
                  <p>{project.architecture}</p>
                </div>
                <div>
                  <span className="card-label">Core features</span>
                  <ul>
                    {project.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Gallery() {
  const [activeSlide, setActiveSlide] = useState(0)
  const totalSlides = data.gallery.length

  const showPrevious = () => {
    setActiveSlide((current) => (current - 1 + totalSlides) % totalSlides)
  }

  const showNext = () => {
    setActiveSlide((current) => (current + 1) % totalSlides)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') showPrevious()
    if (event.key === 'ArrowRight') showNext()
  }

  return (
    <section
      className="section gallery-section"
      id="gallery"
      tabIndex="0"
      onKeyDown={handleKeyDown}
      aria-label="Photo gallery. Use left and right arrow keys to change slides."
    >
      <SectionHeading
        index="04"
        label="Photo journal"
        title="People and"
        accent="moments."
        description="Contest stages, team memories, and the university environment behind the work."
      />

      <div className="gallery-slider reveal">
        <div
          className="gallery-track"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {data.gallery.map((slide) => (
            <figure className="gallery-slide" key={slide.image}>
              <img src={slide.image} alt={slide.title} />
            </figure>
          ))}
        </div>

        <div className="gallery-caption">
          <span>
            {String(activeSlide + 1).padStart(2, '0')} /{' '}
            {String(totalSlides).padStart(2, '0')}
          </span>
          <div>
            <h3>{data.gallery[activeSlide].title}</h3>
            <p>{data.gallery[activeSlide].caption}</p>
          </div>
          <div className="gallery-controls">
            <button type="button" onClick={showPrevious} aria-label="Previous photo">
              <ChevronLeft />
            </button>
            <button type="button" onClick={showNext} aria-label="Next photo">
              <ChevronRight />
            </button>
          </div>
        </div>

        <div className="gallery-dots" aria-label="Choose a photo">
          {data.gallery.map((slide, index) => (
            <button
              type="button"
              className={index === activeSlide ? 'is-active' : ''}
              key={slide.image}
              onClick={() => setActiveSlide(index)}
              aria-label={`Show photo ${index + 1}: ${slide.title}`}
              aria-current={index === activeSlide ? 'true' : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="section experience" id="experience">
      <SectionHeading
        index="03"
        label="Community experience"
        title="Training and"
        accent="leadership."
      />

      <div className="experience-list reveal">
        {data.experience.map((item) => (
          <div className="experience-row" key={`${item.period}-${item.role}`}>
            <span className="experience-period">{item.period}</span>
            <strong>{item.role}</strong>
            <span className="experience-company">{item.company}</span>
          </div>
        ))}
      </div>

      <div className="skill-strip reveal">
        {data.skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    await navigator.clipboard.writeText(data.email)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section className="contact compact-contact" id="contact">
      <div className="contact-inner reveal">
        <span className="contact-kicker">Open to software engineering roles</span>
        <h2>
          Let&apos;s build something
          <br />
          <em>worth solving.</em>
        </h2>
        <div className="contact-actions">
          <a className="contact-button" href={`mailto:${data.email}`}>
            Start a conversation <ArrowUpRight />
          </a>
          <button className="copy-button" type="button" onClick={copyEmail}>
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? 'Copied!' : data.email}
          </button>
        </div>
      </div>

      <footer>
        <a className="brand footer-brand" href="#top">
          <span>{data.initials}</span>
          <span className="brand-dot" />
        </a>
        <div className="footer-socials">
          {data.socials.map((social) => (
            <a href={social.url} key={social.label} target="_blank" rel="noreferrer">
              {social.label} <ArrowUpRight size={13} />
            </a>
          ))}
        </div>
        <span className="copyright">
          © {new Date().getFullYear()} {data.name}
        </span>
      </footer>
    </section>
  )
}

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll('.reveal')
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const updatePointer = (event) => {
      document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`)
    }
    window.addEventListener('pointermove', updatePointer, { passive: true })
    return () => window.removeEventListener('pointermove', updatePointer)
  }, [])

  return (
    <>
      <FloatingBubbles />
      <div className="pointer-glow" />
      <Header />
      <main className="page-content">
        <Hero />
        <CompetitiveProgramming />
        <Projects />
        <Experience />
        <Gallery />
        <Contact />
      </main>
    </>
  )
}

export default App
