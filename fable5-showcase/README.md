# Fable 5 · 3D Website Showcase

Ten photo-real, long-form 3D landing pages — one per industry — in a single React codebase, plus a hub page that links to all of them. Real Unsplash photography everywhere, with 3D depth effects layered on top.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5173 — the hub lists all 10 sites. Click any card to open that site; use the "← All sites" pill to come back.

## What every site includes (11 sections)

1. Full-screen photo hero with mouse parallax + **2 floating popped-out photo cards** at different 3D depths + an animated Three.js overlay unique to the industry (clouds, speed lines, lasers, sparkles, neural net, embers…)
2. Scrolling marquee strip
3. Feature grid of 3 photo cards with 3D tilt-on-hover
4. Split section — popped 3D photo + detailed copy with bullets
5. Full-width parallax photo banner
6. Photo gallery grid
7. Reversed split section
8. Testimonial quote
9. Stats row
10. CTA photo banner
11. Footer

Every section reveals with a 3D scroll animation (rise + un-tilt via IntersectionObserver).

## The 10 sites

| Route | Industry | Hero |
|---|---|---|
| `/#/airline` | Airline | Wing over golden clouds + floating window/cabin shots |
| `/#/fashion` | Fashion | Boutique interior + floating editorial shots |
| `/#/automobile` | Automobile | Sports car at dusk + floating supercars |
| `/#/tourism` | Tourism | Golden beach + floating balloons/Maldives |
| `/#/realestate` | Real Estate | Modern villa + floating listings with prices |
| `/#/restaurant` | Restaurant | Moody dining room + floating plated dishes |
| `/#/fitness` | Fitness | Dark gym + floating training shots |
| `/#/tech` | Tech / SaaS | Earth from space + floating chip/robot |
| `/#/music` | Music / Events | Festival crowd + floating DJ/main-stage |
| `/#/jewelry` | Jewelry | Diamond ring macro + floating pearls/gold |

## Copy Prompt feature

Every page (including the hub) has a floating **✨ Copy Prompt** button (bottom-right). It copies the full generation prompt for that design, so viewers can recreate a similar site. Prompts live in `src/data/prompts.js`; photo URLs in `src/data/images.js` (all verified to load).

## Build

```bash
npm run build
```

Uses `HashRouter`, so the built output works on any static host with no server config.

## Stack

Vite · React · Three.js · @react-three/fiber · @react-three/drei · react-router-dom · Unsplash photography
