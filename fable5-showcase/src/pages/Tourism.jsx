import { Canvas } from '@react-three/fiber'
import { Sparkles, Float } from '@react-three/drei'
import { SiteTemplate } from '../components/Shared.jsx'
import { prompts } from '../data/prompts.js'
import { images, pin } from '../data/images.js'

const A = '#00d4b0'

function FloatingOrbs() {
  const orbs = [
    { pos: [4.5, 1.6, -3], s: 0.5, c: '#ffd9a0' },
    { pos: [-5, -1.2, -4], s: 0.7, c: '#00d4b0' },
    { pos: [3.4, -1.8, -2.5], s: 0.35, c: '#ff7e5f' },
  ]
  return orbs.map((o, i) => (
    <Float key={i} speed={1 + i * 0.4} floatIntensity={2.2}>
      <mesh position={o.pos}>
        <sphereGeometry args={[o.s, 32, 32]} />
        <meshBasicMaterial color={o.c} transparent opacity={0.18} />
      </mesh>
    </Float>
  ))
}

const cfg = {
  accent: A,
  bg: '#06192b',
  brand: 'WANDEROR',
  nav: ['Destinations', 'Experiences', 'Stories', 'Plan'],
  tagline: 'The world is closer than you think.',
  prompt: prompts.tourism,
  hero: {
    image: pin.tourism.hero,
    gradient: 'linear-gradient(100deg, rgba(4,16,26,.85) 0%, rgba(4,16,26,.5) 45%, rgba(4,16,26,.12) 100%)',
    floats: [
      { img: pin.tourism.isle1, cutout: true },
      { img: pin.tourism.isle2, cutout: true },
    ],
    kicker: '120 Countries, One Backpack',
    title: <>The world is<br />closer than you think.</>,
    sub: "Hand-crafted journeys to the planet's wildest corners — guided by locals, powered by wanderlust, remembered forever.",
    cta1: 'Plan my trip', cta2: 'Browse destinations',
    btnColor: '#06291f',
  },
  marquee: ['Bali', 'Santorini', 'Kyoto', 'Patagonia', 'Marrakech', 'Cappadocia', 'Maldives', 'Cinque Terre'],
  features: {
    kicker: 'Hand-picked',
    title: 'Top experiences',
    lead: "Not tours. Stories you'll tell for the rest of your life.",
    items: [
      { image: images.tourism.cinqueterre, tag: 'Coastal', title: 'Riviera villages', text: 'Cinque Terre to Positano — cliff towns, lemon groves and slow boats between them.' },
      { image: images.tourism.bali, tag: 'Sacred', title: 'Temples of Bali', text: 'Water temples at dawn, rice terraces by bike, and a healer who reads your palms.' },
      { image: images.tourism.balloons, tag: 'Sky', title: 'Cappadocia by balloon', text: 'A hundred balloons over fairy chimneys — champagne landing included.' },
    ],
  },
  split1: {
    image: images.tourism.boat,
    kicker: 'Slow Travel',
    title: 'Get gloriously, safely lost',
    text: 'Our journeys are built with 20% blank space on purpose. A free afternoon in a lake town. A market with no plan. The best photo you will take this year is not on the itinerary — but the boat that gets you there is.',
    bullets: [
      'Local hosts in every region, on call 24/7',
      'Trains and boats over planes wherever possible',
      'Every trip carbon-balanced, automatically',
    ],
  },
  banner: {
    image: images.tourism.venice,
    dim: 0.45,
    kicker: 'City Immersions',
    title: 'Live like a local, even for a week.',
    text: 'Markets at dawn, studios and supper clubs by night. Our city hosts hand you their own neighborhood — keys, secrets and all.',
  },
  gallery: {
    kicker: 'Field Notes',
    title: 'Postcards from this month',
    lead: 'Shot by travelers on Wanderor journeys — unfiltered, unstaged.',
    items: [
      { image: images.tourism.paris, tag: 'Paris', title: 'Blue hour at the tower' },
      { image: pin.tourism.lagoon, tag: 'Maldives', title: 'The seaplane commute' },
      { image: images.tourism.cinqueterre, tag: 'Italy', title: 'Manarola before the crowds' },
    ],
  },
  split2: {
    image: images.tourism.bali,
    kicker: 'Tailor-made',
    title: 'Your trip, drafted by someone who has been there',
    text: 'Every Wanderor itinerary is written by a specialist who has slept in the hotels, eaten at the warungs and missed the same ferry you might. Tell us a feeling — we will draft three trips around it within 48 hours.',
    bullets: [
      'Unlimited revisions until the route feels like yours',
      'One WhatsApp thread for everything, forever',
      'Pay in full only two weeks before departure',
    ],
  },
  quote: {
    text: 'I told them "somewhere I can hear myself think, but with great food." They sent me to a fishing village in Galicia. I have been back four times.',
    author: 'Tomás Rivera',
    role: 'Traveler since 2022',
  },
  statsTitle: "Where we've been",
  stats: [
    { num: '120', lbl: 'Destinations' },
    { num: '480k', lbl: 'Travelers' },
    { num: '4.97★', lbl: 'Avg rating' },
    { num: '48h', lbl: 'Trip draft time' },
  ],
  cta: {
    image: pin.tourism.hero,
    kicker: 'Where to?',
    title: 'Tell us a feeling. We will find the place.',
    button: 'Start planning — it’s free',
  },
}

export default function Tourism() {
  return (
    <SiteTemplate
      cfg={cfg}
      canvas={
        <Canvas camera={{ position: [0, 0, 5], fov: 55 }} gl={{ alpha: true }}>
          <Sparkles count={110} scale={[14, 8, 4]} size={2} speed={0.3} color="#ffe9c4" opacity={0.5} />
          <FloatingOrbs />
        </Canvas>
      }
    />
  )
}
