// The generation prompt for each template — shown/copied via the "Copy Prompt" button.
// These are written so a viewer can paste them into Claude (or any AI builder)
// and get a similar design.

const base = (industry, hero, overlay, palette, sections) =>
  `Create a stunning, photo-real, LONG-FORM landing page for the ${industry} industry using React + Vite, with react-three-fiber for 3D effects.

HERO: A full-screen real photograph (${hero}) from Unsplash with a cinematic dark gradient and mouse-parallax depth (photo scales and shifts opposite the cursor). CRITICAL: on top of the hero, float 2 PROMINENT popped-out photo cards — real photos in glassmorphism frames, tilted in 3D (rotateZ/rotateY), each at a different parallax depth so they move at different speeds with the mouse, gently bobbing, with small uppercase tag pills. Also render a transparent Three.js canvas overlay: ${overlay}

STYLE: ${palette} Premium editorial look: huge bold typography (Sora / Space Grotesk), text shadows over photos, rounded-pill buttons, generous whitespace.

3D SCROLL FEEL: Every section must reveal with a 3D scroll animation (IntersectionObserver): rise from below with perspective rotateX un-tilting into place, staggered delays on grids. Side-by-side sections slide in from left/right with rotateY.

PAGE STRUCTURE (long-form, in order): 1) Hero with floating photo cards. 2) Scrolling marquee strip of keywords. 3) Feature grid of 3 photo tilt-cards (3D tilt-on-hover following cursor, inner image counter-parallax). 4) Split section: popped 3D photo (offset accent border frame, hover tilt) + detailed text with bullet list. 5) Full-width parallax photo banner (background-attachment: fixed) with bold statement. 6) Photo gallery grid of 3 tilt-cards with captions. 7) Reversed split section with more detail bullets. 8) Large centered testimonial quote. 9) Stats row of 4 numbers. 10) Full-width CTA photo banner with button. 11) Minimal footer.

SECTION CONTENT: ${sections}

Use free Unsplash photos via images.unsplash.com URLs. Responsive, single React page component.`;

export const prompts = {
  airline: base(
    'airline',
    'an airplane wing over golden sunset clouds shot through a cabin window',
    'a slow drift of soft volumetric cloud particles and faint stars that react subtly to the mouse.',
    'Deep twilight blues with warm amber/gold sunset accents (#ffb45e) and white text.',
    'A "Why fly with us" grid of 3 photo tilt-cards (lie-flat suites with a cabin photo, global routes with a jet photo, night lounges with an airport-window photo), a parallax banner of a plane landing, and stats (countries, daily flights, on-time %).'
  ),
  fashion: base(
    'fashion / haute couture',
    'a moody designer boutique interior with clothing racks',
    'floating golden dust sparkles drifting like atelier light.',
    'Editorial black with blush pink (#ffb6c8) accents; mix Playfair Display italic into the headline for a vogue feel.',
    'A "Collections" grid of 3 photo tilt-cards (couture model shot, ready-to-wear editorial, the atelier), a parallax banner of a model by the sea, and stats (ateliers, collections, cities).'
  ),
  automobile: base(
    'automobile / performance cars',
    'a sports car on a coastal road at dusk, headlights on',
    'streaking neon speed-line particles rushing horizontally that intensify near the cursor.',
    'Carbon black with electric cyan (#00e5ff) and red accents, metallic gradient headline.',
    'A "Lineup" grid of 3 supercar photo tilt-cards (each a different real car photo with model name + specs), a parallax banner of a muscle car front grille, and stats (horsepower, top speed, Nürburgring time).'
  ),
  tourism: base(
    'tourism / travel',
    'a tropical beach at golden-hour with calm waves',
    'drifting firefly/sun-haze particles and a few slow-floating translucent orbs.',
    'Fresh teal (#00d4b0) and coral (#ff7e5f) on warm dark backgrounds.',
    'A "Top experiences" grid of 3 destination photo tilt-cards (Santorini/Cinque Terre, Bali temples, hot-air balloons), a parallax banner of Venice or Paris, and stats (destinations, travelers, rating).'
  ),
  realestate: base(
    'real estate / luxury property',
    'a modern architectural villa at dusk with warm interior light',
    'soft floating gold bokeh particles like evening window lights.',
    'Dusk navy with warm gold (#e8c47a) accents for an upscale architectural feel.',
    'A "Featured properties" grid of 3 real property photo tilt-cards with price tags, a parallax banner of a city skyline, and stats (sales volume, cities, satisfaction).'
  ),
  restaurant: base(
    'restaurant / fine dining',
    'a warm moody restaurant interior with wood and candle-light',
    'gently rising warm steam/ember particles.',
    'Rich espresso black with saffron (#ffaa33) accents and candle-light glow.',
    'A "Menu" grid of 3 plated-dish photo tilt-cards (each a real fine-dining plate), a parallax banner of a chef plating at the pass, and stats (Michelin stars, courses, cellar bottles).'
  ),
  fitness: base(
    'fitness / gym',
    'a dark premium gym with a dumbbell rack in shallow depth of field',
    'rising acid-lime energy particles and a subtle pulse-ring glow.',
    'Matte black with acid lime (#c8ff3d) and hot orange energy accents, bold condensed uppercase headline.',
    'A "Train smarter" grid of 3 real workout photo tilt-cards (strength, HIIT, recovery), a parallax banner of a barbell lift, and stats (clubs, members, coaches).'
  ),
  tech: base(
    'tech / SaaS AI platform',
    'Earth from space glowing with city light networks',
    'a slowly rotating wireframe neural-network of glowing connected nodes, floating to the right of the headline.',
    'Void black-blue with indigo (#6c7bff) and aurora green (#3dffc4) gradients, mono-spaced kicker text.',
    'A "Platform" grid of 3 tech photo tilt-cards (circuit-board macro for inference, code matrix for search, robot for agents), a parallax banner of a glowing laptop, and stats (requests/day, uptime, latency).'
  ),
  music: base(
    'music / events & festivals',
    'a festival crowd under orange stage lights with raised hands',
    'floating glowing music-note orbs and sweeping laser-line particles synced to a subtle beat.',
    'Midnight purple with magenta (#ff3df0) and electric blue stage lighting.',
    'A "Stages" grid of 3 real concert photo tilt-cards (main stage, neon arena, sunset deck), a parallax banner of a DJ in smoke, and stats (artists, stages, fans).'
  ),
  jewelry: base(
    'jewelry / luxury',
    'a macro photograph of a diamond ring catching the light',
    'drifting golden sparkle particles that glint like facets.',
    'Pure black with champagne gold (#e9d29b) and ice-white sparkle accents; elegant serif italic in the headline.',
    'A "Maison" grid of 3 real jewelry photo tilt-cards (pearls, gold necklace, diamond bracelet), a parallax banner of gold rings, and stats (years of craft, artisans, boutiques).'
  ),
};

// Spotlight-hero variants (airline, fashion, jewelry): cursor-following reveal
const spotlightNote = `

HERO VARIANT — CURSOR SPOTLIGHT REVEAL (use this instead of the floating-cards hero): the hero is a single full-screen cinematic image shown DARKENED (CSS filter brightness ~0.3, desaturated). On top, the same image is rendered full-color but masked by a soft radial-gradient circle (~260px radius, feathered edges from 40% to 100% transparency) that follows the cursor with lerp smoothing (smooth.x += (mouse.x - smooth.x) * 0.1 in a requestAnimationFrame loop). A faint accent-colored ring outlines the spotlight. Centered heading at top: line 1 in Playfair Display italic, line 2 in the sans font, both with a staggered blur-rise entrance (translateY + blur(12px) → 0). Small paragraph bottom-left, paragraph + pill CTA bottom-right. Hide the native cursor over the hero.`;

prompts.airline += spotlightNote;
prompts.fashion += spotlightNote;
prompts.jewelry += spotlightNote;

export const hubPrompt = `Create a dark, premium "showcase hub" landing page in React + react-three-fiber that lists 10 photo-real 3D industry website templates (airline, fashion, automobile, tourism, real estate, restaurant, fitness, tech, music, jewelry).

Background: a full-screen animated 3D starfield with slowly drifting glowing gradient orbs. Foreground: a giant gradient headline and a responsive grid of 10 cards — each card is a real Unsplash photo of that industry (boutique interior, airplane wing at sunset, supercar, beach, villa, restaurant, gym, earth from space, concert crowd, diamond ring) with a dark gradient fade, industry name, one-line description and an "Open site →" link routing to that template. Cards zoom their photo and lift on hover. Use react-router (HashRouter) for navigation.`;
