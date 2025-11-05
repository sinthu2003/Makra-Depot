import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const isLogged = !!localStorage.getItem('webtoken')

  return (
    isLogged ? <Outlet /> : <Navigate to='/login' replace/>
  )
}

export default ProtectedRoute