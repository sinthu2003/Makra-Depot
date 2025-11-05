import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { GoSignOut } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import ProfileCompletionChart from './ProfileCompletionChart'
import BarChart from './BarChart'

const Dashboard = () => {
    const nav = useNavigate()

    const SignOut = async() => {
        localStorage.removeItem('webtoken')
        localStorage.removeItem('user')
        localStorage.removeItem('cart')
        localStorage.removeItem('wish')
        nav('/')
    }

    const [user,setUser] = useState()

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
    },[])

  return (
    <>
        <div className='m-10 flex gap-5'>
            <div className='border border-black w-1/4 bg-gray-900 h-110 flex-col rounded-lg shadow-2xl dark:bg-black flex-col flex justify-between'>
                {/* profile */}
                <div className='text-white flex flex-col'>
                    <div className='my-4 flex  justify-center text-white'>
                        <FaUser className='size-38 border border-white p-6 rounded-full'/>
                    </div>
                    {/* details */}
                    <div className='flex flex-col justify-center items-center gap-1'>
                        <p className='font-bold text-lg'>{user?.name}</p>
                        <p className=''>{user?.email}</p>
                        <p className='text-white/60 text-sm'>{user?.phone}</p>
                        <p className='text-white/60 text-sm'>{user?.dateOfBirth? user?.dateOfBirth : "dd-mm-yy" }</p>
                    </div>
                </div>
                {/* signout */}
                <div className='flex justify-center'>
                    <button className='flex gap-2 justify-center items-center my-10 py-2 px-4 w-3/4 bg-red-500/80 shadow rounded-lg font-semibold hover:-translate-y-1 cursor-pointer transition duration-300 hover:shadow-2xl dark:hover:text-black' onClick={()=>SignOut()}><GoSignOut /> Sign out</button>
                </div>                
            </div>
            <div className='bg-white/70 shadow-2xl w-3/4 h-110 flex rounded-lg border border-[#d5754d] items-center px-4 gap-2'>
                {/* doughnut */}
                <div className='w-full'>
                    <p className='font-bold my-4 flex justify-center text-xl'>Profile Completion</p>
                    {user && <ProfileCompletionChart user={user} />}
                </div>
                {/* bar */}
                <div className='w-full'>
                    <p className='font-bold my-4 flex justify-center text-xl'>Orders this Year</p>
                    <BarChart />
                </div>
            </div>
        </div>
    </>
  )
}

export default Dashboard