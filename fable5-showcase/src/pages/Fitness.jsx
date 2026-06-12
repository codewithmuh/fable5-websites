import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { SiteTemplate } from '../components/Shared.jsx'
import { makeSoftCircle } from '../components/threeUtils.js'
import { prompts } from '../data/prompts.js'
import { images, pin } from '../data/images.js'

const A = '#c8ff3d'

function Energy() {
  const pts = useRef()
  const tex = useMemo(() => makeSoftCircle(), [])
  const { arr, seeds } = useMemo(() => {
    const seeds = Array.from({ length: 110 }, () => ({
      x: (Math.random() - 0.5) * 18,
      y: Math.random() * 9 - 4.5,
      z: -2 - Math.random() * 5,
      sp: 0.4 + Math.random() * 1,
    }))
    return { arr: new Float32Array(110 * 3), seeds }
  }, [])
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const positions = pts.current.geometry.attributes.position
    seeds.forEach((s, i) => {
      positions.setXYZ(i, s.x, ((s.y + t * s.sp + 4.5) % 9) - 4.5, s.z)
    })
    positions.needsUpdate = true
  })
  return (
    <points ref={pts}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[arr, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.1} map={tex} color="#c8ff3d" transparent opacity={0.8} depthWrite={false} />
    </points>
  )
}

const cfg = {
  accent: A,
  bg: '#07080a',
  brand: 'FORGE',
  nav: ['Clubs', 'Programs', 'Coaches', 'Join'],
  tagline: 'Earn your strong.',
  prompt: prompts.fitness,
  hero: {
    image: pin.fitness.hero,
    gradient: 'linear-gradient(100deg, rgba(5,7,4,.82) 0%, rgba(5,7,4,.45) 45%, rgba(5,7,4,.12) 100%)',
    floats: [
      { img: pin.fitness.fire, tag: 'Strength lab' },
      { img: images.fitness.deadlift, tag: 'HIIT arena' },
    ],
    kicker: 'No Shortcuts. Just Reps.',
    title: <span style={{ textTransform: 'uppercase', letterSpacing: '-1px' }}>Earn your<br />strong.</span>,
    sub: '24/7 strength labs, HIIT arenas and recovery spas — with coaches who count your last rep louder than your first.',
    cta1: 'Start free week', cta2: 'Find a club',
    btnColor: '#15200a',
  },
  marquee: ['Strength', 'Conditioning', 'Mobility', 'Recovery', 'Nutrition', 'Community'],
  features: {
    kicker: 'The Program',
    title: 'Train smarter',
    lead: 'Three zones. One obsession: your next personal best.',
    items: [
      { image: images.fitness.deadlift, tag: 'Strength', title: 'Strength labs', text: 'Competition platforms, calibrated plates and velocity tracking on every bar.' },
      { image: images.fitness.situps, tag: 'Conditioning', title: 'HIIT arenas', text: 'Heart-rate-zoned circuits on LED floors that adapt to your output in real time.' },
      { image: images.fitness.studio, tag: 'Recovery', title: 'Recovery spa', text: 'Cold plunge, sauna, compression and sleep pods. The gains happen here.' },
    ],
  },
  split1: {
    image: images.fitness.curl,
    kicker: 'Forge OS',
    title: 'Every rep, counted. Every PR, remembered.',
    text: 'Your wristband knows the bar weight before you do. Forge OS tracks tonnage, bar speed and recovery across every visit — then writes next week\'s program around what your body actually did.',
    bullets: [
      'Velocity tracking on all 64 platforms',
      'Auto-logged workouts — leave your phone in the locker',
      'Quarterly testing week with full report card',
    ],
  },
  banner: {
    image: pin.fitness.mono,
    dim: 0.55,
    kicker: 'Coaching',
    title: 'Your PR is our business plan.',
    text: '1,800 certified coaches, quarterly testing weeks and a leaderboard that remembers. Bring goals — we\'ll bring the chalk.',
  },
  gallery: {
    kicker: 'Inside the Clubs',
    title: 'Built different, literally',
    lead: 'No mirrors-and-machines warehouses. Every Forge is purpose-built.',
    items: [
      { image: images.fitness.darkgym, tag: '04:55', title: 'The early crew, Club 12' },
      { image: images.fitness.studio, tag: 'Studio', title: 'Mobility floor, sunrise' },
      { image: pin.fitness.fire, tag: 'The rack', title: '900 kg of iron per lane' },
    ],
  },
  split2: {
    image: images.fitness.darkgym,
    kicker: 'Membership',
    title: 'One key, sixty-two clubs, zero excuses',
    text: 'Your band opens every Forge on earth, 24/7 — plus the saunas, the pods and the protein bar. Pause anytime, no fees, no guilt trips. We keep members by being good, not by being hard to leave.',
    bullets: [
      'All-access global membership, one price',
      'Guest passes: bring a friend every Friday',
      'Cancel or pause in two taps — really',
    ],
  },
  quote: {
    text: 'I joined for the cold plunge. I stayed because a coach I had never met shouted my name on a 5am deadlift PR.',
    author: 'Priya Nair',
    role: 'Member #28,114 · 312 visits/year',
  },
  statsTitle: 'The Forge nation',
  stats: [
    { num: '62', lbl: 'Clubs' },
    { num: '410k', lbl: 'Members' },
    { num: '1,800', lbl: 'Coaches' },
    { num: '24/7', lbl: 'Always open' },
  ],
  cta: {
    image: pin.fitness.hero,
    kicker: 'First week free',
    title: 'The bar is loaded. We saved you a lane.',
    button: 'Claim your free week',
  },
}

export default function Fitness() {
  return (
    <SiteTemplate
      cfg={cfg}
      canvas={
        <Canvas camera={{ position: [0, 0, 5], fov: 55 }} gl={{ alpha: true }}>
          <Energy />
        </Canvas>
      }
    />
  )
}
