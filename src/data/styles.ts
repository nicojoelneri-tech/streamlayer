import type { OverlayStyle } from '../types'

export interface StyleInfo {
  id: OverlayStyle
  name: string
  description: string
  colors: string[]
  vibe: string
  fonts: string
}

export const STYLES: StyleInfo[] = [
  {
    id: 'hacker',
    name: 'Deadlink',
    description: 'Estética terminal hacker con glitch, lluvia matrix y HUD de vigilancia. Cyberpunk oscuro.',
    colors: ['#00ff41', '#0a0a0a', '#ff3333'],
    vibe: 'Terminal / Hacker',
    fonts: 'Share Tech Mono',
  },
  {
    id: 'japanese',
    name: 'Hanami',
    description: 'Tinta sobre papel washi, pétalos de cerezo y viento de otoño. El primer overlay con tema claro.',
    colors: ['#c2627a', '#f5ede0', '#8b6fa3'],
    vibe: 'Japanese Ink & Blossom',
    fonts: 'Noto Serif JP',
  },
  {
    id: 'neon',
    name: 'Neon Reactor',
    description: 'Bordes animados con partículas orbitales, luces viajeras y glitch sutil. Sci-fi futurista.',
    colors: ['#00f0ff', '#b400ff', '#ff00b4'],
    vibe: 'Sci-Fi / Neon',
    fonts: 'Orbitron',
  },
  {
    id: 'retro',
    name: 'Arcade Fighter',
    description: 'Estética arcade de pelea. Bordes angulares, barra de HP, chispas de impacto y efectos CRT.',
    colors: ['#ff2020', '#ffe600', '#00aaff'],
    vibe: 'Arcade / Fighter',
    fonts: 'Press Start 2P',
  },
  {
    id: 'gacha',
    name: 'Dark Conquest',
    description: 'Estética medieval oscura con piedra, oro, runas y escudos de facción. Fantasy épico.',
    colors: ['#c8a84e', '#3a3028', '#8b0000'],
    vibe: 'Medieval / Dark Fantasy',
    fonts: 'MedievalSharp',
  },
  {
    id: 'pro',
    name: 'Pro League',
    description: 'Estética broadcast deportivo. Líneas limpias, colores vibrantes y tipografía bold. Como la TV.',
    colors: ['#ff0050', '#00e5ff', '#0c0e12'],
    vibe: 'Sports / Broadcast',
    fonts: 'Rajdhani',
  },
  {
    id: 'minimal',
    name: 'Recoil',
    description: 'Estética militar táctica. Acero y rojo, tipografía industrial, HUD minimalista con detalles de mira.',
    colors: ['#e63946', '#5c8aad', '#0c0e12'],
    vibe: 'Tactical / Military',
    fonts: 'Inter',
  },
]
