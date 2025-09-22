import { Navigate, Outlet } from "react-router-dom"

const IsLogged = () => {
  const isLogged = !!localStorage.getItem('webtoken')

  return (
    isLogged  ? <Navigate to='/' /> : <Outlet /> 
  )
}

export default IsLogged