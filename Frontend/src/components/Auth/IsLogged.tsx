import { Navigate, Outlet } from "react-router-dom"

const IsLogged = () => {
  const isLogged = !!localStorage.getItem('webtoken')

  return (
    isLogged  ? <Navigate to='/' replace/> : <Outlet /> 
  )
}

export default IsLogged