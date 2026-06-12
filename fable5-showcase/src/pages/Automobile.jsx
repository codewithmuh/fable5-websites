import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { SiteTemplate } from '../components/Shared.jsx'
import { prompts } from '../data/prompts.js'
import { images, pin } from '../data/images.js'

const A = '#00e5ff'

function SpeedLines() {
  const group = useRef()
  const lines = useMemo(() => Array.from({ length: 34 }, () => ({
    y: (Math.random() - 0.5) * 8,
    z: -2 - Math.random() * 6,
    len: 0.8 + Math.random() * 2.4,
    sp: 6 + Math.random() * 10,
    x: (Math.random() - 0.5) * 24,
    red: Math.random() < 0.25,
  })), [])
  useFrame((_, dt) => {
    group.current.children.forEach((m, i) => {
      m.position.x -= lines[i].sp * dt
      if (m.position.x < -13) m.position.x = 13
    })
  })
  return (
    <group ref={group}>
      {lines.map((l, i) => (
        <mesh key={i} position={[l.x, l.y, l.z]}>
          <boxGeometry args={[l.len, 0.02, 0.02]} />
          <meshBasicMaterial color={l.red ? '#ff2d55' : '#00e5ff'} transparent opacity={0.55} />
        </mesh>
      ))}
    </group>
  )
}

const cfg = {
  accent: A,
  theme: 'dark',
  bg: '#04070a',
  brand: 'VEKTOR',
  nav: ['Models', 'Performance', 'Charging', 'Order'],
  tagline: 'Zero to legend.',
  prompt: prompts.automobile,
  hero: {
    ghost: 'VEKTOR',
    aurora: ['#0a4d5e', '#5e0a1c'],
    image: pin.automobile.hero,
    kicker: 'Performance Redefined',
    titleLine1: 'Zero to legend',
    titleLine2: 'in 2.1 seconds.',
    sub: 'The Vektor GT-X: 900 km of range, 1,400 horsepower, and a silhouette sculpted by the wind tunnel itself.',
    cta1: 'Configure yours', cta2: 'Watch the run',
    btnColor: '#04161c',
  },
  marquee: ['1,400 HP', '0–100 · 2.1s', '900 KM range', '412 km/h', '6:42 Nürburgring', '11-min charge'],
  features: {
    kicker: 'The Lineup',
    title: 'Three machines. No compromises.',
    lead: 'Every gram questioned. Every millisecond earned.',
    items: [
      { image: images.automobile.yellow, tag: 'GT-X', title: 'The flagship', text: '1,400 hp tri-motor · 0–100 in 2.1s · 412 km/h. The one the posters are made of.' },
      { image: images.automobile.corvette, tag: 'RS-7', title: 'The daily weapon', text: '780 hp · adaptive aero · 620 km range. Track Saturday, school run Monday.' },
      { image: images.automobile.mclaren, tag: 'AERO', title: 'The lightweight', text: '1,120 kg carbon tub · 540 hp. The purest steering feel we have ever built.' },
    ],
  },
  split1: {
    image: pin.automobile.porsche,
    kicker: 'Design',
    title: 'Shaped by air, finished by hand',
    text: 'Every Vektor body spends 1,100 hours in the wind tunnel before a human touches it — then 200 more under the hands of nine master painters in our Turin atelier.',
    bullets: [
      'Active aero: 2,100 kg of downforce on demand',
      '14-layer "Liquid Carbon" paint, wet-sanded twice',
      'Drag coefficient 0.197 — the slipperiest production car on sale',
    ],
  },
  banner: {
    image: images.automobile.mustang,
    dim: 0.55,
    kicker: 'Engineering',
    title: 'Born in the wind tunnel. Raised on the Nürburgring.',
    text: '6:42 around the Green Hell. Brakes that shrug off three back-to-back hot laps. Numbers first, drama always.',
  },
  gallery: {
    kicker: 'The Garage',
    title: 'Shot on location',
    lead: 'Three cars, three roads, no trailers — we drove them there.',
    items: [
      { image: images.automobile.road, tag: 'Route 1', title: 'GT-X on the Pacific Coast' },
      { image: images.automobile.bmw, tag: 'Alps', title: 'RS-7 above the clouds, Stelvio' },
      { image: pin.automobile.city, tag: 'Tokyo', title: 'Midnight run, Shuto Expressway' },
    ],
  },
  split2: {
    image: images.automobile.mclaren,
    kicker: 'Charging',
    title: '10 to 80 percent while you order coffee',
    text: 'The Vektor Hypercharge network peaks at 520 kW — eleven minutes to 80%, billed by the second, reserved from your seat while you drive. 1,400 stalls across 31 countries, every one of them on renewables.',
    bullets: [
      'Plug & Charge — no app, no card, just park',
      'Battery pre-conditioning routes itself automatically',
      'V2G: your car powers your house through peak hours',
    ],
  },
  quote: {
    text: 'I have driven everything with a badge and a waiting list. The GT-X is the first car that made me pull over just to look back at it.',
    author: 'Marco Delgado',
    role: 'Editor-at-large, Apex Magazine',
  },
  statsTitle: 'The numbers',
  stats: [
    { num: '1,400', lbl: 'Horsepower' },
    { num: '412', lbl: 'km/h top speed' },
    { num: '6:42', lbl: 'Nürburgring' },
    { num: '520kW', lbl: 'Peak charging' },
  ],
  cta: {
    image: pin.automobile.hero,
    kicker: 'Build yours',
    title: 'The waiting list is shorter than the lap time.',
    button: 'Configure your Vektor',
  },
}

export default function Automobile() {
  return (
    <SiteTemplate
      cfg={cfg}
      canvas={
        <Canvas camera={{ position: [0, 0, 6], fov: 55 }} gl={{ alpha: true }}>
          <SpeedLines />
        </Canvas>
      }
    />
  )
}
