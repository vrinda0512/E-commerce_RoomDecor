import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth()
  const { itemCount } = useCart()

  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-brand-cream/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-brand-plum">
          <span className="text-2xl">🌙</span>
          Luna Decor
        </Link>

        <nav className="flex items-center gap-1 text-sm font-medium">
          {[
            { path: '/', label: 'Home' },
            { path: '/products', label: 'Shop' },
          ].map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 transition ${isActive ? 'bg-brand-lavender text-brand-plum' : 'hover:bg-white/80'}`
              }
            >
              {label}
            </NavLink>
          ))}

          {isAuthenticated && (
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `rounded-full px-4 py-2 transition ${isActive ? 'bg-brand-lavender text-brand-plum' : 'hover:bg-white/80'}`
              }
            >
              Orders
            </NavLink>
          )}

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative rounded-full px-4 py-2 font-semibold transition ${isActive ? 'bg-brand-sage' : 'bg-brand-sage/60 hover:bg-brand-sage'}`
            }
          >
            🛒 Cart
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-plum text-[10px] font-bold text-white">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </NavLink>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="hidden text-xs text-brand-plum/60 sm:block">
                Hi, {user?.name?.split(' ')[0] || 'User'}
              </span>
              <button
                onClick={logout}
                className="rounded-full border border-brand-plum/20 px-4 py-2 transition hover:bg-brand-blush"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-full border border-brand-plum/20 px-4 py-2 transition hover:bg-brand-blush"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
