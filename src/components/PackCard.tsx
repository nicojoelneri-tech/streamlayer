import { Link } from 'react-router-dom'
import { ShoppingCart, Eye } from 'lucide-react'
import type { OverlayPack } from '../types'
import { useStore } from '../store/useStore'
import { STYLES } from '../data/styles'
import { formatPrice } from '../utils/formatPrice'
import LivePreview from './LivePreview'

export default function PackCard({ pack }: { pack: OverlayPack }) {
  const addToCart = useStore((s) => s.addToCart)
  const cart = useStore((s) => s.cart)
  const inCart = cart.includes(pack.id)
  const styleInfo = STYLES.find((s) => s.id === pack.style)

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-surface-800 bg-surface-900/50 transition-all hover:border-surface-600 hover:shadow-lg hover:shadow-primary-900/20">
      {/* Preview area */}
      <div
        className="relative overflow-hidden bg-surface-900"
        style={{ aspectRatio: pack.previewUrl ? undefined : '16/9' }}
      >
        {pack.previewUrl ? (
          <LivePreview
            src={pack.previewUrl}
            title={pack.name}
            nativeWidth={pack.previewSize?.[0] ?? (pack.category === 'camera-frame' ? 420 : 1920)}
            nativeHeight={pack.previewSize?.[1] ?? (pack.category === 'camera-frame' ? 320 : 1080)}
          />
        ) : pack.previewImages?.[0] ? (
          <img
            src={pack.previewImages[0]}
            alt={pack.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <>
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${pack.previewColors[0]}20, ${pack.previewColors[1]}30, ${pack.previewColors[2]}20)`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex gap-2">
                {pack.previewColors.map((color, i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border border-white/20"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {pack.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-primary-600 px-2.5 py-0.5 text-[11px] font-semibold text-white">
            {pack.tag}
          </span>
        )}

        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-surface-950/60 opacity-0 transition-opacity group-hover:opacity-100">
          <Link
            to={`/pack/${pack.id}`}
            className="rounded-lg bg-white/10 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-white/20 no-underline"
          >
            <Eye className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{
                backgroundColor: `${pack.previewColors[0]}20`,
                color: pack.previewColors[0],
              }}
            >
              {styleInfo?.name}
            </span>
            {pack.category === 'pack' ? (
              <span className="text-[11px] text-surface-500">{pack.modules.length} módulos</span>
            ) : (
              <span className="text-[11px] text-surface-500">Marco individual</span>
            )}
          </div>
          <h3 className="text-base font-semibold text-white">{pack.name}</h3>
          <p className="mt-1 text-xs text-surface-400 line-clamp-2">{pack.description}</p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            {pack.price > 0 ? (
              <>
                <span className="text-lg font-bold text-white">{formatPrice(pack.price)}</span>
                {pack.originalPrice && (
                  <span className="text-sm text-surface-500 line-through">
                    {formatPrice(pack.originalPrice)}
                  </span>
                )}
              </>
            ) : (
              <span className="text-sm font-medium text-primary-400">Próximamente</span>
            )}
          </div>
          {pack.price > 0 ? (
            <button
              onClick={() => addToCart(pack.id)}
              disabled={inCart}
              className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                inCart
                  ? 'bg-success/20 text-success cursor-default'
                  : 'bg-primary-600 text-white hover:bg-primary-500 cursor-pointer'
              }`}
            >
              {inCart ? (
                'Agregado'
              ) : (
                <span className="flex items-center gap-1.5">
                  <ShoppingCart className="h-3.5 w-3.5" />
                  Agregar
                </span>
              )}
            </button>
          ) : (
            <span className="rounded-lg bg-surface-800 px-3 py-2 text-xs font-medium text-surface-500">
              Pronto
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
