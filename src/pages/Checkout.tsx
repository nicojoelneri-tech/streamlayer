import { Link } from 'react-router-dom'
import { Trash2, ShoppingCart, ArrowRight, Package, ExternalLink } from 'lucide-react'
import { PACKS } from '../data/packs'
import { useStore } from '../store/useStore'
import { formatPrice } from '../utils/formatPrice'
import { useCurrency } from '../hooks/useCurrency'

export default function Checkout() {
  const cart = useStore((s) => s.cart)
  const removeFromCart = useStore((s) => s.removeFromCart)
  const clearCart = useStore((s) => s.clearCart)
  const { code, rate, loading: currencyLoading } = useCurrency()

  const cartPacks = cart.map((id) => PACKS.find((p) => p.id === id)).filter(Boolean)
  const total = cartPacks.reduce((sum, p) => sum + (p?.price ?? 0), 0)

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <ShoppingCart className="mx-auto mb-4 h-12 w-12 text-surface-600" />
        <h1 className="text-2xl font-bold">Tu carrito está vacío</h1>
        <p className="mt-2 text-surface-400">
          Explorá el catálogo y encontrá el overlay perfecto para tu stream.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            to="/catalog"
            className="rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white no-underline hover:bg-primary-500"
          >
            Ver catálogo
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <p className="mt-2 text-surface-400">
        Revisá tu pedido. Cada producto se paga por separado con tarjeta de crédito o débito.
      </p>

      <div className="mt-8 space-y-3">
        {cartPacks.map((pack) =>
          pack ? (
            <div
              key={pack.id}
              className="flex items-center justify-between rounded-xl border border-surface-800 bg-surface-900/50 p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface-800">
                  <Package className="h-6 w-6 text-surface-400" />
                </div>
                <div>
                  <div className="font-medium text-white">{pack.name}</div>
                  <div className="text-xs text-surface-500">
                    {pack.category === 'pack'
                      ? `${pack.modules.length} módulos`
                      : pack.category === 'chat-theme'
                      ? 'Tema de chat'
                      : 'Marco de cámara'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`font-semibold text-white transition-opacity ${currencyLoading ? 'opacity-40' : ''}`}>
                  {formatPrice(pack.price, code, rate)}
                </span>
                {pack.buyUrl ? (
                  <a
                    href={pack.buyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-lg bg-primary-600 px-3 py-2 text-xs font-semibold text-white no-underline transition-colors hover:bg-primary-500"
                  >
                    Pagar
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <span className="rounded-lg bg-surface-800 px-3 py-2 text-xs text-surface-500">
                    Pronto
                  </span>
                )}
                <button
                  onClick={() => removeFromCart(pack.id)}
                  className="cursor-pointer rounded-lg p-2 text-surface-500 transition-colors hover:bg-surface-800 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : null
        )}
      </div>

      <div className="mt-6 rounded-xl border border-surface-700 bg-surface-900/50 p-5">
        <div className="flex items-center justify-between text-lg font-bold">
          <span>Total estimado</span>
          <span className={`text-primary-400 transition-opacity ${currencyLoading ? 'opacity-40' : ''}`}>
            {formatPrice(total, code, rate)}
          </span>
        </div>
        {!currencyLoading && code !== 'USD' && (
          <p className="mt-1 text-right text-xs text-surface-500">
            ≈ {formatPrice(total, 'USD', 1)} USD · precio final según tu banco
          </p>
        )}
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={clearCart}
          className="cursor-pointer rounded-xl border border-surface-700 bg-surface-800/50 px-4 py-3.5 text-sm text-surface-400 transition-colors hover:bg-surface-700"
        >
          Vaciar carrito
        </button>
        <Link
          to="/catalog"
          className="flex items-center gap-2 rounded-xl border border-surface-700 bg-surface-800/50 px-4 py-3.5 text-sm text-surface-400 no-underline transition-colors hover:bg-surface-700"
        >
          Seguir explorando
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <p className="mt-6 text-center text-xs text-surface-500">
        El pago se procesa de forma segura a través de Lemon Squeezy.
        Aceptamos todas las tarjetas de crédito y débito.
      </p>

      <p className="mt-2 text-center text-xs text-surface-500">
        Al comprar aceptás los{' '}
        <Link to="/terms" className="text-primary-400 hover:text-primary-300">
          términos y condiciones
        </Link>
      </p>
    </div>
  )
}
