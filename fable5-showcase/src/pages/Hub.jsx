import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float } from '@react-three/drei'
import { PromptFab } from '../components/Shared.jsx'
import { hubPrompt } from '../data/prompts.js'
import { pin } from '../data/images.js'

const sites = [
  { path: '/airline',    img: pin.airline.hero,    name: 'Skyline Air',     desc: 'A jet over sunset clouds — with a cursor spotlight.', glow: '#3e63ff' },
  { path: '/fashion',    img: pin.fashion.hero,    name: 'Maison Lumière',  desc: 'Dark couture revealed by light.',                     glow: '#ff5ea8' },
  { path: '/automobile', img: pin.automobile.hero, name: 'Vektor Motors',   desc: 'Black on black, headlights on.',                      glow: '#00e5ff' },
  { path: '/tourism',    img: pin.tourism.hero,    name: 'Wanderor',        desc: 'Floating islands over turquoise water.',              glow: '#00d4b0' },
  { path: '/realestate', img: pin.realestate.hero, name: 'Halo Estates',    desc: 'Villas glowing at blue hour.',                        glow: '#e8c47a' },
  { path: '/restaurant', img: pin.restaurant.hero, name: 'Ember & Oak',     desc: 'Fine plates in candle-dark rooms.',                   glow: '#ffaa33' },
  { path: '/fitness',    img: pin.fitness.hero,    name: 'Forge Athletics', desc: 'Iron, fog and sparks.',                               glow: '#c8ff3d' },
  { path: '/tech',       img: pin.tech.hero,       name: 'NeuraCore',       desc: 'Light beams in a dark machine hall.',                 glow: '#6c7bff' },
  { path: '/music',      img: pin.music.hero,      name: 'Pulse Festival',  desc: 'Orange lasers over 80,000 hands.',                    glow: '#ff3df0' },
  { path: '/jewelry',    img: pin.jewelry.hero,    name: 'Aurelle',         desc: 'A solitaire under a cursor spotlight.',               glow: '#e9d29b' },
]

function DriftingOrbs() {
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
            <meshBasicMaterial color={o.color} transparent opacity={0.16} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export default function Hub() {
  return (
    <div className="hub">
      <div className="hub-canvas">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <Stars radius={80} depth={50} count={4000} factor={4} fade speed={0.6} />
          <DriftingOrbs />
        </Canvas>
      </div>

      <div className="hub-inner">
        <header className="hub-head">
          <div className="kicker">Fable 5 · 3D Website Showcase</div>
          <h1>Ten industries.<br />Ten stunning websites.</h1>
          <p>
            A single codebase of photo-real, animated landing pages — one per industry.
            Real photography, 3D depth effects, parallax everywhere. Open any site,
            then hit “Copy Prompt” to grab the exact prompt that designed it.
          </p>
        </header>

        <div className="hub-grid">
          {sites.map((s, i) => (
            <Link to={s.path} className="hub-card" key={s.path}>
              <div className="hub-photo" style={{ backgroundImage: `url(${s.img})` }} />
              <div className="hub-fade" />
              <div className="hub-body">
                <div className="num" style={{ color: s.glow }}>{String(i + 1).padStart(2, '0')}</div>
                <h3>{s.name}</h3>
                <p>{s.desc}</p>
                <span className="open" style={{ color: s.glow }}>Open site →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <PromptFab prompt={hubPrompt} />
    </div>
  )
}
