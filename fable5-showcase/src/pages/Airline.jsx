import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { SiteTemplate } from '../components/Shared.jsx'
import { makeSoftCircle } from '../components/threeUtils.js'
import { prompts } from '../data/prompts.js'
import { images, pin } from '../data/images.js'

const A = '#ffb45e'

function CloudDrift() {
  const pts = useRef()
  const tex = useMemo(() => makeSoftCircle(), [])
  const { arr, seeds } = useMemo(() => {
    const seeds = Array.from({ length: 90 }, () => ({
      x: (Math.random() - 0.5) * 22,
      y: (Math.random() - 0.5) * 10,
      z: -3 - Math.random() * 6,
      sp: 0.15 + Math.random() * 0.4,
    }))
    return { arr: new Float32Array(90 * 3), seeds }
  }, [])
  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime()
    const positions = pts.current.geometry.attributes.position
    seeds.forEach((s, i) => {
      const x = ((s.x + t * s.sp + 11) % 22) - 11
      positions.setXYZ(i, x + pointer.x * 0.5, s.y + Math.sin(t * 0.4 + i) * 0.25 + pointer.y * 0.3, s.z)
    })
    positions.needsUpdate = true
  })
  return (
    <points ref={pts}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[arr, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.9} map={tex} color="#ffe6c4" transparent opacity={0.3} depthWrite={false} />
    </points>
  )
}

const cfg = {
  accent: A,
  theme: 'dark',
  bg: '#0b1026',
  brand: 'SKYLINE AIR',
  nav: ['Destinations', 'Cabins', 'Loyalty', 'Book'],
  tagline: 'The sky is the destination.',
  prompt: prompts.airline,
  hero: {
    ghost: 'SKYLINE',
    aurora: ['#2a3f9e', '#b35a1f'],
    image: pin.airline.hero,
    spotlightPanel: true,
    baseFilter: 'brightness(.32) saturate(.45)',
    kicker: 'Window Seat, Always',
    titleLine1: 'Chase the light',
    titleLine2: 'above the clouds.',
    sub: 'Move your cursor over the window — your spotlight finds the golden hour. That is what flying east with us feels like.',
    cta1: 'Book a flight', cta2: 'Explore routes',
    btnColor: '#1a1230',
  },
  marquee: ['New York', 'Tokyo', 'Dubai', 'Paris', 'Singapore', 'Cape Town', 'Sydney', 'Reykjavík'],
  features: {
    kicker: 'The Skyline Experience',
    title: 'Why fly Skyline',
    lead: 'Every detail of the journey, considered — from lounge to landing.',
    items: [
      { image: images.airline.cabin, tag: 'Business', title: 'Lie-flat suites', text: 'Private suites with sliding doors, cloud-soft bedding and direct aisle access on every long-haul route.' },
      { image: images.airline.flight, tag: 'Network', title: '140+ destinations', text: 'Six continents, one seamless network. Same-terminal connections under 45 minutes.' },
      { image: images.airline.airport, tag: 'Ground', title: 'Night lounges', text: 'Floor-to-ceiling runway views, à la carte dining and showers before every red-eye.' },
    ],
  },
  split1: {
    image: pin.airline.window,
    kicker: 'Cabin Design',
    title: 'A window seat with nothing between you and the sky',
    text: 'Our A350 cabins were designed around one rule: every passenger deserves the view. Oversized windows, mood lighting tuned to the destination time zone, and air refreshed every two minutes.',
    bullets: [
      '1-2-1 layout — every suite touches the aisle and the window',
      'Cabin pressure tuned to 6,000 ft so you land actually rested',
      '4K cinema screens with noise-cancelling Devialet audio',
    ],
  },
  banner: {
    image: pin.airline.wing,
    kicker: 'On Approach',
    title: 'Arrive like you never left the lounge.',
    text: "Our 94% on-time arrival rate isn't luck — it's 1,200 daily flights choreographed to the minute, so your evening plans survive the journey.",
  },
  gallery: {
    kicker: 'From the Flight Deck',
    title: 'Moments at 38,000 feet',
    lead: 'Shot by our crews, on real routes, this season.',
    items: [
      { image: pin.airline.hero, tag: 'SYD → LAX', title: 'Golden hour, somewhere over the Pacific' },
      { image: images.airline.runway, tag: 'DXB', title: 'First out, gate A1, 6:02am' },
      { image: images.airline.flight, tag: 'LHR → JFK', title: 'Contrails over Greenland' },
    ],
  },
  split2: {
    image: images.airline.airport,
    kicker: 'Skyline One',
    title: 'The loyalty program that actually loves you back',
    text: 'No blackout dates, no point devaluations, no asterisks. Miles that never expire, upgrades that clear at booking, and a card that opens 140 lounges from Reykjavík to Auckland.',
    bullets: [
      'Status matched from any airline in 24 hours',
      'Family pooling — every seat earns to one account',
      'Guaranteed economy-to-business upgrade twice a year',
    ],
  },
  quote: {
    text: 'I have flown two million miles with nine airlines. Skyline is the only one where I stopped noticing the flying and started enjoying the travel.',
    author: 'Amara Chen',
    role: 'Travel editor, The Long Haul',
  },
  statsTitle: 'Numbers that fly',
  stats: [
    { num: '86', lbl: 'Countries' },
    { num: '1,200', lbl: 'Daily flights' },
    { num: '94%', lbl: 'On-time arrival' },
    { num: '4.9★', lbl: 'Skytrax rating' },
  ],
  cta: {
    image: pin.airline.wing,
    kicker: 'Where next?',
    title: 'Your window seat is waiting.',
    button: 'Book your flight',
  },
}

export default function Airline() {
  return (
    <SiteTemplate
      cfg={cfg}
      canvas={
        <Canvas camera={{ position: [0, 0, 6], fov: 55 }} gl={{ alpha: true }}>
          <Stars radius={60} depth={30} count={900} factor={2.4} fade speed={0.4} />
          <CloudDrift />
        </Canvas>
      }
    />
  )
}
