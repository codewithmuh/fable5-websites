import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { SiteTemplate } from '../components/Shared.jsx'
import { prompts } from '../data/prompts.js'
import { images, pin } from '../data/images.js'

const A = '#ff3df0'

function Lasers() {
  const group = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    group.current.children.forEach((l, i) => {
      l.rotation.z = Math.sin(t * 0.6 + i * 1.9) * 0.7 + (i % 2 ? 0.4 : -0.4)
    })
  })
  return (
    <group ref={group}>
      {[-6, -2, 2, 6].map((x, i) => (
        <mesh key={i} position={[x, 4.5, -3]}>
          <cylinderGeometry args={[0.012, 0.05, 14, 6]} />
          <meshBasicMaterial
            color={['#ff3df0', '#3d8bff', '#b03dff', '#ff6ad5'][i]}
            transparent opacity={0.5} depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

function GlowOrbs() {
  const orbs = useMemo(() => Array.from({ length: 12 }, () => ({
    pos: [(Math.random() - 0.5) * 13, (Math.random() - 0.5) * 6, -2 - Math.random() * 4],
    s: 0.06 + Math.random() * 0.16,
    c: ['#ff3df0', '#3d8bff', '#ff6ad5', '#b03dff'][Math.floor(Math.random() * 4)],
  })), [])
  return orbs.map((o, i) => (
    <Float key={i} speed={1.6 + (i % 4) * 0.4} floatIntensity={2.6}>
      <mesh position={o.pos}>
        <sphereGeometry args={[o.s, 16, 16]} />
        <meshBasicMaterial color={o.c} transparent opacity={0.85} />
      </mesh>
    </Float>
  ))
}

const cfg = {
  accent: A,
  bg: '#12041f',
  brand: 'PULSE FESTIVAL',
  nav: ['Lineup', 'Stages', 'Tickets', 'Info'],
  tagline: 'Four nights. One heartbeat.',
  prompt: prompts.music,
  hero: {
    image: pin.music.hero,
    gradient: 'linear-gradient(100deg, rgba(14,3,24,.82) 0%, rgba(14,3,24,.45) 45%, rgba(14,3,24,.1) 100%)',
    floats: [
      { img: pin.music.artist, tag: 'Night 2 · Koda' },
      { img: pin.music.neon, tag: 'Neon arena' },
    ],
    kicker: 'July 24–27 · Neon Bay',
    title: <>Four nights.<br />One heartbeat.</>,
    sub: "120 artists across five stages on the waterfront — sunrise sets, laser canyons and bass you'll feel in your ribs for a week.",
    cta1: 'Get tickets', cta2: 'See lineup',
    btnBg: 'linear-gradient(90deg, #ff3df0, #3d8bff)', btnColor: '#fff',
  },
  marquee: ['Koda', 'Velvet Mirage', 'SUNDR', 'Aya Flux', 'The Night Bus', 'Mori', 'Glasshouse', 'Neon Atlas'],
  features: {
    kicker: 'Five Worlds',
    title: 'The stages',
    lead: 'Five worlds, one wristband.',
    items: [
      { image: images.music.stage, tag: 'Main', title: 'Main stage', text: 'Headliners under a 60-meter LED halo with the bay behind them and 80,000 voices in front.' },
      { image: pin.music.neon, tag: 'Indoor', title: 'Neon arena', text: 'An indoor cathedral of lasers and subsonics. Techno until the sun gives up.' },
      { image: images.music.purple, tag: 'Sunset', title: 'Sunset deck', text: 'Golden-hour house and disco on the pier, toes in the sand, drink in hand.' },
    ],
  },
  split1: {
    image: images.music.crowd,
    kicker: 'The Crowd',
    title: '320,000 strangers, one set list',
    text: 'Pulse is engineered for the crowd, not the cameras: water stations every 60 meters, chill domes with real silence, and a no-phones pit at every stage for the ones who came to be there.',
    bullets: [
      'Free water, sunscreen and earplugs everywhere',
      'Sensory-safe viewing platforms at all five stages',
      'Lost friend? Glow towers and a 90-second SMS finder',
    ],
  },
  banner: {
    image: images.music.dj,
    dim: 0.5,
    kicker: 'After Hours',
    title: "The night doesn't end. It just changes rooms.",
    text: "Secret warehouse sets announced at midnight, b2b's that were never on the poster, and a sunrise stage that earns its name every single morning.",
  },
  gallery: {
    kicker: 'Last Year',
    title: 'Proof it happened',
    lead: 'Three frames from 2025 that still give us chills.',
    items: [
      { image: images.music.hands, tag: 'Night 1', title: 'First drop, main stage' },
      { image: images.music.pink, tag: 'Night 3', title: 'Velvet Mirage, neon arena' },
      { image: images.music.colors, tag: 'Night 4', title: 'The closing wall of light' },
    ],
  },
  split2: {
    image: images.music.purple,
    kicker: 'Camp Pulse',
    title: 'Wake up 400 meters from the bass',
    text: 'Boutique camping with real beds, cold showers that are actually cold, a bakery that opens at 6am and a quiet hill where the sunrise set sounds like a secret. Your tent is pitched before you arrive.',
    bullets: [
      'Pre-pitched tents, lockers and phone charging',
      'Camp-only morning yoga and recovery dome',
      'Shuttle boats to the gates every 10 minutes',
    ],
  },
  quote: {
    text: 'I have been to 30 festivals on three continents. Pulse is the only one where the walk back to camp is part of the show.',
    author: 'Lena Okoye',
    role: 'Festival critic, Encore',
  },
  statsTitle: 'Pulse in numbers',
  stats: [
    { num: '120', lbl: 'Artists' },
    { num: '5', lbl: 'Stages' },
    { num: '320k', lbl: 'Fans' },
    { num: '96', lbl: 'Hours of music' },
  ],
  cta: {
    image: pin.music.hero,
    kicker: 'Tier 2 closing soon',
    title: 'Be there when the first beat drops.',
    button: 'Get your wristband',
  },
}

export default function Music() {
  return (
    <SiteTemplate
      cfg={cfg}
      canvas={
        <Canvas camera={{ position: [0, 0, 6], fov: 55 }} gl={{ alpha: true }}>
          <Lasers />
          <GlowOrbs />
        </Canvas>
      }
    />
  )
}
