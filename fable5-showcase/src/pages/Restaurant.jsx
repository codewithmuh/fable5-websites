import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { SiteTemplate } from '../components/Shared.jsx'
import { makeSoftCircle } from '../components/threeUtils.js'
import { prompts } from '../data/prompts.js'
import { images, pin } from '../data/images.js'

const A = '#ffaa33'

function Embers() {
  const pts = useRef()
  const tex = useMemo(() => makeSoftCircle(), [])
  const { arr, seeds } = useMemo(() => {
    const seeds = Array.from({ length: 80 }, () => ({
      x: (Math.random() - 0.5) * 18,
      y: Math.random() * 9 - 4.5,
      z: -2 - Math.random() * 5,
      sp: 0.3 + Math.random() * 0.7,
      sway: Math.random() * Math.PI * 2,
    }))
    return { arr: new Float32Array(80 * 3), seeds }
  }, [])
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const positions = pts.current.geometry.attributes.position
    seeds.forEach((s, i) => {
      const y = ((s.y + t * s.sp + 4.5) % 9) - 4.5
      positions.setXYZ(i, s.x + Math.sin(t * 0.8 + s.sway) * 0.4, y, s.z)
    })
    positions.needsUpdate = true
  })
  return (
    <points ref={pts}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[arr, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.12} map={tex} color="#ffc97a" transparent opacity={0.75} depthWrite={false} />
    </points>
  )
}

const cfg = {
  accent: A,
  bg: '#0c0805',
  brand: 'EMBER & OAK',
  nav: ['Menu', 'Chef', 'Cellar', 'Reserve'],
  tagline: 'Dinner as theatre.',
  prompt: prompts.restaurant,
  hero: {
    image: pin.restaurant.hero,
    gradient: 'linear-gradient(100deg, rgba(14,8,3,.85) 0%, rgba(14,8,3,.5) 45%, rgba(14,8,3,.15) 100%)',
    floats: [
      { img: pin.restaurant.steak, tag: 'Course VI' },
      { img: images.restaurant.salmon, tag: 'From the hearth' },
    ],
    kicker: 'Two Stars · One Table',
    title: <>Dinner as<br />theatre.</>,
    sub: 'Fourteen courses of fire, smoke and season — served at the pass, plated in front of you, gone too soon.',
    cta1: 'Reserve a table', cta2: 'View tasting menu',
    btnColor: '#2a1505',
  },
  marquee: ['Open fire', 'Fourteen courses', 'Rooftop garden', '4,000 bottles', 'Two stars', 'One seating'],
  features: {
    kicker: 'This Season',
    title: 'The tasting menu',
    lead: 'Three ways to surrender your evening to the kitchen.',
    items: [
      { image: pin.restaurant.steak, tag: '14 Courses', title: 'Seasonal tasting', text: "Fourteen courses that follow the week's harvest — never the same menu twice." },
      { image: images.restaurant.salmon, tag: 'Pairing', title: 'From the cellar', text: "Our sommelier's 4,000 bottles, poured course by course with stories attached." },
      { image: images.restaurant.bowl, tag: 'Garden', title: 'Roots & leaves', text: 'A plant-led tasting from our rooftop garden — picked at 4pm, plated at 8.' },
    ],
  },
  split1: {
    image: images.restaurant.spread,
    kicker: 'Philosophy',
    title: 'Fire is the only recipe we have kept for ten years',
    text: 'No gas, no sous-vide, no shortcuts — every dish at Ember & Oak passes over oak embers, including dessert. Smoke is our seasoning; time is our technique.',
    bullets: [
      'Whole-animal, whole-vegetable kitchen — nothing wasted',
      'Producers named on the menu, visited every season',
      'Bread course baked to order, 11 minutes before serving',
    ],
  },
  banner: {
    image: images.restaurant.chef,
    dim: 0.55,
    kicker: 'The Pass',
    title: 'Six seats. A whisper from the fire.',
    text: "The chef's table puts you inside the brigade — every sear, every plate, every quiet \"oui\" between courses. One seating, Thursday to Saturday.",
  },
  gallery: {
    kicker: 'From the Kitchen',
    title: 'This week on the pass',
    lead: 'The menu changes with the market. These plates existed for exactly seven days.',
    items: [
      { image: images.restaurant.bowl, tag: 'Course II', title: 'Garden, embers, yuzu' },
      { image: images.restaurant.dining, tag: 'The room', title: 'Service, 19:42' },
      { image: images.restaurant.terrace, tag: 'Summer', title: 'The terrace, last light' },
    ],
  },
  split2: {
    image: images.restaurant.terrace,
    kicker: 'The Cellar',
    title: 'Four thousand bottles, one storyteller',
    text: 'Our cellar runs from grower champagnes to a 1961 vertical we will probably never open. Sommelier Léa Fontaine pours by intuition — tell her a memory and she will find it a wine.',
    bullets: [
      'Pairings from €95 — including zero-proof ferments',
      'The "last glass" rule: every table ends on something rare',
      'Cellar tours Saturdays at 17:00, before first seating',
    ],
  },
  quote: {
    text: 'The fourteenth course is the walk home — you will replay the whole evening twice before you reach the corner.',
    author: 'Guide Michelin',
    role: 'Two stars, 2024–2026',
  },
  statsTitle: 'The house',
  stats: [
    { num: '★★', lbl: 'Michelin stars' },
    { num: '14', lbl: 'Courses' },
    { num: '4,000', lbl: 'Bottle cellar' },
    { num: '32', lbl: 'Seats per night' },
  ],
  cta: {
    image: pin.restaurant.hero,
    kicker: 'Reservations',
    title: 'Tables release on the 1st, at noon.',
    button: 'Join the table list',
  },
}

export default function Restaurant() {
  return (
    <SiteTemplate
      cfg={cfg}
      canvas={
        <Canvas camera={{ position: [0, 0, 5], fov: 55 }} gl={{ alpha: true }}>
          <Embers />
        </Canvas>
      }
    />
  )
}
