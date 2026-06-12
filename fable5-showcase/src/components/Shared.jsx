import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

/* ============ hooks ============ */

function useMouse() {
  const [m, setM] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (e) => setM({
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  return m
}

function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, seen]
}

/* Scroll-reveal: children rise + un-tilt into place */
export function Reveal({ children, delay = 0, from = 'up' }) {
  const [ref, seen] = useInView()
  const hidden = {
    up: 'perspective(1000px) translateY(70px) rotateX(10deg) scale(.97)',
    left: 'perspective(1000px) translateX(-70px) rotateY(8deg) scale(.97)',
    right: 'perspective(1000px) translateX(70px) rotateY(-8deg) scale(.97)',
  }[from]
  return (
    <div
      ref={ref}
      style={{
        transform: seen ? 'none' : hidden,
        opacity: seen ? 1 : 0,
        transition: `transform 1s cubic-bezier(.16,.8,.26,1) ${delay}ms, opacity .9s ease ${delay}ms`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  )
}

/* ============ micro-interactions ============ */

/* Magnetic button: leans toward the cursor */
export function Btn({ children, ghost, style }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const x = e.clientX - r.left - r.width / 2
    const y = e.clientY - r.top - r.height / 2
    ref.current.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`
  }
  const onLeave = () => { ref.current.style.transform = 'translate(0, 0)' }
  return (
    <button
      ref={ref}
      className={`btn ${ghost ? 'ghost' : ''}`}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </button>
  )
}

/* Kinetic word-by-word headline reveal */
export function Kinetic({ text, delay = 0.2 }) {
  const words = String(text).split(' ')
  return (
    <>
      {words.map((w, i) => (
        <span className="kin" key={i}>
          <span style={{ animationDelay: `${delay + i * 0.09}s` }}>{w}</span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  )
}

/* Custom cursor: accent dot + lagging ring that grows over links/buttons */
export function Cursor({ accent }) {
  const dot = useRef(null)
  const ring = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    let mx = -100, my = -100, rx = -100, ry = -100, raf
    const move = (e) => {
      mx = e.clientX; my = e.clientY
      if (dot.current) dot.current.style.transform = `translate(${mx}px, ${my}px)`
    }
    const over = (e) => {
      const hot = e.target.closest('a, button, .tilt-card, .media-panel')
      if (ring.current) ring.current.classList.toggle('big', !!hot)
    }
    const loop = () => {
      rx += (mx - rx) * 0.16
      ry += (my - ry) * 0.16
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      cancelAnimationFrame(raf)
    }
  }, [])
  return (
    <>
      <div ref={dot} className="cur-dot" style={{ background: accent }} />
      <div ref={ring} className="cur-ring" style={{ borderColor: accent }} />
    </>
  )
}

/* Word-by-word headline reveal triggered when scrolled into view */
export function KineticInView({ text, delay = 0 }) {
  const [ref, seen] = useInView(0.35)
  const words = String(text).split(' ')
  return (
    <span ref={ref}>
      {words.map((w, i) => (
        <span key={i}>
          <span className="kin">
            <span
              style={{
                display: 'inline-block',
                transform: seen ? 'translateY(0) rotate(0)' : 'translateY(115%) rotate(4deg)',
                transition: `transform .85s cubic-bezier(.16,1,.3,1) ${delay + i * 70}ms`,
              }}
            >
              {w}
            </span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}

/* Count-up stat number (handles $4.2B, 99.99%, 1,200 …) */
function CountUp({ value }) {
  const [ref, seen] = useInView(0.4)
  const [display, setDisplay] = useState(value)
  useEffect(() => {
    if (!seen) return
    const m = String(value).match(/^([^0-9]*)([\d,]+(?:\.\d+)?)(.*)$/)
    if (!m || /[:★]/.test(value)) return
    const [, pre, numStr, suf] = m
    const target = parseFloat(numStr.replace(/,/g, ''))
    const decimals = (numStr.split('.')[1] || '').length
    const useCommas = numStr.includes(',')
    const t0 = performance.now()
    const dur = 1600
    let raf
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 4)
      let n = (target * eased).toFixed(decimals)
      if (useCommas) n = Number(n).toLocaleString('en-US', { minimumFractionDigits: decimals })
      setDisplay(pre + n + suf)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [seen, value])
  return <span ref={ref}>{display}</span>
}

/* Scroll progress bar */
export function ScrollProgress({ accent }) {
  const [w, setW] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setW(max > 0 ? (h.scrollTop / max) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div className="scroll-progress" style={{ width: `${w}%`, background: accent }} />
}

/* ============ chrome ============ */

export function BackPill() {
  return <Link to="/" className="back-pill">← All sites</Link>
}

export function PromptFab({ prompt }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = prompt
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }
  return (
    <button className={`prompt-fab ${copied ? 'copied' : ''}`} onClick={copy}>
      {copied ? '✓ Prompt copied!' : '✨ Copy Prompt'}
    </button>
  )
}

export function TopNav({ brand, links, accent }) {
  return (
    <nav className="topnav">
      <div className="brand" style={accent ? { color: accent } : undefined}>{brand}</div>
      <div className="navlinks">
        {links.map((l) => <span key={l}>{l}</span>)}
      </div>
    </nav>
  )
}

export function Footer({ brand, tagline }) {
  return (
    <footer className="footer">
      <div>© 2026 {brand}</div>
      <div>{tagline}</div>
      <div>Built with Fable 5</div>
    </footer>
  )
}

/* ============ panel hero (no full-bleed photos = no pixelation) ============ */
/* Image lives in a contained, tilting media panel at its native sharpness.
   The hero atmosphere comes from animated aurora gradients, a giant drifting
   ghost word, the Three.js overlay and ornaments — not from stretching photos. */

function MediaPanel({ image, spotlight, baseFilter, accent }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: -999, y: -999, hover: false })
  const onMove = (e) => {
    const el = ref.current
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    el.style.transform = `perspective(1100px) rotateY(${((x / r.width) - 0.5) * 10}deg) rotateX(${((y / r.height) - 0.5) * -10}deg)`
    if (spotlight) setPos({ x, y, hover: true })
  }
  const onLeave = () => {
    ref.current.style.transform = 'perspective(1100px)'
    setPos((p) => ({ ...p, hover: false }))
  }
  const mask = pos.hover
    ? `radial-gradient(circle 170px at ${pos.x}px ${pos.y}px, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 38%, rgba(255,255,255,.5) 68%, rgba(255,255,255,0) 100%)`
    : 'radial-gradient(circle 170px at 50% 45%, rgba(255,255,255,.9) 0%, rgba(255,255,255,.45) 55%, rgba(255,255,255,0) 100%)'
  return (
    <div className="media-panel" ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ '--accent': accent }}>
      <div className="panel-clip">
        <img src={image} alt="" className="panel-img kenburns" style={spotlight ? { filter: baseFilter } : undefined} />
        {spotlight && (
          <img
            src={image} alt="" className="panel-img kenburns panel-reveal"
            style={{ WebkitMaskImage: mask, maskImage: mask }}
          />
        )}
        {spotlight && <div className="panel-hint">move your cursor</div>}
      </div>
      <span className="orn-ring" style={{ borderColor: accent }} />
      <span className="orn-dot" style={{ background: accent }} />
      <span className="orn-cross" style={{ color: accent }}>+</span>
    </div>
  )
}

export function PanelHero({ hero, accent, brand, nav, canvas }) {
  const sideRef = useRef(null)
  const copyRef = useRef(null)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y > window.innerHeight * 1.2) return
      if (sideRef.current) sideRef.current.style.transform = `translateY(${y * 0.16}px)`
      if (copyRef.current) {
        copyRef.current.style.transform = `translateY(${y * 0.08}px)`
        copyRef.current.style.opacity = String(Math.max(1 - y / (window.innerHeight * 0.85), 0))
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="hero panel-hero">
      <div
        className="aurora"
        style={{ '--a1': hero.aurora?.[0] || accent, '--a2': hero.aurora?.[1] || accent, '--a3': hero.aurora?.[2] || 'transparent' }}
      />
      <div className="ghost-word" aria-hidden="true">{hero.ghost}</div>
      {canvas && <div className="hero-canvas">{canvas}</div>}
      <TopNav brand={brand} links={nav} accent={accent} />
      <div className="panel-grid">
        <div className="panel-copy" ref={copyRef}>
          <div className="kicker hero-anim hero-fade" style={{ color: accent, animationDelay: '0.15s' }}>{hero.kicker}</div>
          <h1>
            {hero.serif
              ? <span className="serif-line"><Kinetic text={hero.titleLine1} delay={0.3} /></span>
              : <Kinetic text={hero.titleLine1} delay={0.3} />}
            <br />
            <Kinetic text={hero.titleLine2} delay={0.55} />
          </h1>
          <p className="sub hero-anim hero-fade" style={{ animationDelay: '0.85s' }}>{hero.sub}</p>
          <div className="cta-row hero-anim hero-fade" style={{ animationDelay: '1s' }}>
            <Btn style={{ background: hero.btnBg || accent, color: hero.btnColor || '#101010' }}>{hero.cta1}</Btn>
            {hero.cta2 && <Btn ghost>{hero.cta2}</Btn>}
          </div>
        </div>
        <div className="panel-side hero-anim hero-fade" style={{ animationDelay: '0.5s' }}>
          <div ref={sideRef} style={{ willChange: 'transform' }}>
            <MediaPanel image={hero.image} spotlight={hero.spotlightPanel} baseFilter={hero.baseFilter} accent={accent} />
          </div>
        </div>
      </div>
      <div className="scroll-hint">Scroll</div>
    </div>
  )
}

/* ============ heroes ============ */

/* Photo hero with mouse parallax; optional single integrated cutout (no cards). */
export function PhotoHero({ image, overlayGradient, cutout, canvas, children }) {
  const bgRef = useRef(null)
  const cutRef = useRef(null)
  const m = useMouse()
  useEffect(() => {
    if (bgRef.current)
      bgRef.current.style.transform = `scale(1.12) translate(${m.x * -12}px, ${m.y * -8}px)`
    if (cutRef.current)
      cutRef.current.style.transform = `translate(${m.x * 34}px, ${m.y * 24}px) rotate(${m.x * 3}deg)`
  }, [m])
  return (
    <div className="hero">
      <div ref={bgRef} className="hero-photo hero-zoom" style={{ backgroundImage: `url(${image})` }} />
      <div className="hero-shade" style={{ background: overlayGradient }} />
      {canvas && <div className="hero-canvas">{canvas}</div>}
      {cutout && (
        <div
          ref={cutRef}
          className="hero-cutout"
          style={{ top: cutout.top || '22%', right: cutout.right || '7%', width: cutout.width || 'clamp(260px, 30vw, 480px)' }}
        >
          <img src={cutout.img} alt="" loading="eager" />
        </div>
      )}
      {children}
      <div className="scroll-hint">Scroll</div>
    </div>
  )
}

const SPOTLIGHT_R = 260

export function SpotlightHero({ base, reveal, baseFilter, accent, children }) {
  const mouse = useRef({ x: -999, y: -999 })
  const smooth = useRef({ x: -999, y: -999 })
  const rafRef = useRef(0)
  const [pos, setPos] = useState({ x: -999, y: -999 })

  useEffect(() => {
    const onMove = (e) => { mouse.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove)
    const loop = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1
      setPos({ x: smooth.current.x, y: smooth.current.y })
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafRef.current) }
  }, [])

  const mask = `radial-gradient(circle ${SPOTLIGHT_R}px at ${pos.x}px ${pos.y}px,
    rgba(255,255,255,1) 0%, rgba(255,255,255,1) 40%, rgba(255,255,255,.75) 60%,
    rgba(255,255,255,.4) 75%, rgba(255,255,255,.12) 88%, rgba(255,255,255,0) 100%)`

  return (
    <div className="hero spot-hero">
      <div className="spot-base hero-zoom" style={{ backgroundImage: `url(${base})`, filter: baseFilter }} />
      <div
        className="spot-reveal"
        style={{ backgroundImage: `url(${reveal || base})`, WebkitMaskImage: mask, maskImage: mask }}
      />
      <div
        className="spot-ring"
        style={{
          left: pos.x, top: pos.y,
          width: SPOTLIGHT_R * 2, height: SPOTLIGHT_R * 2,
          borderColor: accent,
        }}
      />
      {children}
      <div className="scroll-hint">Move your cursor · Scroll</div>
    </div>
  )
}

/* ============ sections ============ */

export function Marquee({ items, accent }) {
  const row = [...items, ...items, ...items, ...items]
  return (
    <div className="marquee">
      <div className="marquee-track">
        {row.map((it, i) => (
          <span key={i}>
            {it} <em style={{ color: accent }}>✦</em>
          </span>
        ))}
      </div>
    </div>
  )
}

export function TiltCard({ image, title, text, tag, accent, h = 380 }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const el = ref.current
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${y * -14}deg) scale(1.03)`
    const img = el.querySelector('.tilt-img')
    if (img) img.style.transform = `scale(1.12) translate(${x * -12}px, ${y * -12}px)`
  }
  const onLeave = () => {
    const el = ref.current
    el.style.transform = 'perspective(900px) rotateY(0) rotateX(0) scale(1)'
    const img = el.querySelector('.tilt-img')
    if (img) img.style.transform = 'scale(1.12)'
  }
  return (
    <div className="tilt-card" ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ height: h }}>
      <div className="tilt-img" style={{ backgroundImage: `url(${image})` }} />
      <div className="tilt-fade" />
      <div className="tilt-body">
        {tag && <div className="tilt-tag" style={{ color: accent, borderColor: accent }}>{tag}</div>}
        <h3>{title}</h3>
        {text && <p>{text}</p>}
      </div>
    </div>
  )
}

export function TiltGrid({ items, accent, h }) {
  return (
    <div className="tilt-grid">
      {items.map((it, i) => (
        <Reveal key={it.title} delay={i * 120}>
          <TiltCard {...it} accent={accent} h={h} />
        </Reveal>
      ))}
    </div>
  )
}

export function SplitSection({ image, kicker, title, text, bullets = [], reverse, accent }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const el = ref.current
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${y * -10}deg) translateZ(20px)`
  }
  const onLeave = () => { ref.current.style.transform = 'perspective(1000px)' }
  return (
    <section className={`split ${reverse ? 'reverse' : ''}`}>
      <Reveal from={reverse ? 'right' : 'left'}>
        <div className="pop-frame" ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
          style={{ '--accent': accent }}>
          <img src={image} alt={title} loading="lazy" />
        </div>
      </Reveal>
      <Reveal from={reverse ? 'left' : 'right'} delay={120}>
        <div className="split-text">
          <div className="kicker" style={{ color: accent }}>{kicker}</div>
          <h2><KineticInView text={title} /></h2>
          <p>{text}</p>
          {bullets.length > 0 && (
            <ul className="split-list">
              {bullets.map((b) => (
                <li key={b}><span style={{ color: accent }}>✦</span> {b}</li>
              ))}
            </ul>
          )}
        </div>
      </Reveal>
    </section>
  )
}

export function PhotoBanner({ image, children, dim = 0.55 }) {
  return (
    <section className="photo-banner">
      <div className="banner-img" style={{ backgroundImage: `url(${image})` }} />
      <div className="banner-shade" style={{ background: `rgba(0,0,0,${dim})` }} />
      <div className="banner-content">
        <Reveal>{children}</Reveal>
      </div>
    </section>
  )
}

export function Quote({ text, author, role, accent }) {
  return (
    <section className="section quote-sec">
      <Reveal>
        <div className="quote-mark" style={{ color: accent }}>“</div>
        <blockquote>{text}</blockquote>
        <div className="quote-by">
          <strong>{author}</strong>
          <span>{role}</span>
        </div>
      </Reveal>
    </section>
  )
}

export function StatsRow({ stats, accent }) {
  return (
    <div className="stats">
      {stats.map((s, i) => (
        <Reveal key={s.lbl} delay={i * 120}>
          <div className="stat">
            <div className="num" style={{ color: accent }}><CountUp value={s.num} /></div>
            <div className="lbl">{s.lbl}</div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

export function CTABanner({ image, kicker, title, button, accent, dim = 0.6 }) {
  return (
    <section className="photo-banner cta-banner">
      <div className="banner-img" style={{ backgroundImage: `url(${image})` }} />
      <div className="banner-shade" style={{ background: `rgba(0,0,0,${dim})` }} />
      <div className="banner-content" style={{ textAlign: 'center', maxWidth: 'none', width: '100%' }}>
        <Reveal>
          <div className="kicker" style={{ color: accent, justifyContent: 'center' }}>{kicker}</div>
          <h2>{title}</h2>
          <div style={{ marginTop: 30, display: 'flex', justifyContent: 'center' }}>
            <Btn style={{ background: accent, color: '#10100a' }}>{button}</Btn>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function SectionHead({ kicker, title, lead, accent }) {
  return (
    <Reveal>
      {kicker && <div className="kicker" style={{ color: accent }}>{kicker}</div>}
      <h2><KineticInView text={title} /></h2>
      {lead && <p className="lead">{lead}</p>}
    </Reveal>
  )
}

/* ============ full site template ============ */
export function SiteTemplate({ cfg, canvas }) {
  const a = cfg.accent
  return (
    <div className={`site ${cfg.theme === 'light' ? 'light' : ''}`} style={{ background: cfg.bg }}>
      <ScrollProgress accent={a} />
      <PanelHero hero={cfg.hero} accent={a} brand={cfg.brand} nav={cfg.nav} canvas={canvas} />
      <div className="site-body">
        {cfg.blobs && (
          <div className="blob-layer">
            {cfg.blobs.map((b, i) => (
              <div
                key={i}
                className="blob"
                style={{
                  background: b.color,
                  width: b.size || '46vw',
                  height: b.size || '46vw',
                  top: b.top,
                  left: b.left,
                  right: b.right,
                  animationDelay: `${i * -8}s`,
                }}
              />
            ))}
          </div>
        )}

        <Marquee items={cfg.marquee} accent={a} />

        <section className="section">
          <SectionHead kicker={cfg.features.kicker} title={cfg.features.title} lead={cfg.features.lead} accent={a} />
          <TiltGrid accent={a} items={cfg.features.items} />
        </section>

        <SplitSection {...cfg.split1} accent={a} />

        <PhotoBanner image={cfg.banner.image} dim={cfg.banner.dim ?? 0.5}>
          <div className="kicker" style={{ color: a }}>{cfg.banner.kicker}</div>
          <h2>{cfg.banner.title}</h2>
          <p>{cfg.banner.text}</p>
        </PhotoBanner>

        <section className="section">
          <SectionHead kicker={cfg.gallery.kicker} title={cfg.gallery.title} lead={cfg.gallery.lead} accent={a} />
          <TiltGrid accent={a} items={cfg.gallery.items} h={300} />
        </section>

        <SplitSection {...cfg.split2} reverse accent={a} />

        <Quote {...cfg.quote} accent={a} />

        <section className="section" style={{ paddingTop: 40 }}>
          <SectionHead title={cfg.statsTitle} accent={a} />
          <StatsRow accent={a} stats={cfg.stats} />
        </section>

        <CTABanner {...cfg.cta} accent={a} />

        <Footer brand={cfg.footerBrand || cfg.brand} tagline={cfg.tagline} />
      </div>
      <div className="grain" />
      <Cursor accent={a} />
      <BackPill />
      <PromptFab prompt={cfg.prompt} />
    </div>
  )
}
