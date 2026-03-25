import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <div className="text-6xl font-extrabold text-surface-700">404</div>
      <h1 className="mt-4 text-2xl font-bold">Página no encontrada</h1>
      <p className="mt-2 text-surface-400">
        La página que buscás no existe o fue movida.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-500 no-underline"
      >
        Volver al inicio
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  )
}
