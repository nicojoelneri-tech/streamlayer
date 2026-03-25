import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Trash2, Download, ShoppingCart, ArrowRight, Package, Loader2, CheckCircle, XCircle, Clock } from 'lucide-react'
import { PACKS } from '../data/packs'
import { useStore } from '../store/useStore'
import { formatPrice } from '../utils/formatPrice'

export default function Checkout() {
  const [searchParams] = useSearchParams()
  const paymentStatus = searchParams.get('status')

  const cart = useStore((s) => s.cart)
  const removeFromCart = useStore((s) => s.removeFromCart)
  const clearCart = useStore((s) => s.clearCart)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const cartPacks = cart.map((id) => PACKS.find((p) => p.id === id)).filter(Boolean)
  const total = cartPacks.reduce((sum, p) => sum + (p?.price ?? 0), 0)

  // Handle MP redirect back
  useEffect(() => {
    if (paymentStatus === 'approved') {
      clearCart()
    }
  }, [paymentStatus, clearCart])

  async function handleCheckout() {
    setLoading(true)
    setError(null)

    try {
      const items = cartPacks
        .filter(Boolean)
        .map((pack) => ({
          id: pack!.id,
          title: pack!.name,
          price: pack!.price,
        }))

      const res = await fetch('/api/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })

      if (!res.ok) {
        throw new Error('Error al crear el pago')
      }

      const data = await res.json()

      // Redirect to Mercado Pago checkout
      // In production use init_point, in test use sandbox_init_point
      const checkoutUrl = data.init_point || data.sandbox_init_point
      if (checkoutUrl) {
        window.location.href = checkoutUrl
      } else {
        throw new Error('No se recibió URL de pago')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado')
      setLoading(false)
    }
  }

  // ── Payment result screens ──

  if (paymentStatus === 'approved') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/20">
          <CheckCircle className="h-8 w-8 text-success" />
        </div>
        <h1 className="text-3xl font-bold">Compra completada!</h1>
        <p className="mt-3 text-surface-400">
          Tu pago fue aprobado. Descargá tus productos abajo.
        </p>

        <div className="mt-8 space-y-3">
          {/* TODO: Show purchased items from payment data */}
          <div className="rounded-xl border border-surface-700 bg-surface-900/50 p-6">
            <Download className="mx-auto mb-3 h-8 w-8 text-primary-400" />
            <p className="text-sm text-surface-400">
              Vas a recibir el link de descarga por email. Si no lo recibís, escribinos por Instagram.
            </p>
          </div>
        </div>

        <Link
          to="/catalog"
          className="mt-8 inline-flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300 no-underline"
        >
          Seguir explorando <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  if (paymentStatus === 'failure') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
          <XCircle className="h-8 w-8 text-red-400" />
        </div>
        <h1 className="text-3xl font-bold">El pago no se pudo procesar</h1>
        <p className="mt-3 text-surface-400">
          Hubo un problema con tu pago. Podés intentar de nuevo.
        </p>
        <Link
          to="/checkout"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-500 no-underline"
        >
          Reintentar
        </Link>
      </div>
    )
  }

  if (paymentStatus === 'pending') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500/20">
          <Clock className="h-8 w-8 text-yellow-400" />
        </div>
        <h1 className="text-3xl font-bold">Pago pendiente</h1>
        <p className="mt-3 text-surface-400">
          Tu pago está siendo procesado. Te avisamos cuando se acredite.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300 no-underline"
        >
          Volver al inicio <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  // ── Empty cart ──

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

  // ── Cart with items ──

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <p className="mt-2 text-surface-400">
        Revisá tu pedido antes de finalizar.
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
                    {pack.category === 'pack' ? `${pack.modules.length} módulos` : 'Marco de cámara'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-white">{formatPrice(pack.price)}</span>
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
          <span>Total</span>
          <span className="text-primary-400">{formatPrice(total)}</span>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="mt-6 flex gap-3">
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary-600 py-3.5 font-semibold text-white transition-colors hover:bg-primary-500 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Procesando...
            </>
          ) : (
            'Pagar con tarjeta'
          )}
        </button>
        <button
          onClick={clearCart}
          className="cursor-pointer rounded-xl border border-surface-700 bg-surface-800/50 px-4 py-3.5 text-sm text-surface-400 transition-colors hover:bg-surface-700"
        >
          Vaciar
        </button>
      </div>

      <p className="mt-4 text-center text-xs text-surface-500">
        Serás redirigido a Mercado Pago para completar el pago con tarjeta de crédito o débito.
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
