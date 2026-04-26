import { createContext, useContext, useMemo, useState } from 'react'
import { login as loginRequest, register as registerRequest } from '../api/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const login = async (credentials) => {
    const data = await loginRequest(credentials)
    localStorage.setItem('token', data.token)
    const userData = {
      _id: data._id,
      name: data.name,
      email: data.email,
      role: data.role,
    }
    localStorage.setItem('user', JSON.stringify(userData))
    setToken(data.token)
    setUser(userData)
    return data
  }

  const signup = async (credentials) => {
    const data = await registerRequest(credentials)
    localStorage.setItem('token', data.token)
    const userData = {
      _id: data._id,
      name: data.name,
      email: data.email,
      role: data.role,
    }
    localStorage.setItem('user', JSON.stringify(userData))
    setToken(data.token)
    setUser(userData)
    return data
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  const value = useMemo(
    () => ({ token, user, isAuthenticated: Boolean(token), login, signup, logout }),
    [token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
