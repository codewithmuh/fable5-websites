# Fable 5 · 3D Website Showcase

Eleven photo-real, long-form 3D sites in a single React codebase — ten industry landing pages plus **Helios**, a live solar-system simulator that predicts real solar eclipses — and a hub page that links to all of them. Cinematic imagery with 3D depth effects and an enterprise-grade animation layer.

**Themes:** 4 dark (Airline, Automobile, Fitness, Jewelry) · 3 light (Fashion, Tourism, Real Estate) · 3 colored with drifting gradient blobs (Tech, Restaurant, Music). Theming is CSS-variable based (`.site.light`).

**Animation layer (every site):** kinetic word-by-word headline reveals, cursor-spotlight heroes (Airline/Fashion/Jewelry), magnetic buttons with shine sweeps, count-up stats, scroll progress bar, animated nav underlines, 3D scroll reveals, parallax banners, film-grain overlay, marquee strips.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5173 — the hub lists all 11 sites. Click any card to open that site; use the "← All sites" pill to come back.

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

## The 11 sites

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
| `/#/solar` | Solar System (simulation) | Live 3D orrery — drag to orbit, fast-forward time, predict the next solar eclipse |

## Site 11: Helios — solar system + eclipse prediction

The eleventh site is a feature demo rather than an industry template. A full-screen Three.js orrery runs the Sun, all 8 planets and the Moon on their **real J2000 mean longitudes and mean motions**, with the Moon's 5.14° orbital tilt. Time is controllable from paused to 6 months/second.

Hit **“Predict next solar eclipse”** and it Newton-iterates to upcoming new moons, checks the Moon's distance from an orbital node (< 15.5° = eclipse; < 10.5° = central — total near perigee, annular near apogee), fast-forwards the orrery to the date and shows an animated result card. The same math renders a live list of the next six solar eclipses — within ±1 day of the NASA catalog (it finds 12 Aug 2026 total, 6 Feb 2027 annular, 2 Aug 2027 total…). All of it is ~80 lines of closed-form astronomy in `src/data/astro.js` — no API calls, no datasets.

## Copy Prompt feature

Every page (including the hub) has a floating **✨ Copy Prompt** button (bottom-right). It copies the full generation prompt for that design, so viewers can recreate a similar site. Prompts live in `src/data/prompts.js`; photo URLs in `src/data/images.js` (all verified to load).

## Build

```bash
npm run build
```

Uses `HashRouter`, so the built output works on any static host with no server config.

## Stack

Vite · React · Three.js · @react-three/fiber · @react-three/drei · react-router-dom · Unsplash photography
