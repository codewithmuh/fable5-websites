import { Canvas } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { SiteTemplate } from '../components/Shared.jsx'
import { prompts } from '../data/prompts.js'
import { images, pin } from '../data/images.js'

const A = '#e9d29b'

const cfg = {
  accent: A,
  theme: 'dark',
  bg: '#070604',
  brand: 'AURELLE',
  nav: ['High Jewelry', 'Bridal', 'Bespoke', 'Boutiques'],
  tagline: 'Light, made eternal.',
  prompt: prompts.jewelry,
  hero: {
    ghost: 'AURELLE',
    aurora: ['#7a5f24', '#2e2410'],
    image: pin.jewelry.hero,
    spotlightPanel: true,
    baseFilter: 'brightness(.38) saturate(.55)',
    serif: true,
    kicker: 'Maison de Haute Joaillerie · Est. 1892',
    titleLine1: 'Light,',
    titleLine2: 'made eternal.',
    sub: "Each Aurelle stone is cut over nine months by a single master's hands. Let your cursor catch the stone — that flash is fifty-seven facets returning the light.",
    cta1: 'Book a private viewing', cta2: 'The collections',
    btnColor: '#241c0c',
  },
  marquee: ['High jewelry', 'Bridal', 'Bespoke', 'The archive', 'Place Vendôme', 'Since 1892'],
  features: {
    kicker: 'The Collections',
    title: 'The Maison',
    lead: 'Three ateliers, one obsession: the way light leaves a stone.',
    items: [
      { image: images.jewelry.pearls, tag: 'High Jewelry', title: 'Named stones', text: 'One-of-one pieces around named stones — unveiled once a year, owned for generations.' },
      { image: images.jewelry.diamonds, tag: 'Bridal', title: 'The 57-facet cut', text: 'Solitaires cut to our signature, set while you watch in the atelier.' },
      { image: images.jewelry.necklace, tag: 'Bespoke', title: 'Your story, in gold', text: 'From a sketch over tea to a finished piece — told in carbon and gold.' },
    ],
  },
  split1: {
    image: pin.jewelry.diamond,
    kicker: 'La Lumière',
    title: 'Fifty-seven facets, one signature',
    text: 'The Aurelle cut returns 3% more light than an ideal brilliant — a number our master cutters chase one facet at a time, under a loupe, for the better part of a year per stone.',
    bullets: [
      'Every stone traced from mine to maison',
      'Cut, never recut: imperfect stones become other things',
      'Certified by three independent laboratories',
    ],
  },
  banner: {
    image: images.jewelry.rings,
    dim: 0.5,
    kicker: 'Savoir-Faire',
    title: 'Nine months per stone. A lifetime per piece.',
    text: 'Twenty-eight master artisans, four generations of the same families, one workshop above Place Vendôme that has never moved.',
  },
  gallery: {
    kicker: 'The Vault',
    title: 'Pieces with passports',
    lead: 'Three works from the archive, photographed for the first time.',
    items: [
      { image: images.jewelry.necklace, tag: '1923', title: 'Le Collier Soleil' },
      { image: pin.jewelry.band, tag: '1968', title: 'The Riviera band' },
      { image: pin.jewelry.diamond, tag: '2025', title: 'Stella — 11.4 carats' },
    ],
  },
  split2: {
    image: images.jewelry.pearls,
    kicker: 'Bespoke',
    title: 'It begins with tea, and a blank page',
    text: 'Every bespoke commission starts in the salon: your story, our sketchbook. Six weeks later you review a wax model; six months later, your piece leaves the atelier with a name and an archive number it will keep forever.',
    bullets: [
      'One artisan owns your piece start to finish',
      'Heirloom stones reset with full provenance kept',
      'The sketch is yours to keep, framed',
    ],
  },
  quote: {
    text: 'My grandmother bought her Aurelle in 1954. They still had the sketch. They still knew her stone by name.',
    author: 'Camille Aubert',
    role: 'Client, third generation',
  },
  statsTitle: 'Since 1892',
  stats: [
    { num: '134', lbl: 'Years of craft' },
    { num: '28', lbl: 'Master artisans' },
    { num: '19', lbl: 'Boutiques' },
    { num: '57', lbl: 'Facets, exactly' },
  ],
  cta: {
    image: pin.jewelry.hero,
    kicker: 'Private salons',
    title: 'Some light deserves to be seen in person.',
    button: 'Book a private viewing',
  },
}

export default function Jewelry() {
  return (
    <SiteTemplate
      cfg={cfg}
      canvas={
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ alpha: true }}>
          <Sparkles count={160} scale={[14, 8, 4]} size={3} speed={0.35} color="#fff2cf" opacity={0.75} />
        </Canvas>
      }
    />
  )
}
