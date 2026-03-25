# CLAUDE.md — StreamLayer by El Novato

## Objetivo del producto

Tienda web para vender packs de overlays y recursos individuales para streamers, pensada para OBS.
El usuario navega el catálogo, elige un pack o recurso individual, compra y descarga un ZIP listo para usar.

Marca: **StreamLayer by El Novato**
Mensaje principal: "Dejá tu stream listo en minutos, sin volverte loco con OBS."

## Qué se vende realmente

**NO son imágenes PNG estáticas.** Son packs de **Browser Sources** (HTML/CSS/JS) que funcionan como "Fuente de navegador" en OBS:
- Cada módulo es un archivo `.html` independiente con sus estilos y animaciones
- Un archivo `config.js` centralizado permite editar nombre del canal, colores, textos
- Dos modos: **manual** (archivo local en OBS) y **StreamElements** (eventos en tiempo real)
- Los presets son escenas completas (gameplay, starting, brb, ending) con módulos integrados

### Estructura de un pack entregado (ZIP)
```
pack_name/
├── modules/manual/            → Módulos individuales (.html)
├── modules/streamelements/    → Módulos para StreamElements
├── presets/manual/            → Escenas completas listas
├── presets/streamelements/    → Presets para StreamElements
├── config/manual/config.js    → Datos editables
├── config/manual/manual.js    → Lector del config
├── config/streamelements/se.js → Script eventos SE
├── assets_shared.css          → Estilos compartidos
└── docs/README.txt            → Instrucciones paso a paso
```

### Referencia de diseño
El pack de referencia es **Aurora Grid** (estilo cyberpunk/sci-fi) en `docs/aurora_grid_modular_pack/`.

## Stack técnico

- **Framework:** React 18 + TypeScript
- **Build tool:** Vite
- **Estilos:** Tailwind CSS v4
- **Estado global:** Zustand
- **Routing:** React Router DOM
- **Iconos:** Lucide React
- **Sin backend** — todo client-side
- **Deploy target:** Vercel

## Comandos

```bash
npm run dev      # desarrollo local
npm run build    # build de producción
npm run preview  # preview del build
```

## Arquitectura del sistema

```
src/
├── App.tsx              # Router principal
├── main.tsx             # Entry point
├── index.css            # Tailwind + theme custom
├── types/index.ts       # Tipos TypeScript del dominio
├── data/
│   ├── packs.ts         # Catálogo de productos (packs + marcos de cámara)
│   ├── modules.ts       # Definición de módulos disponibles
│   └── styles.ts        # Estilos visuales (minimal, neon, gacha, etc.)
├── store/
│   └── useStore.ts      # Zustand store (carrito)
├── components/
│   ├── Header.tsx        # Navegación + carrito + logo El Novato
│   ├── Footer.tsx        # Footer + redes sociales + logo El Novato
│   ├── Layout.tsx        # Layout con Outlet
│   ├── PackCard.tsx      # Card de pack para grids
│   └── OverlayPreview.tsx # Preview visual tipo HUD real
└── pages/
    ├── Home.tsx          # Landing con hero, features, packs destacados
    ├── Catalog.tsx       # Catálogo con filtros por estilo
    ├── PackDetail.tsx    # Detalle + instrucciones de uso
    └── Checkout.tsx      # Checkout + estructura ZIP + descarga
```

## Flujo del usuario

```
Home → Catálogo (filtrar por categoría + estilo) → Detalle del producto → Agregar al carrito → Checkout → Descarga ZIP
```

## Entidades del dominio

- **OverlayStyle**: minimal | neon | gacha | retro | pro | hacker | japanese
- **ProductCategory**: pack | camera-frame
- **ModuleType**: camera | chat | alerts | panels | starting | brb | ending | labels
- **OverlayModule**: definición de módulo (id, nombre, descripción)
- **OverlayPack**: producto con categoría, estilo, módulos incluidos y precio

## Módulos del overlay

| ID | Nombre | Qué es |
|----|--------|--------|
| camera | Marco de Cámara | Browser Source con marco + guías de encuadre |
| chat | Caja de Chat | Panel visual con mensajes estilizados |
| alerts | Alert Box | Alertas animadas (follow/sub/tip/raid) |
| panels | Event Panel | Panel lateral con eventos recientes |
| starting | Starting Soon | Escena pre-stream |
| brb | BRB Screen | Escena de pausa |
| ending | Ending Screen | Escena de cierre |
| labels | HUD & Ticker | Barra superior + ticker animado inferior |

## Redes sociales El Novato

- Instagram: instagram.com/elnovato.nn
- Twitch: twitch.tv/elnovato_nn
- TikTok: tiktok.com/@elnovato.nn

## Reglas de arquitectura

- Los módulos del overlay son SIEMPRE independientes. Nunca fusionar.
- El producto entregado son Browser Sources HTML/CSS/JS, NO imágenes estáticas.
- Dual-mode: cada pack tiene versión manual y StreamElements.
- Config centralizado en un solo archivo JS editable.
- Mobile-first en la web de venta.
- Preferir MVP vendible antes que arquitectura perfecta.
- Sin backend por ahora — todo client-side.
- NO hay builder/constructor — solo venta de packs pre-hechos.

## Criterios de diseño

- Fondo oscuro (surface-950), acentos violeta (primary-600)
- Tipografía Inter, limpia y moderna
- Orientado a streamers nuevos o intermedios
- Transmitir facilidad, personalización y look profesional
- Sin jerga técnica excesiva en la UI
- Logo de El Novato presente en header, hero y footer

## Precios

- Formato en centavos (ej: 4990 = $49.90)
- Formato display: Pesos argentinos con 2 decimales
- Rango: $49.90 (starter) a $99.90 (pro full)

## Pagos — contexto Argentina

- Stripe NO opera en Argentina para cuentas estándar
- Alternativa principal: Mercado Pago (Checkout API / Checkout Pro)
- El MVP usa checkout placeholder, listo para integrar MP

## Próximos pasos

1. Assets visuales reales para cada estilo (CSS de los overlays)
2. Integración Mercado Pago como pasarela de pago
3. Generación de ZIP real con la estructura de pack
4. Freemium: 1 estilo gratuito con export limitado
5. Animaciones premium (.webm) como add-on
6. Scene collections / installer para OBS
7. Analytics y tracking de conversión
