import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'

function Navbar() {
  const { isAuthenticated, logout } = useAuth()
  const { items } = useCart()

  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-brand-cream/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link to="/" className="text-xl font-semibold text-brand-plum">
          Luna Decor
        </Link>
        <nav className="flex items-center gap-3 text-sm font-medium">
          {['/', '/products', '/cart', '/orders'].map((path) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 transition ${isActive ? 'bg-brand-lavender text-brand-plum' : 'hover:bg-white/80'}`
              }
            >
              {path === '/'
                ? 'Home'
                : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
            </NavLink>
          ))}
          <Link
            to="/cart"
            className="rounded-full bg-brand-sage px-4 py-2 text-brand-plum transition hover:scale-105"
          >
            Cart ({items.length})
          </Link>
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="rounded-full border border-brand-plum/20 px-4 py-2 hover:bg-brand-blush"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="rounded-full border border-brand-plum/20 px-4 py-2 hover:bg-brand-blush"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
