import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react'
import { PACKS } from '../data/packs'
import { STYLES } from '../data/styles'
import PackCard from '../components/PackCard'
import type { OverlayStyle, ProductCategory } from '../types'

const CATEGORIES: { id: ProductCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'Todo' },
  { id: 'pack', label: 'Packs completos' },
  { id: 'camera-frame', label: 'Marcos de cámara' },
  { id: 'chat-theme', label: 'Temas de chat' },
]

const CATEGORY_INFO: Record<ProductCategory, { title: string; subtitle: string }> = {
  'pack': {
    title: 'Packs de Overlays',
    subtitle: 'Cada pack incluye módulos separados, listos para arrastrar a OBS.',
  },
  'camera-frame': {
    title: 'Marcos de Cámara',
    subtitle: 'Marcos individuales para tu webcam. Browser Source listo para OBS.',
  },
  'chat-theme': {
    title: 'Temas de Chat',
    subtitle: 'Cajas de chat animadas para OBS. Browser Source listo para usar con Twitch.',
  },
}

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') as ProductCategory | null
  const initialStyle = searchParams.get('style') as OverlayStyle | null

  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>(initialCategory ?? 'all')
  const [activeStyle, setActiveStyle] = useState<OverlayStyle | 'all'>(initialStyle ?? 'all')
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cat = searchParams.get('category') as ProductCategory | null
    const sty = searchParams.get('style') as OverlayStyle | null
    if (cat) setActiveCategory(cat)
    if (sty) setActiveStyle(sty)
  }, [searchParams])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const filtered = PACKS.filter((p) => {
    if (activeCategory !== 'all' && p.category !== activeCategory) return false
    if (activeStyle !== 'all' && p.style !== activeStyle) return false
    return true
  })

  function updateParams(category: ProductCategory | 'all', style: OverlayStyle | 'all') {
    const params: Record<string, string> = {}
    if (category !== 'all') params.category = category
    if (style !== 'all') params.style = style
    setSearchParams(params)
  }

  function selectCategory(cat: ProductCategory | 'all') {
    setActiveCategory(cat)
    updateParams(cat, activeStyle)
  }

  function selectStyle(style: OverlayStyle | 'all') {
    setActiveStyle(style)
    updateParams(activeCategory, style)
  }

  function clearFilters() {
    setActiveCategory('all')
    setActiveStyle('all')
    setSearchParams({})
  }

  const hasFilters = activeCategory !== 'all' || activeStyle !== 'all'
  const activeStyleInfo = STYLES.find((s) => s.id === activeStyle)

  const filterLabel = [
    activeCategory !== 'all' ? CATEGORIES.find((c) => c.id === activeCategory)?.label : null,
    activeStyle !== 'all' ? activeStyleInfo?.name : null,
  ].filter(Boolean).join(' · ') || 'Filtros'

  const info = activeCategory !== 'all'
    ? CATEGORY_INFO[activeCategory]
    : { title: 'Catálogo', subtitle: 'Todos los productos para tu stream.' }

  return (
    <>
    <Helmet>
      <title>Catálogo de Overlays para OBS | StreamLayer by El Novato</title>
      <meta name="description" content="Explorá todos los overlays para streamers: packs completos, marcos de cámara y temas de chat. Browser Sources HTML/CSS/JS listos para instalar en OBS." />
      <link rel="canonical" href="https://streamlayer-two.vercel.app/catalog" />
      <meta property="og:title" content="Catálogo de Overlays para OBS | StreamLayer" />
      <meta property="og:description" content="Packs completos, marcos de cámara y temas de chat para streamers. Listos para OBS, sin diseño previo." />
      <meta property="og:url" content="https://streamlayer-two.vercel.app/catalog" />
    </Helmet>
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold sm:text-4xl">{info.title}</h1>
          <p className="mt-2 text-surface-400">{info.subtitle}</p>
        </div>

        {/* Filter button */}
        <div ref={dropdownRef} className="relative shrink-0">
          <button
            onClick={() => setOpen((v) => !v)}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
              hasFilters
                ? 'border-primary-500/50 bg-primary-600/20 text-primary-300'
                : 'border-surface-700 bg-surface-800 text-surface-300 hover:bg-surface-700'
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="max-w-[140px] truncate">{filterLabel}</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>

          {open && (
            <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-surface-700 bg-surface-900 p-4 shadow-xl">
              {/* Category */}
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-500">Categoría</p>
              <div className="mb-4 flex flex-col gap-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => selectCategory(cat.id)}
                    className={`cursor-pointer rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      activeCategory === cat.id
                        ? 'bg-primary-600 text-white'
                        : 'text-surface-300 hover:bg-surface-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Style */}
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-500">Estilo</p>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => selectStyle('all')}
                  className={`cursor-pointer rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    activeStyle === 'all'
                      ? 'bg-primary-600 text-white'
                      : 'text-surface-300 hover:bg-surface-800'
                  }`}
                >
                  Todos los estilos
                </button>
                {STYLES.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => selectStyle(style.id)}
                    className={`cursor-pointer rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      activeStyle === style.id
                        ? 'bg-primary-600 text-white'
                        : 'text-surface-300 hover:bg-surface-800'
                    }`}
                  >
                    {style.name}
                  </button>
                ))}
              </div>

              {/* Clear */}
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-4 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-surface-700 py-2 text-xs text-surface-400 transition-colors hover:border-surface-600 hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                  Limpiar filtros
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((pack) => (
          <PackCard key={pack.id} pack={pack} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center text-surface-500">
          No hay productos para este filtro todavía. Pronto agregamos más.
        </div>
      )}
    </div>
    </>
  )
}
