'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/')
      } else {
        setIsAuthenticated(true)
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3525C3]"></div>
      </div>
    )
  }

  return isAuthenticated ? children : null
}

export default ProtectedRoute 