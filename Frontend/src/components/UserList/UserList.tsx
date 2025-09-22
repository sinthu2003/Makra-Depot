import  { useEffect, useState } from 'react'
import { getAllUsers } from '../../api'

const UserList = () => {
  const [users,setUsers] = useState()
  
      // api call
      useEffect(() => {
          const getUsers= async() => {
              const response = await getAllUsers()
              setUsers(response?.data)
          }
          getUsers()
      })
  
    return (
        <>
            <div className="flex justify-center items-start min-h-screen py-10">
                <div className="bg-white shadow-xl rounded-lg border border-[#f0c2a2] w-full max-w-4xl p-8">
                <h1 className="text-center font-bold text-2xl text-[#d5754d] mb-6">
                    USERS LIST
                </h1>
                <div className="divide-y divide-gray-200">
                    {users?.map((user, index) => (
                    <div key={index} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        {/* User Details */}
                        <div className="text-sm space-y-1">
                        <p><span className="font-medium text-gray-600">Name: </span> <span className="text-gray-800 font-semibold">{user.name}</span></p>
                        <p><span className="font-medium text-gray-600">Email: </span> <span className="text-gray-800">{user.email}</span></p>
                        <p><span className="font-medium text-gray-600">Mobile: </span> <span className="text-gray-800">{user.mobile_number}</span></p>
                        <p><span className="font-medium text-gray-600">Address: </span> <span className="text-gray-800">{user.address}</span></p>
                        </div>

                    </div>
                    ))}
                </div>
                </div>
            </div>
        </>

    )
}

export default UserList