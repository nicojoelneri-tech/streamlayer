import type { OverlayModule } from '../types'

export const ALL_MODULES: OverlayModule[] = [
  {
    id: 'camera',
    name: 'Marco de Cámara',
    description: 'Browser Source con marco estilizado para tu webcam. Incluye animaciones y guías de encuadre.',
    included: true,
  },
  {
    id: 'chat',
    name: 'Caja de Chat',
    description: 'Panel visual para el chat con mensajes estilizados. Compatible con modo manual y StreamElements.',
    included: true,
  },
  {
    id: 'alerts',
    name: 'Alert Box',
    description: 'Alertas animadas para follows, subs, donaciones y raids con entrada/salida suave.',
    included: true,
  },
  {
    id: 'panels',
    name: 'Event Panel',
    description: 'Panel lateral con últimos follows, subs y donaciones. Se actualiza en tiempo real.',
    included: true,
  },
  {
    id: 'starting',
    name: 'Starting Soon',
    description: 'Escena completa de "ya empezamos" con tu nombre de canal y chips de estado.',
    included: true,
  },
  {
    id: 'brb',
    name: 'BRB Screen',
    description: 'Escena de pausa con tu branding. Ideal para cortes sin perder audiencia.',
    included: false,
  },
  {
    id: 'ending',
    name: 'Ending Screen',
    description: 'Escena de cierre con agradecimiento y branding de tu canal.',
    included: false,
  },
  {
    id: 'labels',
    name: 'HUD & Ticker',
    description: 'Barra superior con viewers, uptime, subs y ticker animado con eventos del stream.',
    included: false,
  },
]
