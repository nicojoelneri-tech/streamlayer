# StreamLayer — Overlays modulares para streamers

Plataforma web para vender overlays modulares y profesionales para OBS. El streamer elige un estilo, selecciona módulos y descarga un paquete listo para usar.

## Quick start

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`

## Qué hace

- **Home**: Landing con propuesta de valor, estilos y packs destacados
- **Catálogo**: Grid de packs con filtros por estilo visual
- **Constructor**: Armá tu overlay personalizado — estilo, módulos, colores y nombre
- **Preview en vivo**: Visualización del overlay mientras lo configurás
- **Detalle de pack**: Vista completa con módulos incluidos
- **Checkout**: Carrito + compra simulada + descarga placeholder

## Stack

| Tech | Uso |
|------|-----|
| React 18 + TypeScript | UI |
| Vite | Build |
| Tailwind CSS v4 | Estilos |
| Zustand | Estado global |
| React Router | Navegación |
| Lucide React | Iconos |

## Estructura

```
src/
├── types/          # Tipos del dominio
├── data/           # Packs, módulos, estilos (datos estáticos)
├── store/          # Zustand store
├── components/     # Componentes reutilizables
└── pages/          # Páginas/rutas
```

## Concepto de producto

Los overlays son **modulares**: cada componente (cámara, chat, alertas, paneles, escenas) se entrega como archivo separado. El cliente usa solo lo que necesita.

**5 estilos base:** Minimal, Neon Glow, Gacha/Anime, Retro Pixel, Pro Esports

**8 módulos:** Marco de cámara, Chat, Alertas, Paneles, Starting Soon, BRB, Ending, Labels

## Próximos pasos

- [ ] Assets visuales reales para cada estilo
- [ ] Integración de pagos (Mercado Pago / Stripe)
- [ ] Generación automática de overlays con IA
- [ ] Cuentas de usuario
- [ ] Panel admin
- [ ] Analytics
