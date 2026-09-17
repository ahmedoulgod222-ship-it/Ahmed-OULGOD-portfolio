import { useState, useEffect, useRef, useCallback } from 'react'
import profilePhoto from '@/imports/aoulgod.jpg'
import aboyaaLogo from '@/imports/cropped-logo-1-scaled-1-2048x773.png'
import paplaLogo from '@/imports/Screenshot_2026-09-16_142206.png'

// ─── Reveal hook ──────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  })
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV = ['Home', 'About', 'Experience', 'Skills', 'Projects', 'Contact']

const ABOUT_CARDS = [
  { icon: '🛡', title: 'Cybersecurity', desc: 'Focused on building secure systems and understanding attack vectors.' },
  { icon: '🐧', title: 'Linux / Unix', desc: 'Deep familiarity with the Linux ecosystem, shell, and system internals.' },
  { icon: '💻', title: 'Full-Stack Dev', desc: 'Building web applications from backend to polished front-end interfaces.' },
  { icon: '🧩', title: 'Problem Solving', desc: 'Algorithmic thinking and engineering discipline from the 1337 curriculum.' },
]

const EXP_TAGS = [
  'C Programming', 'Algorithms', 'Linux / Unix', 'Git & GitHub',
  'Software Engineering', 'Teamwork', 'Self-learning', 'Cybersecurity'
]

const SKILLS: Record<string, string[]> = {
  Cybersecurity: ['Linux Security', 'Networking', 'Cybersecurity Fundamentals', 'Security Awareness', 'System Security', 'CTF Basics'],
  Development: ['C', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'HTML', 'CSS', 'Git'],
  Systems: ['Linux', 'Unix', 'Windows', 'Bash', 'CLI', 'Docker'],
}

const PROJECTS: Array<{
  emoji: string
  name: string
  desc: string
  tech: string[]
  github: string | null
  demo: string | null
  img: string | null
  logo?: string
  logoBg?: string
  logoInvert?: boolean
}> = [
  {
    emoji: '🚗',
    name: 'AboyaaCar',
    desc: 'A modern car-rental platform built to deliver a seamless, professional digital experience — from vehicle browsing to booking confirmation. Focused on clean UI, fast performance, and intuitive user flows.',
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'PostgreSQL'],
    github: '#',
    demo: '#',
    img: null,
    logo: aboyaaLogo,
    logoBg: 'linear-gradient(135deg, #0e0e0e 0%, #141414 60%, #1a1510 100%)',
  },
  {
    emoji: '🏭',
    name: 'Papla Industrie',
    desc: 'Official web presence for Papla Industrie — an industrial company. Designed and developed a professional site that communicates the brand\'s identity, services, and expertise to an international audience.',
    tech: ['WordPress', 'PHP', 'HTML/CSS', 'JavaScript'],
    github: null,
    demo: 'https://paplaindustrie.com/',
    img: null,
    logo: paplaLogo,
    logoBg: 'linear-gradient(135deg, #0e0e0e 0%, #141414 60%, #111214 100%)',
    logoInvert: true,
  },
  {
    emoji: '🔐',
    name: 'Security Toolkit',
    desc: 'A collection of bash and Python scripts for basic penetration testing workflows — network scanning, enumeration, and reporting.',
    tech: ['Python', 'Bash', 'Nmap', 'Linux'],
    github: '#',
    demo: null,
    img: null,
  },
  {
    emoji: '🌐',
    name: 'Portfolio Website',
    desc: 'This very portfolio — built with React, Vite, and Tailwind CSS. Focused on smooth animations, scroll reveals, and responsive design.',
    tech: ['React', 'TypeScript', 'Vite', 'CSS'],
    github: '#',
    demo: '#',
    img: null,
  },
  {
    emoji: '📡',
    name: 'Network Scanner',
    desc: 'CLI tool that discovers live hosts and open ports on a local network using raw sockets and ICMP.',
    tech: ['Python', 'Networking', 'Sockets'],
    github: '#',
    demo: null,
    img: null,
  },
]

const TERMINAL_LINES = [
  { type: 'comment', text: '# whoami' },
  { type: 'out', text: 'ahmed_oulgod — 1337 student | cybersecurity enthusiast' },
  { type: 'blank' },
  { type: 'comment', text: '# cat focus.txt' },
  { type: 'out', text: 'cybersecurity  linux  software-development' },
  { type: 'blank' },
  { type: 'comment', text: '# nmap -sV --open localhost' },
  { type: 'out', text: 'PORT     STATE   SERVICE   VERSION' },
  { type: 'out', text: '22/tcp   open    ssh       OpenSSH 9.0' },
  { type: 'out', text: '443/tcp  open    https     nginx 1.24' },
  { type: 'blank' },
  { type: 'comment', text: '# echo $MISSION' },
  { type: 'string', text: '"Build secure. Learn always. Ship quality."' },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15,3 21,3 21,9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [activeNav, setActiveNav] = useState('Home')
  const [activeSkill, setActiveSkill] = useState('Cybersecurity')
  const [menuOpen, setMenuOpen] = useState(false)
  const glowRef = useRef<HTMLDivElement>(null)

  useReveal()

  // scroll progress + nav state
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
      setScrolled(scrollTop > 40)

      const sections = NAV.map((n) => document.getElementById(n.toLowerCase()))
      let current = 'Home'
      sections.forEach((el) => {
        if (el && window.scrollY >= el.offsetTop - 120) current = el.id.charAt(0).toUpperCase() + el.id.slice(1)
      })
      setActiveNav(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // cursor glow
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!glowRef.current) return
      glowRef.current.style.left = e.clientX + 'px'
      glowRef.current.style.top = e.clientY + 'px'
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }, [])

  return (
    <>
      {/* cursor glow */}
      <div ref={glowRef} className="cursor-glow" />
      <div className="noise-overlay" />

      {/* scroll progress */}
      <div className="scroll-progress" style={{ width: `${progress}%` }} />

      {/* ── NAV ──────────────────────────────────────────────────────────── */}
      <nav className={`nav-root ${scrolled ? 'scrolled' : ''}`}>
        <a href="#home" className="nav-logo">
          <span>&gt;_</span> Ahmed Oulgod
        </a>

        <ul className="nav-links">
          {NAV.map((n) => (
            <li key={n}>
              <button
                className={`nav-link ${activeNav === n ? 'active' : ''}`}
                onClick={() => scrollTo(n)}
              >
                {n}
              </button>
            </li>
          ))}
        </ul>

        {/* mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'none' }}
          className="md-hamburger"
          aria-label="Menu"
        >
          <div style={{ width: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[0,1,2].map(i => (
              <span key={i} style={{ height: 1.5, background: 'var(--text-2)', display: 'block',
                transform: menuOpen && i===0 ? 'rotate(45deg) translate(4px,4px)' : menuOpen && i===2 ? 'rotate(-45deg) translate(4px,-4px)' : menuOpen && i===1 ? 'scaleX(0)' : 'none',
                transition: 'all 0.2s', transformOrigin: 'center' }} />
            ))}
          </div>
        </button>
      </nav>

      {/* mobile drawer */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, background: 'rgba(8,8,8,0.98)',
          borderBottom: '1px solid var(--border)', zIndex: 99, padding: '1.5rem 2rem',
          display: 'flex', flexDirection: 'column', gap: '1.25rem'
        }}>
          {NAV.map((n) => (
            <button key={n} className="nav-link" onClick={() => scrollTo(n)} style={{ textAlign: 'left', fontSize: '0.9rem' }}>{n}</button>
          ))}
        </div>
      )}

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section id="home" className="hero-root">
        <div className="grid-bg" />

        {/* ambient glow */}
        <div style={{
          position: 'absolute', top: '20%', right: '15%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="hero-inner">
          <div>
            <div className="hero-eyebrow reveal">Available for projects</div>

            <h1 className="hero-name reveal reveal-delay-1">
              Ahmed<br />Oulgod
            </h1>

            <p className="hero-role reveal reveal-delay-2">
              <strong>Cybersecurity Enthusiast</strong> &amp; Full-Stack Developer
            </p>

            <p className="hero-intro reveal reveal-delay-3">
              1337 student focused on cybersecurity, Linux, software development, and building secure digital solutions.
            </p>

            <div className="hero-ctas reveal reveal-delay-4">
              <button className="btn-primary" onClick={() => scrollTo('Projects')}>
                View Projects
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <button className="btn-secondary" onClick={() => scrollTo('Contact')}>
                Contact Me
              </button>
            </div>

            <div className="hero-socials reveal reveal-delay-5">
              <a href="https://github.com/ahmedoulgod222-ship-it" target="_blank" rel="noreferrer" className="social-link" aria-label="GitHub">
                <GithubIcon />
              </a>
              <a href="https://www.linkedin.com/in/ahmed-oulgod-44787835a/" target="_blank" rel="noreferrer" className="social-link" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              <a href="mailto:ahmed.oulgod@gmail.com" className="social-link" aria-label="Email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </a>
            </div>
          </div>

          {/* photo */}
          <div className="hero-photo-wrap reveal reveal-delay-2">
            <div className="hero-photo-ring">
              <div className="hero-photo-inner">
                <img src={profilePhoto} alt="Ahmed Oulgod — cybersecurity student" />
              </div>
            </div>
            <div className="hero-status">
              <div className="status-dot" />
              1337 Student · Promo 2026
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about">
        <div className="section">
          <div className="section-label reveal">01 — About</div>
          <h2 className="section-title reveal reveal-delay-1">Who I am</h2>

          <div className="about-grid">
            <div className="about-text reveal reveal-delay-2">
              <p>
                I'm <strong>Ahmed Oulgod</strong>, an 18-year-old student at
                {' '}<strong>1337</strong> — Morocco's peer-to-peer coding school — passionate
                about the intersection of cybersecurity, Linux, and software development.
              </p>
              <p>
                The 1337 curriculum is project-based and entirely peer-driven, which has
                built strong foundations in <strong>problem solving</strong>, self-learning,
                and working under real engineering constraints.
              </p>
              <p>
                My main direction is <strong>cybersecurity</strong> — understanding how systems
                break, and building things that don't. I also enjoy full-stack development and
                contributing to open-source tools.
              </p>
              <p>
                Outside the screen: I follow digital security research, enjoy reverse
                engineering challenges, and continuously level up through CTF competitions
                and hands-on Linux labs.
              </p>
            </div>

            <div className="about-cards">
              {ABOUT_CARDS.map((c, i) => (
                <div key={c.title} className={`about-card reveal reveal-delay-${i + 1}`}>
                  <div className="about-card-icon">{c.icon}</div>
                  <div className="about-card-title">{c.title}</div>
                  <div className="about-card-desc">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ───────────────────────────────────────────────────── */}
      <section id="experience" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="section">
          <div className="section-label reveal">02 — Experience</div>
          <h2 className="section-title reveal reveal-delay-1">Education &amp; Background</h2>

          <div style={{ maxWidth: 680 }}>
            <div className="timeline reveal reveal-delay-2">
              <div className="timeline-item">
                <div className="timeline-period">2026 — Present</div>
                <div className="timeline-title">1337 School</div>
                <div className="timeline-org">Software Engineering Student · Promo 2026 · Morocco</div>
                <div className="timeline-body">
                  Project-based and peer-to-peer learning environment focused on programming,
                  problem solving, software engineering, and continuous technical development.
                  No teachers, no courses — only real projects and peer code reviews.
                </div>
                <div className="timeline-tags">
                  {EXP_TAGS.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-period">Ongoing</div>
                <div className="timeline-title">Self-Directed Cybersecurity Learning</div>
                <div className="timeline-org">Independent · CTF Platforms · Labs</div>
                <div className="timeline-body">
                  Practicing offensive and defensive security through CTF competitions,
                  Hack The Box challenges, and hands-on Linux labs. Building a methodology
                  for ethical hacking and secure system design.
                </div>
                <div className="timeline-tags">
                  {['Kali Linux', 'Nmap', 'Wireshark', 'Metasploit', 'Burp Suite', 'CTF'].map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────────────── */}
      <section id="skills" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="section">
          <div className="section-label reveal">03 — Skills</div>
          <h2 className="section-title reveal reveal-delay-1">Technical skills</h2>

          <div className="reveal reveal-delay-2">
            <div className="skill-tabs">
              {Object.keys(SKILLS).map((cat) => (
                <button
                  key={cat}
                  className={`skill-tab ${activeSkill === cat ? 'active' : ''}`}
                  onClick={() => setActiveSkill(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="skill-grid reveal reveal-delay-3">
            {SKILLS[activeSkill].map((s) => (
              <div key={s} className="skill-chip">
                <div className="skill-chip-dot" />
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CYBERSECURITY FOCUS ──────────────────────────────────────────── */}
      <section className="cyber-section">
        <div className="section">
          <div className="section-label reveal">04 — Focus</div>
          <h2 className="section-title reveal reveal-delay-1">
            Cybersecurity<br />at the core
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}
               className="cyber-grid">
            <div className="reveal reveal-delay-2">
              <p style={{ fontSize: '0.95rem', color: 'var(--text-2)', lineHeight: 1.9, marginBottom: '1.5rem' }}>
                Cybersecurity isn't just a career direction for me — it's a mindset. I approach
                every system I build by thinking about how it could be broken, and what it would
                take to make it resilient.
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-2)', lineHeight: 1.9, marginBottom: '2rem' }}>
                From Linux system hardening to network analysis and penetration testing workflows,
                I'm actively building skills across the offensive and defensive security spectrum.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {[
                  { icon: '🔍', label: 'Recon & OSINT' },
                  { icon: '🛡', label: 'System Hardening' },
                  { icon: '🌐', label: 'Network Analysis' },
                  { icon: '🔓', label: 'Ethical Hacking' },
                ].map((item) => (
                  <div key={item.label} style={{
                    padding: '0.75rem 1rem',
                    background: 'var(--bg2)',
                    border: '1px solid var(--border)',
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    fontSize: '0.8rem',
                    color: 'var(--text-2)',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  >
                    <span>{item.icon}</span>{item.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal reveal-delay-3">
              <div className="terminal-window">
                <div className="terminal-bar">
                  <div className="t-dot" style={{ background: '#ff5f57' }} />
                  <div className="t-dot" style={{ background: '#ffbd2e' }} />
                  <div className="t-dot" style={{ background: '#28ca41' }} />
                  <div className="terminal-title">ahmed@kali: ~</div>
                </div>
                <div className="terminal-body">
                  {TERMINAL_LINES.map((line, i) => (
                    line.type === 'blank' ? <div key={i} style={{ height: '0.5rem' }} /> :
                    line.type === 'comment' ? <div key={i} className="t-comment">{line.text}</div> :
                    line.type === 'string' ? <div key={i} className="t-string">{line.text}</div> :
                    <div key={i} className="t-out">{line.text}</div>
                  ))}
                  <div style={{ marginTop: '0.25rem' }}>
                    <span className="t-prompt">❯ </span>
                    <span className="terminal-cursor" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <section id="projects" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="section">
          <div className="section-label reveal">05 — Projects</div>
          <h2 className="section-title reveal reveal-delay-1">Selected work</h2>

          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <div key={p.name} className={`project-card reveal reveal-delay-${(i % 3) + 1}`}>
                {p.logo ? (
                  <div className="project-logo-panel" style={{ background: p.logoBg }}>
                    <img
                    src={p.logo}
                    alt={`${p.name} logo`}
                    className="project-logo-img"
                    style={p.logoInvert ? { filter: 'invert(1) brightness(0.92)' } : undefined}
                  />
                  </div>
                ) : p.img ? (
                  <img src={p.img} alt={p.name} className="project-img" />
                ) : (
                  <div className="project-img-placeholder">
                    <span>{p.emoji}</span>
                  </div>
                )}
                <div className="project-body">
                  <div className="project-title">{p.name}</div>
                  <div className="project-desc">{p.desc}</div>
                  <div className="project-tech">
                    {p.tech.map((t) => <span key={t} className="tech-tag">{t}</span>)}
                  </div>
                  <div className="project-links">
                    {p.github && (
                      <a href={p.github} className="project-link" target="_blank" rel="noreferrer">
                        <GithubIcon /> GitHub
                      </a>
                    )}
                    {p.demo && (
                      <a href={p.demo} className="project-link" target="_blank" rel="noreferrer">
                        <ExternalIcon /> {p.github ? 'Live Demo' : 'Visit Website'}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="contact-root">
          <div className="contact-glow" />

          <div className="section-label reveal" style={{ justifyContent: 'center' }}>
            06 — Contact
          </div>

          <h2 className="contact-headline reveal reveal-delay-1">
            Let's build something<br /><span>secure.</span>
          </h2>

          <p className="contact-sub reveal reveal-delay-2">
            Open to collaborations, internships, and interesting projects. Let's talk.
          </p>

          <div className="hero-ctas reveal reveal-delay-3" style={{ justifyContent: 'center', marginBottom: '2.5rem' }}>
            <a href="mailto:ahmed.oulgod@gmail.com" className="btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              Send an Email
            </a>
          </div>

          <div className="contact-links reveal reveal-delay-4">
            <a href="mailto:ahmed.oulgod@gmail.com" className="contact-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              ahmed.oulgod@gmail.com
            </a>
            <span style={{ color: 'var(--border)', userSelect: 'none' }}>·</span>
            <a href="https://github.com/ahmedoulgod222-ship-it" target="_blank" rel="noreferrer" className="contact-item">
              <GithubIcon /> ahmedoulgod222-ship-it
            </a>
            <span style={{ color: 'var(--border)', userSelect: 'none' }}>·</span>
            <a href="https://www.linkedin.com/in/ahmed-oulgod-44787835a/" target="_blank" rel="noreferrer" className="contact-item">
              <LinkedInIcon /> ahmed-oulgod-44787835a
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid var(--border)' }}>
        <div className="footer">
          <span className="footer-copy">
            <span>Ahmed Oulgod</span> · 1337 Student · Promo 2026
          </span>
          <span className="footer-copy" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ color: 'var(--text-3)' }}>Built with</span>
            <span style={{ color: 'var(--cyan)' }}>React</span>
            <span style={{ color: 'var(--text-3)' }}>&</span>
            <span style={{ color: 'var(--cyan)' }}>TypeScript</span>
          </span>
        </div>
      </footer>

      {/* responsive nav toggle visibility */}
      <style>{`
        @media (max-width: 900px) {
          .md-hamburger { display: flex !important; }
          .cyber-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
