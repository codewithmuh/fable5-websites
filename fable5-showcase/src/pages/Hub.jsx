import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float } from '@react-three/drei'
import { PromptFab, Cursor } from '../components/Shared.jsx'
import { hubPrompt } from '../data/prompts.js'
import { pin, images } from '../data/images.js'

const sites = [
  { path: '/airline',    img: pin.airline.hero,    name: 'Skyline Air',     desc: 'A jet over sunset clouds — with a cursor spotlight.', glow: '#3e63ff', theme: 'Dark' },
  { path: '/fashion',    img: pin.fashion.hero,    name: 'Maison Lumière',  desc: 'Editorial light theme, spotlight hero.',              glow: '#ff5ea8', theme: 'Light' },
  { path: '/automobile', img: pin.automobile.hero, name: 'Vektor Motors',   desc: 'Black on black, headlights on.',                      glow: '#00e5ff', theme: 'Dark' },
  { path: '/tourism',    img: pin.tourism.hero,    name: 'Wanderor',        desc: 'Bright airy theme over turquoise water.',             glow: '#0a9e86', theme: 'Light' },
  { path: '/realestate', img: pin.realestate.hero, name: 'Halo Estates',    desc: 'Warm ivory theme, villas at blue hour.',              glow: '#a8842c', theme: 'Light' },
  { path: '/restaurant', img: pin.restaurant.hero, name: 'Ember & Oak',     desc: 'Burgundy glow, candle-dark rooms.',                   glow: '#ffaa33', theme: 'Colored' },
  { path: '/fitness',    img: pin.fitness.hero,    name: 'Forge Athletics', desc: 'Iron, fog and sparks.',                               glow: '#c8ff3d', theme: 'Dark' },
  { path: '/tech',       img: pin.tech.hero,       name: 'NeuraCore',       desc: 'Vivid gradient theme on white.',                      glow: '#5b5bff', theme: 'Colored' },
  { path: '/music',      img: pin.music.hero,      name: 'Pulse Festival',  desc: 'Neon purple, lasers over 80,000 hands.',              glow: '#ff3df0', theme: 'Colored' },
  { path: '/jewelry',    img: pin.jewelry.hero,    name: 'Aurelle',         desc: 'A solitaire under a cursor spotlight.',               glow: '#e9d29b', theme: 'Dark' },
  { path: '/solar',      img: images.solar.hero,   name: 'Helios',          desc: 'A live solar system that predicts real eclipses.',    glow: '#ffb938', theme: 'Simulation' },
]

const FILTERS = ['All', 'Dark', 'Light', 'Colored', 'Simulation']

function DriftingOrbs({ light }) {
  const group = useRef()
  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime()
    if (group.current) {
      group.current.rotation.y = t * 0.03 + pointer.x * 0.15
      group.current.rotation.x = pointer.y * 0.08
    }
  })
  const orbs = [
    { pos: [-6, 2, -8], color: '#3e63ff', s: 2.2 },
    { pos: [6, -2, -10], color: '#a23eff', s: 2.8 },
    { pos: [0, 4, -12], color: '#ff3df0', s: 1.8 },
    { pos: [4, 3, -9], color: '#00d4b0', s: 1.4 },
    { pos: [-5, -3, -11], color: '#e8c47a', s: 1.6 },
  ]
  return (
    <group ref={group}>
      {orbs.map((o, i) => (
        <Float key={i} speed={1.2 + i * 0.2} floatIntensity={2.5}>
          <mesh position={o.pos}>
            <sphereGeometry args={[o.s, 32, 32]} />
            <meshBasicMaterial color={o.color} transparent opacity={light ? 0.3 : 0.16} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export default function Hub() {
  const [mode, setMode] = useState('dark')
  const [filter, setFilter] = useState('All')
  const light = mode === 'light'
  const shown = sites.filter((s) => filter === 'All' || s.theme === filter)

  return (
    <div className={`hub ${light ? 'hub-light' : ''}`}>
      <div className="hub-canvas">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          {!light && <Stars radius={80} depth={50} count={4000} factor={4} fade speed={0.6} />}
          <DriftingOrbs light={light} />
        </Canvas>
      </div>

      <button
        className="mode-toggle"
        onClick={() => setMode(light ? 'dark' : 'light')}
        title="Toggle hub theme"
      >
        {light ? '☾ Dark' : '☀ Light'}
      </button>

      <div className="hub-inner">
        <header className="hub-head">
          <div className="kicker">Fable 5 · 3D Website Showcase</div>
          <h1>Ten industries.<br />Plus one solar system.</h1>
          <p>
            A single codebase of photo-real, animated landing pages — one per industry,
            across dark, light and colored themes — plus a live solar-system simulator
            that predicts real eclipses. Open any site, then hit “Copy Prompt”
            to grab the exact prompt that designed it.
          </p>
        </header>

        <div className="filter-row">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-pill ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
              <span className="count">
                {f === 'All' ? sites.length : sites.filter((s) => s.theme === f).length}
              </span>
            </button>
          ))}
        </div>

        <div className="hub-grid" key={filter}>
          {shown.map((s, idx) => {
            const i = sites.indexOf(s)
            return (
              <Link to={s.path} className="hub-card" key={s.path} style={{ animationDelay: `${idx * 70}ms` }}>
                <div className="hub-photo" style={{ backgroundImage: `url(${s.img})` }} />
                <div className="hub-fade" />
                <div className="num" style={{ color: s.glow }}>{String(i + 1).padStart(2, '0')}</div>
                <div className="theme-pill">{s.theme}</div>
                <div className="hub-body">
                  <h3>{s.name}</h3>
                  <p>{s.desc}</p>
                  <span className="open" style={{ color: s.glow }}>Open site →</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <Cursor accent={light ? '#4338ca' : '#8b9dff'} />
      <PromptFab prompt={hubPrompt} />
    </div>
  )
}
