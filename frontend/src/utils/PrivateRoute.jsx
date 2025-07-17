import { Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const PrivateRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Simulate checking authentication (you can add token validation here)
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('user')
        
        if (token && user) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    // Add a small delay to show loading state
    setTimeout(checkAuth, 500)
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

// Loading Spinner Component
const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading...</h2>
          <p className="text-gray-600">Please wait while we verify your access</p>
        </div>
      </div>
    </div>
  )
}

export default PrivateRoute