import { useEffect, useState } from 'react'
import { userData } from '../../api'
import { useNavigate } from 'react-router-dom'

const UserProfile = () => {

    const [user,setUser] = useState([])

    const nav = useNavigate()
    
    useEffect(() => {
        const getUserData = async() => {
            const res = await userData()
            if(res?.status === 200 || res?.status === 201){
                setUser(res.data)
            }
            else{
                nav('/login')
            }
        }
        getUserData()
    },[])

    // logout
    const logout = async() => {
        localStorage.removeItem('webtoken')
        localStorage.removeItem('refreshToken')
        nav('/')
    }

    return (
<>
  <div className="flex justify-center items-center min-h-screen ">
    <div className="shadow-xl rounded-lg bg-white border border-[#f0c2a2] p-10 w-full max-w-md">
      <h1 className="text-center font-bold text-2xl text-[#d5754d] mb-6">USER PROFILE</h1>

      <div className="space-y-4 text-sm">
        {/* Name */}
        <div>
          <label className="font-medium text-gray-600">Name</label>
          <p className="text-gray-800 font-semibold">{user.name}</p>
        </div>

        {/* Email */}
        <div>
          <label className="font-medium text-gray-600">Email</label>
          <p className="text-gray-800">{user.email}</p>
        </div>

        {/* Mobile */}
        <div>
          <label className="font-medium text-gray-600">Mobile Number</label>
          <p className="text-gray-800">{user.mobile_number}</p>
        </div>

        {/* Address */}
        <div>
          <label className="font-medium text-gray-600">Address</label>
          <p className="text-gray-800">{user.address}</p>
        </div>

      </div>

      {/* =Logout */}
      <div className="mt-6 flex gap-4">
        <button className="w-1/2 py-2 mx-auto rounded-full bg-gray-200 hover:bg-gray-300 text-black font-bold shadow-md transition duration-300 hover:cursor-pointer" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  </div>
</>

    )
}

export default UserProfile