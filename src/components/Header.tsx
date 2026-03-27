import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useStore } from '../store/useStore'
import elNovatoLogo from '../assets/elnovato-logo.png'

const NAV_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/catalog?category=pack', label: 'Packs' },
  { to: '/catalog?category=camera-frame', label: 'Marcos' },
  { to: '/catalog?category=chat-theme', label: 'Chats' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const cart = useStore((s) => s.cart)

  return (
    <header className="sticky top-0 z-50 border-b border-surface-800 bg-surface-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2.5 text-white no-underline">
          <img src={elNovatoLogo} alt="El Novato" className="h-8 w-auto" />
          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-tight">
              Stream<span className="text-primary-400">Layer</span>
            </span>
            <span className="text-[9px] font-medium text-surface-500 tracking-wide">by El Novato</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors no-underline ${
                (location.pathname + location.search) === link.to
                  ? 'bg-primary-600/20 text-primary-300'
                  : 'text-surface-300 hover:bg-surface-800 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/checkout"
            className="relative rounded-lg p-2 text-surface-300 transition-colors hover:bg-surface-800 hover:text-white no-underline"
          >
            <ShoppingCart className="h-5 w-5" />
            {cart.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-[10px] font-bold text-white">
                {cart.length}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-surface-300 transition-colors hover:bg-surface-800 md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-surface-800 px-4 py-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`block rounded-lg px-4 py-3 text-sm font-medium no-underline ${
                (location.pathname + location.search) === link.to
                  ? 'bg-primary-600/20 text-primary-300'
                  : 'text-surface-300 hover:bg-surface-800'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
