import { jwtDecode } from "jwt-decode"
import { createContext, useContext, useEffect, useState } from "react"

const UserRole = createContext({})

export const RoleProvider = ({children}) => {
    const [role,setRole] = useState()
    const [loading,setLoading] = useState(true)
    // get role from token
    useEffect(()=> {
        const getRole = () => {
            const token = localStorage.getItem('webtoken')
            if(token){
                const user = jwtDecode(token)
                setRole(user.role)
            }
            setLoading(false)
        }
        getRole()
    },[])

    return(
        <UserRole.Provider value={{role,loading}}>
            {children}
        </UserRole.Provider>
    )
}

export const useAuth = () => useContext(UserRole)