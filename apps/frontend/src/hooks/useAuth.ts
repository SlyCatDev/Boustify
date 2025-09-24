import { useState, useEffect } from 'react'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      validateToken(token).then(valid => {
        if (valid) {
          setIsAuthenticated(true)
        }
      })
    }
  }, [])

  const login = async (email: string, password: string) => {
    const response = await loginUser(email, password)
    if (response.token) {
      localStorage.setItem('token', response.token)
      setIsAuthenticated(true)
      setUser(response.user)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    setUser(null)
  }

  return { isAuthenticated, user, login, logout }
}

// Fonctions à implémenter selon ton backend
async function validateToken(token: string) {
  const response = await fetch('/api/check', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return response.ok
}

async function loginUser(email: string, password: string) {
  const response = await fetch('http://localhost:3333/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    throw new Error('Login failed')
  }

  return response.json()
}
