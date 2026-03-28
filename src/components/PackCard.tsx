import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Eye, CreditCard } from 'lucide-react'
import type { OverlayPack } from '../types'
import { useStore } from '../store/useStore'
import { STYLES } from '../data/styles'
import { formatPrice } from '../utils/formatPrice'
import { useCurrency } from '../hooks/useCurrency'
import LivePreview from './LivePreview'
import PayhipButton from './PayhipButton'

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint)
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [breakpoint])
  return isMobile
}

export default function PackCard({ pack }: { pack: OverlayPack }) {
  const addToCart = useStore((s) => s.addToCart)
  const cart = useStore((s) => s.cart)
  const inCart = cart.includes(pack.id)
  const styleInfo = STYLES.find((s) => s.id === pack.style)
  const isMobile = useIsMobile()
  const { code, rate, loading: currencyLoading } = useCurrency()

  const showLivePreview = !isMobile && !!pack.previewUrl

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-surface-800 bg-surface-900/50 transition-all hover:border-surface-600 hover:shadow-lg hover:shadow-primary-900/20">
      {/* Preview area */}
      <div
        className="relative overflow-hidden bg-surface-900"
        style={{ aspectRatio: showLivePreview ? undefined : '16/9' }}
      >
        {showLivePreview ? (
          <LivePreview
            src={pack.previewUrl!}
            title={pack.name}
            nativeWidth={pack.previewSize?.[0] ?? (pack.category === 'camera-frame' ? 420 : 1920)}
            nativeHeight={pack.previewSize?.[1] ?? (pack.category === 'camera-frame' ? 320 : 1080)}
            cropX={pack.previewCrop?.[0]}
            cropY={pack.previewCrop?.[1]}
            cropWidth={pack.previewCrop?.[2]}
            cropHeight={pack.previewCrop?.[3]}
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
            ) : pack.category === 'chat-theme' ? (
              <span className="text-[11px] text-surface-500">Tema de chat</span>
            ) : (
              <span className="text-[11px] text-surface-500">Marco individual</span>
            )}
            {pack.tag && (
              <span className="rounded-full bg-primary-600/20 px-2 py-0.5 text-[10px] font-semibold text-primary-400">
                {pack.tag}
              </span>
            )}
          </div>
          <h3 className="text-base font-semibold text-white">{pack.name}</h3>
          <p className="mt-1 text-xs text-surface-400 line-clamp-2">{pack.description}</p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            {pack.price > 0 ? (
              <>
                <span className={`text-lg font-bold text-white transition-opacity ${currencyLoading ? 'opacity-40' : ''}`}>
                  {formatPrice(pack.price, code, rate)}
                </span>
                {pack.originalPrice && (
                  <span className="text-sm text-surface-500 line-through">
                    {formatPrice(pack.originalPrice, code, rate)}
                  </span>
                )}
              </>
            ) : (
              <span className="text-sm font-medium text-primary-400">Próximamente</span>
            )}
          </div>
          {pack.price > 0 ? (
            pack.buyUrl ? (
              <PayhipButton
                url={pack.buyUrl}
                className="flex items-center gap-1.5 rounded-lg bg-primary-600 px-3 py-2 text-xs font-medium text-white no-underline transition-colors hover:bg-primary-500"
              >
                <CreditCard className="h-3.5 w-3.5" />
                Comprar
              </PayhipButton>
            ) : (
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
            )
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
