import { useEffect, createContext, useContext, useState } from 'react'

import { loginReq, logoutReq, registerReq, verifyTokenReq } from '../api/auth'
import Cookies from 'js-cookie'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within a AuthProvider')
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(true)

  // clear errors after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([])
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errors])

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get()
      if (!cookies.token) {
        setIsAuthenticated(false)
        setLoading(false)
        return
      }

      try {
        const res = await verifyTokenReq(cookies.token)
        // console.log(res)
        if (!res.data) return setIsAuthenticated(false)
        setIsAuthenticated(true)
        setUser(res.data)
        setLoading(false)
      } catch (error) {
        setIsAuthenticated(false)
        setLoading(false)
      }
    }
    checkLogin()
  }, [])

  const signup = async (user) => {
    try {
      const res = await registerReq(user)
      if (res.status === 200) {
        setUser(res.data)
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.log(error.response.data)
      setErrors(error.response.data.message)
    }
  }
  const signin = async (user) => {
    try {
      const res = await loginReq(user)
      setUser(res.data)
      setIsAuthenticated(true)
    } catch (error) {
      console.log(error)
      setErrors(error.response.data.message);
    }
  }
  const logout = async () => {
    try {
      await logoutReq()
      Cookies.remove('token')
      setUser(null)
      setIsAuthenticated(false)
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        logout,
        isAuthenticated,
        errors,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
