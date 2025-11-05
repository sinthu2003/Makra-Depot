import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../Context/UserRole.context"

export const AdminRoute = ({allowedRole}) => {
    const {role,loading}= useAuth()

    if(loading) {
        return <div>Loading...</div>
    }

    const result = allowedRole.includes(role)

    return result ? <Outlet /> : <Navigate to='/'/>
}