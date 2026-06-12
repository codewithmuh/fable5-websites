import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

/* ============ utility hooks ============ */

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

/* Scroll-reveal: children rise + un-tilt into place when scrolled into view */
export function Reveal({ children, delay = 0, from = 'up' }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); obs.disconnect() } },
      { threshold: 0.12 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
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
      <div>Built with Fable 5 · Photos via Unsplash</div>
    </footer>
  )
}

/* ============ hero with floating popped images ============ */

export function FloatHero({ image, floats = [], overlayGradient, accent, children, canvas }) {
  const bgRef = useRef(null)
  const m = useMouse()
  useEffect(() => {
    if (bgRef.current)
      bgRef.current.style.transform = `scale(1.12) translate(${m.x * -12}px, ${m.y * -8}px)`
  }, [m])
  const spots = [
    { top: '16%', right: '6%', w: 'clamp(180px, 19vw, 300px)', r: 7, d: 26 },
    { top: '48%', right: '20%', w: 'clamp(150px, 16vw, 250px)', r: -6, d: 46 },
    { top: '66%', right: '4%', w: 'clamp(130px, 13vw, 210px)', r: 4, d: 70 },
  ]
  return (
    <div className="hero">
      <div ref={bgRef} className="hero-photo" style={{ backgroundImage: `url(${image})` }} />
      <div className="hero-shade" style={{ background: overlayGradient }} />
      {canvas && <div className="hero-canvas">{canvas}</div>}
      {floats.map((f, i) => {
        const s = spots[i] || spots[0]
        return (
          <div
            key={i}
            className={`float-card ${f.cutout ? 'cutout' : ''}`}
            style={{
              top: s.top, right: s.right, width: s.w,
              transform: `perspective(900px) rotateZ(${s.r}deg) rotateY(${s.r * -1.2}deg) translate3d(${m.x * s.d}px, ${m.y * s.d * 0.7}px, 0)`,
              animationDelay: `${i * 0.8}s`,
            }}
          >
            <img src={f.img} alt={f.tag || ''} loading="eager" />
            {f.tag && <span className="float-tag" style={{ color: accent }}>{f.tag}</span>}
          </div>
        )
      })}
      {children}
      <div className="scroll-hint">Scroll</div>
    </div>
  )
}

/* ============ content sections ============ */

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

/* Image + text side-by-side; the image pops out of the page in 3D */
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
          <h2>{title}</h2>
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
            <div className="num" style={{ color: accent }}>{s.num}</div>
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
          <div className="kicker" style={{ color: accent }}>{kicker}</div>
          <h2>{title}</h2>
          <button className="btn" style={{ background: accent, color: '#10100a', marginTop: 30 }}>{button}</button>
        </Reveal>
      </div>
    </section>
  )
}

export function SectionHead({ kicker, title, lead, accent }) {
  return (
    <Reveal>
      {kicker && <div className="kicker" style={{ color: accent }}>{kicker}</div>}
      <h2>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </Reveal>
  )
}

/* ============ cursor spotlight reveal hero ============ */
/* A base image fills the hero; a second image is revealed through a soft
   circular mask that trails the cursor (lerp-smoothed). */
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

/* ============ full site template ============ */
/* Assembles a long-form page: hero with floats → marquee → features →
   split 1 → parallax banner → gallery → split 2 → quote → stats → CTA → footer */
export function SiteTemplate({ cfg, canvas }) {
  const a = cfg.accent
  const hero = cfg.hero.spotlight ? (
    <SpotlightHero
      base={cfg.hero.spotlight.base}
      reveal={cfg.hero.spotlight.reveal}
      baseFilter={cfg.hero.spotlight.baseFilter}
      accent={a}
    >
      <TopNav brand={cfg.brand} links={cfg.nav} accent={a} />
      <div className="spot-heading">
        <h1>
          <span className="spot-line1 hero-anim hero-reveal" style={{ animationDelay: '0.25s' }}>{cfg.hero.line1}</span>
          <span className="spot-line2 hero-anim hero-reveal" style={{ animationDelay: '0.42s' }}>{cfg.hero.line2}</span>
        </h1>
      </div>
      <div className="spot-bl hero-anim hero-fade" style={{ animationDelay: '0.7s' }}>
        <p>{cfg.hero.leftText}</p>
      </div>
      <div className="spot-br hero-anim hero-fade" style={{ animationDelay: '0.85s' }}>
        <p>{cfg.hero.sub}</p>
        <button className="btn" style={{ background: cfg.hero.btnBg || a, color: cfg.hero.btnColor || '#101010' }}>{cfg.hero.cta1}</button>
      </div>
    </SpotlightHero>
  ) : (
    <FloatHero
      image={cfg.hero.image}
      floats={cfg.hero.floats}
      overlayGradient={cfg.hero.gradient}
      accent={a}
      canvas={canvas}
    >
      <TopNav brand={cfg.brand} links={cfg.nav} accent={a} />
      <div className="hero-content">
        <div className="kicker" style={{ color: a }}>{cfg.hero.kicker}</div>
        <h1>{cfg.hero.title}</h1>
        <p className="sub">{cfg.hero.sub}</p>
        <div className="cta-row">
          <button className="btn" style={{ background: cfg.hero.btnBg || a, color: cfg.hero.btnColor || '#101010' }}>{cfg.hero.cta1}</button>
          <button className="btn ghost">{cfg.hero.cta2}</button>
        </div>
      </div>
    </FloatHero>
  )
  return (
    <div className="site" style={{ background: cfg.bg }}>
      {hero}

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
      <BackPill />
      <PromptFab prompt={cfg.prompt} />
    </div>
  )
}
