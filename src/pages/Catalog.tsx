import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PACKS } from '../data/packs'
import { STYLES } from '../data/styles'
import PackCard from '../components/PackCard'
import type { OverlayStyle, ProductCategory } from '../types'

const CATEGORIES: { id: ProductCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'Todo' },
  { id: 'pack', label: 'Packs completos' },
  { id: 'camera-frame', label: 'Marcos de cámara' },
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
}

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') as ProductCategory | null
  const initialStyle = searchParams.get('style') as OverlayStyle | null

  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>(initialCategory ?? 'all')
  const [activeStyle, setActiveStyle] = useState<OverlayStyle | 'all'>(initialStyle ?? 'all')

  useEffect(() => {
    const cat = searchParams.get('category') as ProductCategory | null
    const sty = searchParams.get('style') as OverlayStyle | null
    if (cat) setActiveCategory(cat)
    if (sty) setActiveStyle(sty)
  }, [searchParams])

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

  const info = activeCategory !== 'all'
    ? CATEGORY_INFO[activeCategory]
    : { title: 'Catálogo', subtitle: 'Todos los productos para tu stream.' }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold sm:text-4xl">{info.title}</h1>
        <p className="mt-2 text-surface-400">{info.subtitle}</p>
      </div>

      {/* Category filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => selectCategory(cat.id)}
            className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === cat.id
                ? 'bg-primary-600 text-white'
                : 'bg-surface-800 text-surface-300 hover:bg-surface-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Style filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => selectStyle('all')}
          className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            activeStyle === 'all'
              ? 'bg-surface-600 text-white'
              : 'bg-surface-800/60 text-surface-400 hover:bg-surface-700'
          }`}
        >
          Todos los estilos
        </button>
        {STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => selectStyle(style.id)}
            className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              activeStyle === style.id
                ? 'bg-surface-600 text-white'
                : 'bg-surface-800/60 text-surface-400 hover:bg-surface-700'
            }`}
          >
            {style.name}
          </button>
        ))}
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
  )
}
