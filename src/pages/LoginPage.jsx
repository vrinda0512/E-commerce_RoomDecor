import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import PageContainer from '../components/PageContainer'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'

function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, signup } = useAuth()
  const { fetchCart } = useCart()
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const onSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        await login({ email: form.email, password: form.password })
      } else {
        if (!form.name.trim()) {
          setError('Name is required')
          setLoading(false)
          return
        }
        await signup({ name: form.name, email: form.email, password: form.password })
      }
      await fetchCart()
      navigate(location.state?.from?.pathname || '/')
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (mode === 'login' ? 'Invalid email or password.' : 'Signup failed. Try again.'),
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageContainer>
      <div className="glass-card mx-auto max-w-md p-8">
        {/* Toggle */}
        <div className="mb-6 flex rounded-full border border-brand-plum/20 p-1">
          {['login', 'signup'].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => { setMode(m); setError('') }}
              className={`flex-1 rounded-full py-2 text-sm font-semibold capitalize transition ${
                mode === m
                  ? 'bg-brand-lavender text-brand-plum shadow-soft'
                  : 'text-brand-plum/60 hover:text-brand-plum'
              }`}
            >
              {m === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>

        <h1 className="text-3xl font-bold">
          {mode === 'login' ? 'Welcome Back' : 'Join Luna Decor'}
        </h1>
        <p className="mt-1 text-sm text-brand-plum/60">
          {mode === 'login'
            ? 'Sign in to access your cart and orders.'
            : 'Create an account to start shopping.'}
        </p>

        {error && (
          <div className="mt-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="mb-1 block text-sm font-medium text-brand-plum/70">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-brand-plum/20 bg-white p-3 outline-none focus:border-brand-lavender focus:ring-2 focus:ring-brand-lavender/30 transition"
                placeholder="Jane Doe"
                required
              />
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm font-medium text-brand-plum/70">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-brand-plum/20 bg-white p-3 outline-none focus:border-brand-lavender focus:ring-2 focus:ring-brand-lavender/30 transition"
              placeholder="hello@example.com"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-brand-plum/70">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-brand-plum/20 bg-white p-3 outline-none focus:border-brand-lavender focus:ring-2 focus:ring-brand-lavender/30 transition"
              placeholder={mode === 'signup' ? 'Min. 6 characters' : '••••••••'}
              minLength={6}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-brand-sage px-6 py-3 font-semibold transition hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-brand-plum/60">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError('') }}
            className="font-semibold text-brand-plum underline-offset-2 hover:underline"
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </PageContainer>
  )
}

export default LoginPage
