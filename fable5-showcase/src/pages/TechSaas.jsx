import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { SiteTemplate } from '../components/Shared.jsx'
import { prompts } from '../data/prompts.js'
import { images, pin } from '../data/images.js'

const A = '#5b5bff'

function NeuralSphere() {
  const group = useRef()
  const { lineGeo, nodeGeo } = useMemo(() => {
    const nodes = []
    for (let i = 0; i < 130; i++) {
      const phi = Math.acos(2 * Math.random() - 1)
      const theta = Math.random() * Math.PI * 2
      const r = 1.9 + (Math.random() - 0.5) * 0.4
      nodes.push(new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      ))
    }
    const pts = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 1) pts.push(nodes[i], nodes[j])
      }
    }
    return {
      lineGeo: new THREE.BufferGeometry().setFromPoints(pts),
      nodeGeo: new THREE.BufferGeometry().setFromPoints(nodes),
    }
  }, [])
  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime()
    group.current.rotation.y = t * 0.15 + pointer.x * 0.3
    group.current.rotation.x = Math.sin(t * 0.25) * 0.12 + pointer.y * 0.2
  })
  return (
    <group ref={group} position={[0, -2.2, -2]}>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color="#6c7bff" transparent opacity={0.35} />
      </lineSegments>
      <points geometry={nodeGeo}>
        <pointsMaterial size={0.06} color="#3dffc4" />
      </points>
    </group>
  )
}

const cfg = {
  accent: A,
  theme: 'light',
  bg: '#f3f5ff',
  blobs: [
    { color: '#b9c1ff', top: '4%', right: '-12%' },
    { color: '#a9f2dd', top: '40%', left: '-14%' },
    { color: '#ffc9ec', top: '72%', right: '-10%' },
  ],
  brand: 'NEURACORE',
  nav: ['Platform', 'Pricing', 'Docs', 'Console'],
  tagline: 'Ship AI that actually ships.',
  prompt: prompts.tech,
  hero: {
    ghost: 'NEURA',
    aurora: ['#aab4ff', '#9fe8d2'],
    image: pin.tech.hero,
    kicker: '>_ inference at the speed of thought',
    titleLine1: 'Ship AI that',
    titleLine2: 'actually ships.',
    sub: 'One platform for inference, vector search and observability — from prototype to a billion requests without changing a line.',
    cta1: 'Start building free', cta2: 'Read the docs',
    btnBg: 'linear-gradient(90deg, #6c7bff, #3dffc4)', btnColor: '#0a0f20',
  },
  marquee: ['38ms p99', '14 regions', '99.99% uptime', '2.4B req/day', 'SOC 2 · HIPAA', 'Zero egress fees'],
  features: {
    kicker: 'Primitives',
    title: 'The platform',
    lead: 'Three primitives. Infinite products.',
    items: [
      { image: images.tech.chip, tag: 'Inference', title: 'Realtime inference', text: 'Sub-40ms p99 on autoscaling GPU fleets across 14 regions. Pay per token, not per idle hour.' },
      { image: images.tech.code, tag: 'Search', title: 'Vector search', text: 'Billions of embeddings, millisecond recall, hybrid filters — fully managed and always hot.' },
      { image: images.tech.robot, tag: 'Agents', title: 'Agent runtime', text: 'Durable, observable agent loops with replayable traces and human-in-the-loop gates.' },
    ],
  },
  split1: {
    image: pin.tech.lines,
    kicker: 'Developer Experience',
    title: 'From localhost to a billion requests, same three lines',
    text: 'The SDK you prototype with is the one you scale with. Swap a model string, never an architecture. Streaming, batching, caching and failover are defaults — not weekend projects.',
    bullets: [
      'SDKs for Python, TypeScript, Go and Rust',
      'Drop-in OpenAI-compatible endpoints',
      'Preview environments for every pull request',
    ],
  },
  banner: {
    image: images.tech.laptop,
    dim: 0.6,
    kicker: 'Observability',
    title: 'Trace every prompt. Replay every failure.',
    text: "Eval every output across your whole AI stack — one query language, 14 regions, zero sampling. When it breaks at 3am, you'll know why by 3:02.",
  },
  gallery: {
    kicker: 'Under the Hood',
    title: 'The hardware your tokens ride on',
    lead: 'Our fleet, our racks, our renewable megawatts.',
    items: [
      { image: images.tech.chip, tag: 'Silicon', title: 'Custom inference boards, gen 4' },
      { image: images.tech.code, tag: 'Software', title: 'The scheduler that never sleeps' },
      { image: images.tech.team, tag: 'Humans', title: 'On-call, on five continents' },
    ],
  },
  split2: {
    image: images.tech.team,
    kicker: 'For Teams',
    title: 'Your security team will actually say yes',
    text: 'SOC 2 Type II, HIPAA, GDPR, zero data retention by default. Single-tenant VPC deployments in your cloud or ours — with the same API either way. Procurement-friendly since day one.',
    bullets: [
      'SSO/SCIM, audit logs and per-key budgets',
      'Region pinning and EU-only inference',
      'Custom DPAs reviewed in days, not quarters',
    ],
  },
  quote: {
    text: 'We migrated 2 billion daily requests over a weekend. The most dramatic part was the lack of drama.',
    author: 'Sofia Lindqvist',
    role: 'CTO, Relay (YC W24)',
  },
  statsTitle: 'At scale, today',
  stats: [
    { num: '2.4B', lbl: 'Requests / day' },
    { num: '99.99%', lbl: 'Uptime' },
    { num: '38ms', lbl: 'p99 latency' },
    { num: '14', lbl: 'Regions' },
  ],
  cta: {
    image: pin.tech.hero,
    kicker: 'Free tier, forever',
    title: 'Your first million tokens are on us.',
    button: 'Create an API key',
  },
}

export default function TechSaas() {
  return (
    <SiteTemplate
      cfg={cfg}
      canvas={
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ alpha: true }}>
          <NeuralSphere />
        </Canvas>
      }
    />
  )
}
