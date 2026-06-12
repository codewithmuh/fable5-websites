import { Canvas } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { SiteTemplate } from '../components/Shared.jsx'
import { prompts } from '../data/prompts.js'
import { images, pin } from '../data/images.js'

const A = '#e8c47a'

const cfg = {
  accent: A,
  bg: '#0d1330',
  brand: 'HALO ESTATES',
  nav: ['Properties', 'Neighborhoods', 'Invest', 'Contact'],
  tagline: 'Live above the ordinary.',
  prompt: prompts.realestate,
  hero: {
    image: pin.realestate.hero,
    gradient: 'linear-gradient(100deg, rgba(8,10,28,.85) 0%, rgba(8,10,28,.5) 45%, rgba(8,10,28,.12) 100%)',
    floats: [
      { img: pin.realestate.dusk, tag: '$12.4M · Cove House' },
      { img: pin.realestate.glass, tag: '$6.2M · Palma' },
    ],
    kicker: 'Addresses of Distinction',
    title: <>Live above<br />the ordinary.</>,
    sub: 'Penthouse residences, waterfront villas and architectural icons — curated for those who collect addresses, not just homes.',
    cta1: 'View properties', cta2: 'Book a viewing',
    btnColor: '#2a2010',
  },
  marquee: ['Beverly Hills', 'Lake Como', 'Aspen', 'Dubai Hills', 'Côte d’Azur', 'Malibu', 'Marbella'],
  features: {
    kicker: 'Currently Listed',
    title: 'Featured properties',
    lead: 'Three residences currently turning heads — and keys.',
    items: [
      { image: pin.realestate.dusk, tag: '$12.4M', title: 'Cove House', text: 'A waterfront villa that opens entirely to the sea. Six suites, infinity pool, 90 m of private shore.' },
      { image: pin.realestate.glass, tag: '$8.9M', title: 'The Meridian', text: 'Glass pavilion above the canyon — 7-meter ceilings, smart-glass walls, sunset terraces.' },
      { image: pin.realestate.hero, tag: '$6.2M', title: 'Palma Estate', text: "Resort living at home: courtyard pool, guest casita and a collector's garage for four." },
    ],
  },
  split1: {
    image: images.realestate.modern,
    kicker: 'Architecture First',
    title: 'We sell light, volume and silence',
    text: 'Every Halo listing is vetted by an architect before a photographer ever sees it. Ceiling heights, sight lines, sun paths in December — if a home does not move you at the door, it does not make our book.',
    bullets: [
      'Architectural survey included with every listing',
      'Twilight viewings — see the house at its best hour',
      'Full provenance: architect, builders, every renovation',
    ],
  },
  banner: {
    image: images.realestate.skyline,
    dim: 0.55,
    kicker: 'Private Office',
    title: '$4.2B sold, quietly.',
    text: 'Off-market penthouses, discreet negotiations and a client list we never name. The best addresses rarely reach the portals — they reach us.',
  },
  gallery: {
    kicker: 'The Portfolio',
    title: 'Recently placed',
    lead: 'A few of the keys we handed over this quarter.',
    items: [
      { image: images.realestate.apartments, tag: 'Sold', title: 'The Lindon Residences, PH 2' },
      { image: images.realestate.street, tag: 'Sold', title: 'A brownstone on Greene St' },
      { image: images.realestate.dusk, tag: 'Under offer', title: 'Canyon Pavilion, Bel Air' },
    ],
  },
  split2: {
    image: images.realestate.pool,
    kicker: 'Halo Concierge',
    title: 'The keys are the beginning',
    text: 'Our ownership team handles everything after the champagne: staffing, renovation architects, art installation, even the dog walker who knows the gate codes. One call, for as long as you own the home.',
    bullets: [
      'Dedicated estate manager for the first 12 months',
      'Vetted contractor and designer network in 18 cities',
      'Annual valuation and quiet-market appraisal',
    ],
  },
  quote: {
    text: 'They showed us four houses. The second one was ours before we reached the kitchen. They knew — they just let us discover it.',
    author: 'Daniel & Mira Okafor',
    role: 'Cove House, 2025',
  },
  statsTitle: 'Track record',
  stats: [
    { num: '$4.2B', lbl: 'Properties sold' },
    { num: '18', lbl: 'Cities' },
    { num: '99%', lbl: 'Client satisfaction' },
    { num: '31', lbl: 'Days avg. to close' },
  ],
  cta: {
    image: pin.realestate.dusk,
    kicker: 'Private viewings',
    title: 'Some doors only open once.',
    button: 'Speak with the private office',
  },
}

export default function RealEstate() {
  return (
    <SiteTemplate
      cfg={cfg}
      canvas={
        <Canvas camera={{ position: [0, 0, 5], fov: 55 }} gl={{ alpha: true }}>
          <Sparkles count={90} scale={[14, 8, 4]} size={2.4} speed={0.25} color="#ffe2a8" opacity={0.5} />
        </Canvas>
      }
    />
  )
}
