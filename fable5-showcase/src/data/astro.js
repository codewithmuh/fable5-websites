// Simplified solar-system + eclipse math, all angles in degrees, t in days since J2000.0.
// Mean-longitude model (no elliptical terms) — good enough to land real eclipse
// dates within ~a day and to drive the 3D orrery.

export const J2000_MS = Date.UTC(2000, 0, 1, 12) // 2000-01-01 12:00 TT ~ UTC

export const daysSinceJ2000 = (ms) => (ms - J2000_MS) / 86400000
export const msFromDays = (t) => J2000_MS + t * 86400000

const mod360 = (x) => ((x % 360) + 360) % 360
/* signed shortest distance from angle x to angle y, in (-180, 180] */
const angDist = (x, y) => {
  const d = mod360(x - y)
  return d > 180 ? d - 360 : d
}

/* Geocentric mean longitude of the Sun */
export const sunLongitude = (t) => mod360(280.460 + 0.9856474 * t)
/* Geocentric mean longitude of the Moon */
export const moonLongitude = (t) => mod360(218.316 + 13.176396 * t)
/* Longitude of the Moon's ascending node (regresses ~18.6 yr cycle) */
export const moonNode = (t) => mod360(125.045 - 0.0529538 * t)
/* Moon's mean anomaly — near 0 = perigee (big moon → total eclipses) */
export const moonAnomaly = (t) => mod360(134.963 + 13.064993 * t)
/* Ecliptic latitude of the Moon from its 5.14° orbital tilt */
export const moonLatitude = (t) =>
  5.145 * Math.sin(((moonLongitude(t) - moonNode(t)) * Math.PI) / 180)

/* Moon phase elongation: 0 = new moon, 180 = full moon */
export const elongation = (t) => mod360(moonLongitude(t) - sunLongitude(t))

const SYNODIC_RATE = 13.176396 - 0.9856474 // °/day → 29.53-day month

/* Exact time of the next new moon at or after t (Newton iteration) */
export function nextNewMoon(t) {
  // jump to the rough next conjunction, then polish
  let tn = t + (360 - elongation(t)) / SYNODIC_RATE
  for (let i = 0; i < 8; i++) tn -= angDist(elongation(tn), 0) / SYNODIC_RATE
  return tn < t - 0.001 ? nextNewMoon(t + 1) : tn
}

/*
 * Solar eclipses: at new moon, the Moon must also sit near a node of its
 * tilted orbit (argument of latitude F near 0° or 180°), else its shadow
 * misses Earth. |F| within ~15.5° guarantees an eclipse somewhere on Earth;
 * within ~10.5° it is central (total or annular — total if the Moon is near
 * perigee and looks big enough to cover the Sun, annular if near apogee).
 */
export function nextSolarEclipses(tStart, count = 5) {
  const out = []
  let t = tStart
  let guard = 0
  while (out.length < count && guard++ < 400) {
    const tn = nextNewMoon(t)
    const F = mod360(moonLongitude(tn) - moonNode(tn))
    const nodeDist = Math.min(Math.abs(angDist(F, 0)), Math.abs(angDist(F, 180)))
    if (nodeDist < 15.5) {
      const nearPerigee = Math.cos((moonAnomaly(tn) * Math.PI) / 180) > 0
      out.push({
        t: tn,
        dateMs: msFromDays(tn),
        nodeDist,
        node: Math.abs(angDist(F, 0)) < 90 ? 'ascending' : 'descending',
        type: nodeDist > 10.5 ? 'Partial' : nearPerigee ? 'Total' : 'Annular',
        latitude: moonLatitude(tn),
      })
    }
    t = tn + 1
  }
  return out
}
