import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PageContainer from '../components/PageContainer'
import { useAuth } from '../contexts/AuthContext'

function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })

  const onSubmit = async (event) => {
    event.preventDefault()
    await login(form)
    navigate(location.state?.from?.pathname || '/')
  }

  return (
    <PageContainer>
      <div className="glass-card mx-auto max-w-md p-6">
        <h2 className="text-3xl font-semibold">Welcome Back</h2>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            className="w-full rounded-xl border border-brand-plum/20 bg-white p-3"
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
            className="w-full rounded-xl border border-brand-plum/20 bg-white p-3"
            placeholder="Password"
            required
          />
          <button className="w-full rounded-full bg-brand-sage px-6 py-3 font-semibold transition hover:scale-105">
            Login
          </button>
        </form>
      </div>
    </PageContainer>
  )
}

export default LoginPage
