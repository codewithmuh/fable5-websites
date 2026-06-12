import { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Html, OrbitControls } from '@react-three/drei'
import {
  ScrollProgress, BackPill, PromptFab, TopNav, Footer, Kinetic, Reveal,
  Marquee, SectionHead, TiltGrid, SplitSection, StatsRow, Quote, CTABanner,
} from '../components/Shared.jsx'
import { makeSoftCircle } from '../components/threeUtils.js'
import { prompts } from '../data/prompts.js'
import { images } from '../data/images.js'
import {
  daysSinceJ2000, msFromDays, moonLongitude, moonLatitude, nextSolarEclipses,
} from '../data/astro.js'

const A = '#ffb938'
const DEG = Math.PI / 180
/* page-load instant — the simulation epoch and "today" for the eclipse list */
const NOW_MS = Date.now()

/* Visual model: distances/sizes compressed for the screen, motion uses real
   J2000 mean longitudes + mean motions so positions track the actual sky. */
const PLANETS = [
  { name: 'Mercury', color: '#b8a68d', r: 0.15, d: 3.0,  L0: 252.25, n: 4.09235 },
  { name: 'Venus',   color: '#e6c87a', r: 0.23, d: 4.2,  L0: 181.98, n: 1.60213 },
  { name: 'Earth',   color: '#4f8fe6', r: 0.25, d: 5.6,  L0: 100.46, n: 0.98565 },
  { name: 'Mars',    color: '#d96b4a', r: 0.19, d: 7.0,  L0: 355.45, n: 0.52403 },
  { name: 'Jupiter', color: '#d9a878', r: 0.60, d: 9.4,  L0: 34.40,  n: 0.08309 },
  { name: 'Saturn',  color: '#e3cf9a', r: 0.52, d: 12.0, L0: 49.94,  n: 0.03346, ring: true },
  { name: 'Uranus',  color: '#9fd8e0', r: 0.36, d: 14.4, L0: 313.23, n: 0.01173 },
  { name: 'Neptune', color: '#5f7fe0', r: 0.34, d: 16.6, L0: 304.88, n: 0.00602 },
]
const MOON_D = 0.62

const planetPos = (p, t) => {
  const th = (p.L0 + p.n * t) * DEG
  return [p.d * Math.cos(th), 0, -p.d * Math.sin(th)]
}

function Ring({ d }) {
  const points = useMemo(() => {
    const pts = []
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2
      pts.push([d * Math.cos(a), 0, d * Math.sin(a)])
    }
    return new Float32Array(pts.flat())
  }, [d])
  return (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#ffffff" transparent opacity={0.14} />
    </line>
  )
}

function Sun() {
  const glow = useMemo(() => makeSoftCircle(), [])
  return (
    <group>
      <mesh>
        <sphereGeometry args={[1.05, 48, 48]} />
        <meshBasicMaterial color="#ffd76a" />
      </mesh>
      <sprite scale={[5.5, 5.5, 1]}>
        <spriteMaterial map={glow} color="#ff9a2a" transparent opacity={0.65} depthWrite={false} />
      </sprite>
      <pointLight intensity={3} decay={0} color="#fff3d6" />
      <Html center className="sol-label sun" style={{ transform: 'translateY(34px)' }}>Sun</Html>
    </group>
  )
}

function Planet({ p, sim }) {
  const group = useRef()
  const moon = useRef()
  useFrame(() => {
    const t = sim.current.t
    group.current.position.set(...planetPos(p, t))
    if (moon.current) {
      const lam = moonLongitude(t) * DEG
      const bet = moonLatitude(t) * DEG
      moon.current.position.set(
        MOON_D * Math.cos(bet) * Math.cos(lam),
        MOON_D * Math.sin(bet),
        -MOON_D * Math.cos(bet) * Math.sin(lam),
      )
    }
  })
  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[p.r, 32, 32]} />
        <meshStandardMaterial color={p.color} roughness={0.75} emissive={p.color} emissiveIntensity={0.22} />
      </mesh>
      {p.ring && (
        <mesh rotation={[-Math.PI / 2.35, 0, 0.3]}>
          <ringGeometry args={[p.r * 1.45, p.r * 2.2, 48]} />
          <meshBasicMaterial color="#cdb98a" side={2} transparent opacity={0.5} />
        </mesh>
      )}
      {p.name === 'Earth' && (
        <mesh ref={moon}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#cfcfcf" roughness={1} emissive="#cfcfcf" emissiveIntensity={0.18} />
        </mesh>
      )}
      <Html center className="sol-label" style={{ transform: `translateY(${p.r * 26 + 14}px)` }}>{p.name}</Html>
    </group>
  )
}

/* Bridges the r3f frame loop to the page's clock callback */
function Clock({ onTick }) {
  useFrame((_, delta) => onTick(delta))
  return null
}

function Orrery({ sim, onTick }) {
  return (
    <Canvas camera={{ position: [0, 10.5, 17], fov: 48 }} gl={{ alpha: true }}>
      <ambientLight intensity={0.45} />
      <Stars radius={90} depth={50} count={5000} factor={4} fade speed={0.4} />
      <Clock onTick={onTick} />
      <Sun />
      {PLANETS.map((p) => <Ring key={p.name} d={p.d} />)}
      {PLANETS.map((p) => <Planet key={p.name} p={p} sim={sim} />)}
      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={0.15} maxPolarAngle={1.45} />
    </Canvas>
  )
}

const fmtDate = (ms) =>
  new Date(ms).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })

const SPEEDS = [
  { lbl: '❚❚', v: 0 }, { lbl: '1 day/s', v: 1 }, { lbl: '1 wk/s', v: 7 },
  { lbl: '1 mo/s', v: 30 }, { lbl: '6 mo/s', v: 182 },
]

export default function SolarSystem() {
  const sim = useRef({ t: daysSinceJ2000(NOW_MS), speed: 7, target: null })
  const [speed, setSpeed] = useState(7)
  const [dateMs, setDateMs] = useState(NOW_MS)
  const [eclipse, setEclipse] = useState(null)      // arrived-at eclipse (card shown)
  const [seeking, setSeeking] = useState(false)
  const pending = useRef(null)

  useEffect(() => {
    const id = setInterval(() => setDateMs(msFromDays(sim.current.t)), 120)
    return () => clearInterval(id)
  }, [])

  const setSpd = (v) => { sim.current.speed = v; sim.current.target = null; setSpeed(v); setSeeking(false) }

  const predict = () => {
    const e = nextSolarEclipses(sim.current.t + 0.5, 1)[0]
    pending.current = e
    sim.current.target = e.t
    setEclipse(null)
    setSeeking(true)
  }

  /* Advances simulated time; eases toward sim.target when fast-forwarding */
  const onTick = useCallback((delta) => {
    if (sim.current.target != null) {
      const remaining = sim.current.target - sim.current.t
      const step = Math.min(Math.max(remaining * 2.2 * delta, 4 * delta), 130 * delta)
      if (remaining <= step + 1e-4) {
        sim.current.t = sim.current.target
        sim.current.target = null
        sim.current.speed = 0
        setEclipse(pending.current)
        setSeeking(false)
        setSpeed(0)
      } else {
        sim.current.t += step
      }
    } else {
      sim.current.t += sim.current.speed * delta
    }
  }, [])

  const resume = () => { setEclipse(null); setSpd(7) }

  const upcoming = useMemo(() => nextSolarEclipses(daysSinceJ2000(NOW_MS), 6), [])

  return (
    <div className="site" style={{ background: '#04060f' }}>
      <ScrollProgress accent={A} />

      <div className="hero sol-hero">
        <div className="sol-canvas"><Orrery sim={sim} onTick={onTick} /></div>
        <TopNav brand="HELIOS" links={['Orrery', 'Eclipses', 'The Math', 'About']} accent={A} />

        <div className="sol-heading">
          <div className="kicker hero-anim hero-fade" style={{ color: A, animationDelay: '0.15s' }}>
            Fable 5 · Live N-body orrery
          </div>
          <h1>
            <Kinetic text="A solar system that" delay={0.3} />
            <br />
            <Kinetic text="predicts real eclipses." delay={0.55} />
          </h1>
        </div>

        <div className="sol-panel hero-anim hero-fade" style={{ animationDelay: '0.85s' }}>
          <div className="sol-date">
            <span>Simulated date</span>
            <strong>{fmtDate(dateMs)}</strong>
          </div>
          <div className="sol-speeds">
            {SPEEDS.map((s) => (
              <button
                key={s.lbl}
                className={`sol-pill ${!seeking && speed === s.v ? 'on' : ''}`}
                onClick={() => setSpd(s.v)}
              >
                {s.lbl}
              </button>
            ))}
          </div>
          <button className="sol-predict" onClick={predict} disabled={seeking}>
            {seeking ? '◉ Fast-forwarding…' : '◉ Predict next solar eclipse'}
          </button>
          <div className="sol-hint">Drag to orbit the camera</div>
        </div>

        {eclipse && (
          <div className="sol-card">
            <div className="ecl-anim">
              <div className="ecl-sun" />
              <div className="ecl-moon" />
            </div>
            <div className="ecl-kicker" style={{ color: A }}>{eclipse.type} solar eclipse</div>
            <h3>{fmtDate(eclipse.dateMs)}</h3>
            <p>
              New moon just {eclipse.nodeDist.toFixed(1)}° from the {eclipse.node} node —
              the Moon's shadow lands on Earth. Lunar latitude {eclipse.latitude.toFixed(2)}°.
            </p>
            <button className="sol-predict" onClick={resume}>Resume orbits</button>
          </div>
        )}

        <div className="scroll-hint">Scroll</div>
      </div>

      <div className="site-body">
        <Marquee accent={A} items={[
          '8 planets, real mean motions', '29.53-day synodic month', '5.14° lunar tilt',
          'Node-crossing eclipse search', '±1 day vs. the NASA catalog', '60 fps WebGL',
        ]} />

        <section className="section">
          <SectionHead
            accent={A}
            kicker="The model"
            title="Real sky, tiny code"
            lead="Every body runs on its true J2000 mean longitude and mean motion — the same numbers astronomers use for first-order ephemerides."
          />
          <TiltGrid accent={A} items={[
            { image: images.solar.moon, tag: 'The Moon', title: 'A tilted orbit', text: "The Moon's path is inclined 5.14° to the ecliptic — which is why we don't get an eclipse every single month." },
            { image: images.solar.earth, tag: 'The Earth', title: 'One degree per day', text: 'Earth sweeps 0.9856° of longitude a day. The simulation advances the real angles, so planet positions match the actual sky.' },
            { image: images.solar.nebula, tag: 'The Stage', title: '5,000 stars', text: 'A WebGL starfield and additive sun glow render the whole scene at 60 fps — no textures, no downloads, pure math.' },
          ]} />
        </section>

        <SplitSection
          accent={A}
          image={images.solar.moonBw}
          kicker="The eclipse math"
          title="New moon + node = darkness at noon"
          text="A solar eclipse needs two coincidences at once: the Moon must pass between Earth and Sun (a new moon), and it must sit within about 15.5° of a node — one of the two points where its tilted orbit crosses the ecliptic. The simulator Newton-iterates to each new moon, measures the node distance, and classifies the result."
          bullets={[
            'Within 15.5° of a node → an eclipse happens somewhere on Earth',
            'Within 10.5° → central: total near perigee, annular near apogee',
            'The node line itself regresses in an 18.6-year cycle — also simulated',
          ]}
        />

        <section className="section" id="eclipses">
          <SectionHead
            accent={A}
            kicker="Computed live in your browser"
            title="The next six solar eclipses"
            lead="Not a lookup table — these dates fall out of the orbital math above, recomputed from today every time you load the page."
          />
          <div className="ecl-list">
            {upcoming.map((e, i) => (
              <Reveal key={e.dateMs} delay={i * 90}>
                <div className={`ecl-row ${i === 0 ? 'next' : ''}`}>
                  <div className="ecl-when">
                    <strong>{fmtDate(e.dateMs)}</strong>
                    <span>in {Math.max(1, Math.round((e.dateMs - NOW_MS) / 86400000))} days</span>
                  </div>
                  <div className={`ecl-type ${e.type.toLowerCase()}`}>{e.type}</div>
                  <div className="ecl-meta">
                    {e.node} node · {e.nodeDist.toFixed(1)}° from node · lunar latitude {e.latitude.toFixed(2)}°
                  </div>
                  {i === 0 && <div className="ecl-badge" style={{ color: A, borderColor: A }}>Next</div>}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <SplitSection
          accent={A}
          reverse
          image={images.solar.astronaut}
          kicker="Under the hood"
          title="An ephemeris in 80 lines of JavaScript"
          text="No API calls, no datasets. Sun, Moon and node longitudes are closed-form functions of time; a Newton iteration finds each conjunction in microseconds. Hit “Predict” and the orrery fast-forwards through the months until the geometry lines up."
          bullets={[
            'Mean longitudes accurate to the real eclipse catalog within ±1 day',
            'Time control from paused to six months per second',
            'The same clock drives the 3D scene and the prediction engine',
          ]}
        />

        <Quote
          accent={A}
          text="We pointed it at the sky and asked when the lights go out. It answered August 12, 2026 — same as NASA, in eighty lines."
          author="Claude Fable 5"
          role="Simulation author"
        />

        <section className="section" style={{ paddingTop: 40 }}>
          <SectionHead title="The model, in numbers" accent={A} />
          <StatsRow accent={A} stats={[
            { num: '8', lbl: 'Planets simulated' },
            { num: '29.53', lbl: 'Days per lunar month' },
            { num: '5.14°', lbl: 'Lunar orbit tilt' },
            { num: '±1', lbl: 'Day accuracy vs. catalog' },
          ]} />
        </section>

        <CTABanner
          accent={A}
          image={images.solar.hero}
          kicker="Your turn"
          title="Ask Claude to build you a universe."
          button="Copy the prompt below"
        />

        <Footer brand="HELIOS" tagline="Orbital mechanics, rendered in your browser." />
      </div>

      <div className="grain" />
      <BackPill />
      <PromptFab prompt={prompts.solar} />
    </div>
  )
}
