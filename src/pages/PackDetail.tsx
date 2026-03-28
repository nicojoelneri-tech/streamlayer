import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingCart, ArrowLeft, Check, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { PACKS } from '../data/packs'
import { STYLES } from '../data/styles'
import { ALL_MODULES } from '../data/modules'
import { useStore } from '../store/useStore'
import { formatPrice } from '../utils/formatPrice'
import { useCurrency } from '../hooks/useCurrency'
import LivePreview from '../components/LivePreview'
import OverlayPreview from '../components/OverlayPreview'
import PayhipButton from '../components/PayhipButton'

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

export default function PackDetail() {
  const { id } = useParams<{ id: string }>()
  const pack = PACKS.find((p) => p.id === id)
  const addToCart = useStore((s) => s.addToCart)
  const cart = useStore((s) => s.cart)
  const isMobile = useIsMobile()
  const { code, rate, loading: currencyLoading } = useCurrency()
  const [activeImage, setActiveImage] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [previewFullscreen, setPreviewFullscreen] = useState(false)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPreviewFullscreen(false)
        setLightboxOpen(false)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  if (!pack) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Producto no encontrado</h1>
        <Link to="/catalog" className="mt-4 inline-block text-primary-400 no-underline">
          Volver al catálogo
        </Link>
      </div>
    )
  }

  const styleInfo = STYLES.find((s) => s.id === pack.style)
  const inCart = cart.includes(pack.id)
  const isPack = pack.category === 'pack'
  const isFrame = pack.category === 'camera-frame'

  const openLightbox = (index: number) => {
    setActiveImage(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => setLightboxOpen(false)

  const prevImage = () => {
    if (!pack.previewImages) return
    setActiveImage((prev) => (prev - 1 + pack.previewImages!.length) % pack.previewImages!.length)
  }

  const nextImage = () => {
    if (!pack.previewImages) return
    setActiveImage((prev) => (prev + 1) % pack.previewImages!.length)
  }

  const backLink = isFrame ? '/catalog?category=camera-frame' : '/catalog?category=pack'
  const backLabel = isFrame ? 'Volver a marcos' : 'Volver al catálogo'

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Link
        to={backLink}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-surface-400 hover:text-white no-underline"
      >
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Preview */}
        <div>
          {pack.previewUrl && !(isMobile && isPack) ? (
            <>
              <div className="overflow-hidden rounded-xl border border-surface-700">
                <LivePreview
                  src={pack.previewUrl}
                  title={`${pack.name} preview`}
                  nativeWidth={pack.previewSize?.[0] ?? (isFrame ? 420 : 1920)}
                  nativeHeight={pack.previewSize?.[1] ?? (isFrame ? 320 : 1080)}
                  fit={isFrame ? 'contain' : 'width'}
                  interactive
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-success" />
                  <span className="text-xs text-surface-400">Preview en vivo — así se ve en OBS</span>
                </div>
                <button
                  onClick={() => setPreviewFullscreen(true)}
                  className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-surface-800 px-3 py-1.5 text-xs font-medium text-surface-300 transition-colors hover:bg-surface-700 hover:text-white"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  Pantalla completa
                </button>
              </div>
            </>
          ) : pack.previewImages && pack.previewImages.length > 0 ? (
            <>
              <div
                className="group relative cursor-pointer overflow-hidden rounded-xl border border-surface-700"
                onClick={() => openLightbox(activeImage)}
              >
                <img
                  src={pack.previewImages[activeImage]}
                  alt={`${pack.name} preview`}
                  className="aspect-video w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-surface-950/0 transition-colors group-hover:bg-surface-950/40">
                  <Maximize2 className="h-8 w-8 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </div>
              {pack.previewImages.length > 1 && (
                <div className="mt-3 flex gap-2">
                  {pack.previewImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`cursor-pointer overflow-hidden rounded-lg border-2 transition-all ${
                        i === activeImage
                          ? 'border-primary-500'
                          : 'border-surface-700 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Vista ${i + 1}`} className="h-16 w-28 object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <OverlayPreview
                modules={pack.modules}
                primaryColor={pack.previewColors[0]}
                secondaryColor={pack.previewColors[1] ?? pack.previewColors[0]}
                channelName=""
              />
              <div className="mt-4 flex gap-2">
                {pack.previewColors.map((color, i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border border-surface-600"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-3">
            {pack.tag && (
              <span className="rounded-full bg-primary-600 px-3 py-0.5 text-xs font-semibold text-white">
                {pack.tag}
              </span>
            )}
            <span className="rounded-full bg-surface-800 px-3 py-0.5 text-xs font-medium text-surface-300">
              {styleInfo?.name}
            </span>
            <span className="rounded-full bg-surface-800 px-3 py-0.5 text-xs font-medium text-surface-300">
              {isFrame ? 'Marco de cámara' : 'Pack completo'}
            </span>
          </div>

          <h1 className="mt-3 text-3xl font-bold">{pack.name}</h1>
          <p className="mt-2 text-surface-400">{pack.description}</p>

          <div className="mt-6 flex items-baseline gap-3">
            {pack.price > 0 ? (
              <>
                <span className={`text-3xl font-bold text-white transition-opacity ${currencyLoading ? 'opacity-40' : ''}`}>
                  {formatPrice(pack.price, code, rate)}
                </span>
                {pack.originalPrice && (
                  <span className="text-lg text-surface-500 line-through">
                    {formatPrice(pack.originalPrice, code, rate)}
                  </span>
                )}
                {!currencyLoading && code !== 'USD' && (
                  <span className="text-sm text-surface-500">
                    (USD {formatPrice(pack.price, 'USD', 1)})
                  </span>
                )}
              </>
            ) : (
              <span className="text-xl font-semibold text-primary-400">Precio próximamente</span>
            )}
          </div>

          {pack.price > 0 ? (
            pack.buyUrl ? (
              <PayhipButton
                url={pack.buyUrl}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-base font-semibold text-white no-underline transition-colors bg-primary-600 hover:bg-primary-500 sm:w-auto sm:px-8"
              >
                <ShoppingCart className="h-5 w-5" />
                Comprar ahora
              </PayhipButton>
            ) : (
              <button
                onClick={() => addToCart(pack.id)}
                disabled={inCart}
                className={`mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3.5 text-base font-semibold transition-colors sm:w-auto sm:px-8 ${
                  inCart
                    ? 'bg-success/20 text-success'
                    : 'bg-primary-600 text-white hover:bg-primary-500'
                }`}
              >
                {inCart ? (
                  <>
                    <Check className="h-5 w-5" />
                    En el carrito
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    Agregar al carrito
                  </>
                )}
              </button>
            )
          ) : (
            <div className="mt-6 rounded-xl border border-surface-700 bg-surface-800/50 px-6 py-3.5 text-center text-sm text-surface-400">
              Disponible próximamente
            </div>
          )}

          {/* Modules included — only for packs */}
          {isPack && (
            <div className="mt-8">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-surface-300">
                Módulos incluidos ({pack.modules.length})
              </h3>
              <div className="space-y-2">
                {pack.modules.map((modId) => {
                  const mod = ALL_MODULES.find((m) => m.id === modId)
                  if (!mod) return null
                  return (
                    <div
                      key={modId}
                      className="flex items-center gap-3 rounded-lg border border-surface-800 bg-surface-900/50 px-4 py-3"
                    >
                      <Check className="h-4 w-4 shrink-0 text-success" />
                      <div>
                        <div className="text-sm font-medium text-white">{mod.name}</div>
                        <div className="text-xs text-surface-500">{mod.description}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* What you get */}
          <div className="mt-8 rounded-xl border border-surface-700 bg-surface-900/50 p-5">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-surface-300">
              Qué recibís
            </h3>
            <ul className="space-y-2 text-sm text-surface-300">
              {isPack ? (
                <>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary-400" />
                    Browser Sources HTML/CSS/JS para OBS (no imágenes estáticas)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary-400" />
                    Cada módulo en archivo separado — usá solo lo que necesites
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary-400" />
                    Presets listos por escena (gameplay, starting, BRB, ending)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary-400" />
                    Config editable con Bloc de notas (nombre, colores, textos)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary-400" />
                    Modo manual + compatible con StreamElements
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary-400" />
                    Resolución 1920x1080 con animaciones CSS
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary-400" />
                    README con instrucciones paso a paso
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary-400" />
                    Archivo HTML listo para usar como Browser Source en OBS
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary-400" />
                    Animaciones CSS integradas (no es una imagen estática)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary-400" />
                    Config editable (colores, nombre del canal)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary-400" />
                    Resolución 1920x1080
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary-400" />
                    Instrucciones de instalación incluidas
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Installation */}
          <div className="mt-6 rounded-xl border border-surface-700 bg-surface-900/50 p-5">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-surface-300">
              {isFrame ? 'Cómo usarlo' : 'Instalación manual (archivo local)'}
            </h3>
            <ol className="space-y-3 text-sm text-surface-300">
              {isFrame ? (
                <>
                  <li className="flex gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white">1</span>
                    <span>Descomprimí el ZIP en tu PC</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white">2</span>
                    <span>En OBS, agregá una "Fuente de navegador"</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white">3</span>
                    <span>Activá "Archivo local" y seleccioná el .html del marco</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white">4</span>
                    <span>Posicioná sobre tu webcam y listo</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white">1</span>
                    <span>Descomprimí el ZIP en tu PC</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white">2</span>
                    <span>En OBS, agregá una "Fuente de navegador" por cada módulo</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white">3</span>
                    <span>Activá "Archivo local" y seleccioná el .html del módulo</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white">4</span>
                    <span>Editá config.js para poner tu nombre, colores y datos</span>
                  </li>
                </>
              )}
            </ol>
          </div>

          {/* StreamElements — only for packs */}
          {isPack && (
            <div className="mt-4 rounded-xl border border-surface-700 bg-surface-900/50 p-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-surface-300">
                Integración con StreamElements
              </h3>
              <p className="text-sm text-surface-400">
                Incluye instrucciones para conectar con StreamElements y mostrar datos en tiempo real:
                follows, subs, donaciones, chat en vivo y más. Tu overlay se actualiza solo mientras streameas.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen live preview */}
      {previewFullscreen && pack.previewUrl && (
        <div className="fixed inset-0 z-50 bg-black">
          <button
            onClick={() => setPreviewFullscreen(false)}
            className="absolute right-4 top-4 z-10 cursor-pointer rounded-lg bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
          <LivePreview
            src={pack.previewUrl}
            title={`${pack.name} fullscreen preview`}
            nativeWidth={isFrame ? 420 : 1920}
            nativeHeight={isFrame ? 320 : 1080}
            className="h-full w-full"
            fit="contain"
            interactive
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
            Presioná <kbd className="mx-1 rounded bg-white/20 px-1.5 py-0.5 text-xs font-mono">ESC</kbd> o la X para salir
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && pack.previewImages && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 cursor-pointer rounded-lg bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>

          {pack.previewImages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prevImage() }}
              className="absolute left-4 z-10 cursor-pointer rounded-lg bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          <img
            src={pack.previewImages[activeImage]}
            alt={`${pack.name} preview`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {pack.previewImages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); nextImage() }}
              className="absolute right-4 z-10 cursor-pointer rounded-lg bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {pack.previewImages.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
              {activeImage + 1} / {pack.previewImages.length}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
