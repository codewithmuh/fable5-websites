import { Canvas } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { SiteTemplate } from '../components/Shared.jsx'
import { prompts } from '../data/prompts.js'
import { images, pin } from '../data/images.js'

const A = '#b4456a'

const cfg = {
  accent: A,
  theme: 'light',
  bg: '#faf7f2',
  brand: 'MAISON LUMIÈRE',
  nav: ['Collections', 'Runway', 'Ateliers', 'Journal'],
  tagline: 'Worn by light, cut from silk.',
  prompt: prompts.fashion,
  hero: {
    ghost: 'LUMIÈRE',
    aurora: ['#f0bccb', '#e7d3b8'],
    image: pin.fashion.hero,
    spotlightPanel: true,
    baseFilter: 'brightness(.45) saturate(.25)',
    serif: true,
    kicker: 'Paris · Milan · Tokyo',
    titleLine1: 'Worn by light,',
    titleLine2: 'cut from silk.',
    sub: 'Couture that moves like water — each piece hand-finished in our Paris atelier. Bring your cursor close: the light finds her the way it will find you.',
    cta1: 'View collection', cta2: 'Runway film',
    btnColor: '#fff',
  },
  marquee: ['Couture', 'Ready-to-wear', 'Accessories', 'Bridal', 'Archive', 'Bespoke'],
  features: {
    kicker: 'Autumn / Winter',
    title: 'The Collections',
    lead: 'Three houses of expression, one signature: movement.',
    items: [
      { image: pin.fashion.gold, tag: 'Couture', title: 'One-of-one gowns', text: 'Sculpted to the body — 400 hours of hand embroidery per piece, numbered and never repeated.' },
      { image: images.fashion.model3, tag: 'Ready-to-wear', title: 'The runway, translated', text: 'Fluid tailoring in silk, wool and air — made for the street, cut like the show.' },
      { image: images.fashion.atelier, tag: 'Atelier', title: 'Behind the seams', text: 'Visit the Paris atelier where every Lumière piece begins as a 6B-pencil sketch.' },
    ],
  },
  split1: {
    image: images.fashion.store,
    kicker: 'The Boutiques',
    title: 'Rooms designed to slow you down',
    text: 'Our boutiques are built like galleries: one rail per collection, daylight from above, and a tailor on every floor. Nothing is behind glass — silk is meant to be touched.',
    bullets: [
      'Private salon fittings with the house stylists',
      'Same-day alterations, pressed and delivered by 8pm',
      'The archive room: borrow from thirty years of runway',
    ],
  },
  banner: {
    image: pin.fashion.arch,
    dim: 0.45,
    kicker: 'Cruise ’26',
    title: 'La mer, la lumière.',
    text: 'Shot on the Amalfi coast — twelve looks in silk georgette that move with the wind and photograph like water.',
  },
  gallery: {
    kicker: 'Editorial',
    title: 'Season in frames',
    lead: 'From the September issue to the runway pit — the looks everyone kept.',
    items: [
      { image: pin.fashion.hero, tag: 'Look 04', title: 'The wide-brim silhouette' },
      { image: images.fashion.racks, tag: 'Backstage', title: 'Forty looks, four minutes' },
      { image: images.fashion.model2, tag: 'Cruise', title: 'Silk against the sea' },
    ],
  },
  split2: {
    image: images.fashion.atelier,
    kicker: 'Savoir-Faire',
    title: 'Four hundred hours, one gown',
    text: 'Eighteen petites mains share a single table in the Paris atelier. Every bead is placed by hand, every seam pressed with a 1952 iron nobody is allowed to replace. This is why a Lumière fits like weather.',
    bullets: [
      'Hand-rolled hems on every silk piece',
      'Dyes mixed in-house from a 300-swatch archive',
      'One fitting in Paris, one anywhere on earth',
    ],
  },
  quote: {
    text: 'Lumière does not dress you. It casts you — and somehow the light always finds the seams.',
    author: 'Inès Moreau',
    role: 'Fashion director, Révue',
  },
  statsTitle: 'La Maison',
  stats: [
    { num: '3', lbl: 'Ateliers' },
    { num: '48', lbl: 'Collections' },
    { num: '27', lbl: 'Cities' },
    { num: '134', lbl: 'Petites mains' },
  ],
  cta: {
    image: pin.fashion.arch,
    kicker: 'AW ’26',
    title: 'The collection arrives October 1.',
    button: 'Request a private viewing',
  },
}

export default function Fashion() {
  return (
    <SiteTemplate
      cfg={cfg}
      canvas={
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ alpha: true }}>
          <Sparkles count={140} scale={[14, 8, 4]} size={2.6} speed={0.35} color="#ffd9c4" opacity={0.55} />
        </Canvas>
      }
    />
  )
}
