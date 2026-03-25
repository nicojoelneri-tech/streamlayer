import { Link } from 'react-router-dom'
import { Zap, Puzzle, Download, Monitor, ArrowRight, Code, Settings, Camera } from 'lucide-react'
import { PACKS } from '../data/packs'
import { STYLES } from '../data/styles'
import PackCard from '../components/PackCard'
import elNovatoLogo from '../assets/elnovato-logo.png'

const FEATURES = [
  {
    icon: Puzzle,
    title: 'Modular de verdad',
    desc: 'Cada módulo es un archivo separado. Usá cámara, chat, alertas, HUD — lo que quieras, como quieras.',
  },
  {
    icon: Code,
    title: 'Browser Sources, no PNGs',
    desc: 'HTML/CSS/JS animado. No son imágenes estáticas — son overlays vivos con animaciones reales.',
  },
  {
    icon: Settings,
    title: 'Config sin diseño',
    desc: 'Editá un solo archivo para cambiar nombre, colores y textos. Sin Photoshop, sin After Effects.',
  },
  {
    icon: Monitor,
    title: 'Manual + StreamElements',
    desc: 'Funciona como archivo local en OBS o integrado con StreamElements para eventos en tiempo real.',
  },
  {
    icon: Zap,
    title: 'Presets listos',
    desc: 'Escenas completas armadas: gameplay, starting, BRB, ending. Arrastrás a OBS y sale andando.',
  },
  {
    icon: Download,
    title: 'Descarga directa',
    desc: 'Comprás y descargás el ZIP al instante. Cada módulo en su carpeta, con README incluido.',
  },
]

export default function Home() {
  const featuredPacks = PACKS.filter((p) => p.featured && p.category === 'pack')
  const featuredFrames = PACKS.filter((p) => p.featured && p.category === 'camera-frame')

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-surface-950 to-surface-950" />
        <div className="absolute inset-0">
          <div className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-primary-600/10 blur-[100px]" />
          <div className="absolute -right-32 top-20 h-72 w-72 rounded-full bg-accent/10 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-24 text-center sm:pt-32">
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-sm text-primary-300">
            <img src={elNovatoLogo} alt="El Novato" className="h-5 w-auto" />
            Overlays by El Novato
          </div>

          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Dejá tu stream{' '}
            <span className="bg-gradient-to-r from-primary-400 to-accent bg-clip-text text-transparent">
              listo en minutos
            </span>
            , sin volverte loco con OBS
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-surface-400">
            Packs de overlays, marcos de cámara y más. Elegí tu estilo, comprá
            y descargá todo listo para usar en OBS.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-500 no-underline"
            >
              Ver catálogo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-2 text-center text-2xl font-bold sm:text-3xl">Qué vendemos</h2>
        <p className="mb-10 text-center text-surface-400">
          Todo lo que necesitás para darle identidad visual a tu stream.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            to="/catalog?category=pack"
            className="group flex items-center gap-5 rounded-xl border border-surface-800 bg-surface-900/50 p-6 transition-all hover:border-primary-500/40 hover:bg-surface-900 no-underline"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary-600/20 text-primary-400 transition-colors group-hover:bg-primary-600/30">
              <Puzzle className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Packs completos</h3>
              <p className="mt-1 text-sm text-surface-400">
                Overlay entero con cámara, chat, alertas, HUD, pantallas y más. Todo coordinado.
              </p>
            </div>
            <ArrowRight className="ml-auto h-5 w-5 shrink-0 text-surface-600 transition-colors group-hover:text-primary-400" />
          </Link>

          <Link
            to="/catalog?category=camera-frame"
            className="group flex items-center gap-5 rounded-xl border border-surface-800 bg-surface-900/50 p-6 transition-all hover:border-primary-500/40 hover:bg-surface-900 no-underline"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary-600/20 text-primary-400 transition-colors group-hover:bg-primary-600/30">
              <Camera className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Marcos de cámara</h3>
              <p className="mt-1 text-sm text-surface-400">
                Marco individual para tu webcam. Ideal si ya tenés overlay y solo querés el marco.
              </p>
            </div>
            <ArrowRight className="ml-auto h-5 w-5 shrink-0 text-surface-600 transition-colors group-hover:text-primary-400" />
          </Link>
        </div>
      </section>

      {/* Styles showcase */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-2 text-center text-2xl font-bold sm:text-3xl">Elegí tu estilo</h2>
        <p className="mb-10 text-center text-surface-400">
          Cada estilo tiene una identidad visual única pensada para diferentes tipos de stream.
        </p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {STYLES.map((style) => (
            <Link
              key={style.id}
              to={`/catalog?style=${style.id}`}
              className="group flex flex-col items-center gap-3 rounded-xl border border-surface-800 bg-surface-900/50 p-4 text-center transition-all hover:border-surface-600 no-underline"
            >
              <div className="flex gap-1.5">
                {style.colors.map((color, i) => (
                  <div
                    key={i}
                    className="h-6 w-6 rounded-full border border-white/10 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{style.name}</div>
                <div className="mt-0.5 text-[11px] text-surface-500">{style.vibe}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-surface-800 bg-surface-900/30">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-10 text-center text-2xl font-bold sm:text-3xl">
            Simple de verdad
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-xl border border-surface-800 bg-surface-900/50 p-5">
                <f.icon className="mb-3 h-8 w-8 text-primary-400" />
                <h3 className="mb-1 font-semibold text-white">{f.title}</h3>
                <p className="text-sm text-surface-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured packs */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Packs destacados</h2>
            <p className="mt-1 text-surface-400">Los más elegidos por la comunidad.</p>
          </div>
          <Link
            to="/catalog?category=pack"
            className="hidden items-center gap-1 text-sm font-medium text-primary-400 hover:text-primary-300 no-underline sm:flex"
          >
            Ver todos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredPacks.map((pack) => (
            <PackCard key={pack.id} pack={pack} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/catalog?category=pack"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary-400 no-underline"
          >
            Ver todos los packs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Featured frames */}
      {featuredFrames.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Marcos de cámara</h2>
              <p className="mt-1 text-surface-400">Marco individual para tu webcam, listo para OBS.</p>
            </div>
            <Link
              to="/catalog?category=camera-frame"
              className="hidden items-center gap-1 text-sm font-medium text-primary-400 hover:text-primary-300 no-underline sm:flex"
            >
              Ver todos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredFrames.map((frame) => (
              <PackCard key={frame.id} pack={frame} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/catalog?category=camera-frame"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary-400 no-underline"
            >
              Ver todos los marcos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="rounded-2xl border border-primary-500/20 bg-gradient-to-br from-primary-900/30 to-surface-900 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">
            No sabés diseñar? No importa.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-surface-400">
            Creado por un novato que se cansó de configurar OBS.
            Elegí lo que necesites, comprá y descargá todo listo para usar.
          </p>
          <Link
            to="/catalog"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-primary-500 no-underline"
          >
            Ver catálogo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
