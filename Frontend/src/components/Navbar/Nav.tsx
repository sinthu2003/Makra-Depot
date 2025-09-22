// import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { HiMenu, HiSearch, HiShoppingCart, HiUserCircle, HiUserGroup  } from "react-icons/hi";
import { useEffect, useState } from 'react';
import { MdCancel } from "react-icons/md";
import { HiMiniHeart } from 'react-icons/hi2';
import { jwtDecode } from 'jwt-decode';

const Nav = () => {
    
    // hide signin 
    const location = useLocation()

    const getLoc = location.pathname === '/signup' || location.pathname === '/signedup'

    const getLoginLoc = location.pathname === '/login'

    const isLogged = !!localStorage.getItem('webtoken')

    // menu modal
    const [isOpen,setIsOpen]=useState(false)
    const [role,setRole]=useState(null)

    // get role if logged in
    useEffect(() => {
        const token = localStorage.getItem('webtoken')
        if(token){
            const user = jwtDecode(token)
            setRole(user.role)
        }
        else{
            setRole(null)
        }
    },[isLogged])

  return (
    <>
        <div className='p-4 sticky top-0 z-50 bg-[#fff9e6] shadow-xs'>
            <div className='flex justify-between items-center'>
                {/* title */}
                <div className='m-4'>
                    <h1 className='font-bold font-outfit md:text-xl text-3xl italic text-[#d5754d]'><Link to='/'>Eshop</Link></h1>
                </div>
                {/* menu list */}
                <div className='md:flex hidden font-medium justify-between gap-10 whitespace-nowrap'>
                        <div><Link to='' className="border-b-2 border-transparent hover:border-black hover:text-[#d5754d] transition-all duration-300">Home</Link></div>
                        <div><Link to='' className="border-b-2 border-transparent hover:border-black hover:text-[#d5754d] transition-all duration-300">Men & Kids</Link></div>
                        <div><Link to='' className="border-b-2 border-transparent hover:border-black hover:text-[#d5754d] transition-all duration-300">Women</Link></div>
                        <div><Link to='' className="border-b-2 border-transparent hover:border-black hover:text-[#d5754d] transition-all duration-300">Beauty</Link></div>
                        <div><Link to='' className="border-b-2 border-transparent hover:border-black hover:text-[#d5754d] transition-all duration-300">Genz</Link></div>
                </div>
                {/* search  */}
                <div className='lg:flex hidden group relative'>
                        <input type="text" className='rounded-none lg:w-60 h-10 px-4 border-b border-gray-300 group-hover:border-[#d5754d] group-hover:bg-white focus:outline-none group-hover:border-[#d5754d] transition-colors duration-300' placeholder='Search'/>

                        <div className='text-lg top-1/2 transform -translate-y-1/2 right-4 absolute group-hover:text-[#d5754d] transition-colors duration-300'>
                            <HiSearch />
                        </div>
                </div>

                {/* icons */}
                <div className='flex align-center justify-center gap-2 m-2'>
                    {/* all users */}
                    {
                            role === 'Admin' && (
                                <div className='text-3xl text-[#d5754d] md:mt-2'>
                                    <button className='cursor-pointer' title='Users'><Link to='/all-users'><HiUserGroup /></Link></button>
                                </div>
                            )
                    }

                    {/* wishlist */}
                    <div className='text-3xl text-[#d5754d] md:mt-2'>
                        <button className='cursor-pointer' title='Wishlist'><Link to='/wishlist'><HiMiniHeart /></Link></button>
                    </div>

                    {/* cart */}    
                    <div className='text-3xl text-[#d5754d] md:mt-2'>
                        <button className='cursor-pointer' title='Cart'><Link to='/cart'><HiShoppingCart /></Link></button>
                    </div>

                    {/* profile */}    
                    <div className='text-3xl text-[#d5754d] md:mt-2'>
                        <button className='cursor-pointer' title='My Profile'><Link to='/user'><HiUserCircle /></Link></button>
                    </div>

                    {/* menu */}
                    <div className='md:hidden text-3xl text-[#d5754d]'>
                        <button  className='cursor-pointer' onClick={() => setIsOpen(true)}><HiMenu /></button>
                    </div>
                    {/* modal */}
                    <div className='md:hidden'>

                            {/* Overlay */}
                            {isOpen && (
                                <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 z-40" onClick={() => setIsOpen(false)}></div>
                            )}

                            {/* Sliding Modal */}
                            <div
                                className={`fixed top-0 right-0 h-full w-64 bg-[#fff9e6] shadow-lg z-50 transform ${
                                    isOpen ? 'translate-x-0' : 'translate-x-full'
                                } transition-transform duration-300 ease-in-out`}
                            >
                                {/* head */}
                                <div className='px-4 pt-4'>
                                    <div className="flex justify-between items-center border-b-1 border-gray-300">
                                        <h2 className="text-md font-bold">Menu</h2>
                                        <span className='cursor-pointer' onClick={() =>setIsOpen(false)}><MdCancel /></span>
                                    </div>
                                </div>
                                {/* list */}
                                <div className="flex flex-col p-4">
                                    <Link to=''> <span className="border-b-2 border-transparent hover:border-black hover:text-[#d5754d] transition-all duration-300 text-bold" onClick={() => setIsOpen(false)}>Home</span></Link>
                                    <Link to='' > <span className="border-b-2 border-transparent hover:border-black hover:text-[#d5754d] transition-all duration-300 text-bold">Men & Kids</span></Link>
                                    <Link to=''> <span className="border-b-2 border-transparent hover:border-black hover:text-[#d5754d] transition-all duration-300 text-bold">Women</span></Link>
                                    <Link to=''> <span className="border-b-2 border-transparent hover:border-black hover:text-[#d5754d] transition-all duration-300 text-bold">Beauty</span></Link>
                                    <Link to=''> <span className="border-b-2 border-transparent hover:border-black hover:text-[#d5754d] transition-all duration-300 text-bold">Genz</span></Link>
                                </div>
                                {/* signup */}
                                {
                                    (!getLoc && !isLogged) && (
                                        <>
                                            <div className='flex flex-col border-b border-gray-300'>
                                            </div>
                                            <div className='py-2 px-4'>
                                                <p className='font-bold'>Doesn't have account?</p>
                                                <button className='rounded-full border border-gray-300 hover:border-[#d5754d] px-6 py-2 mt-2' 
                                                onClick={() => setIsOpen(false)}>
                                                    <Link to='/signup'>SignUp</Link>
                                                </button>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                    </div>

                    {/* signup */}
                    {/* {
                            (!getLoc && !isLogged) && (<div>
                            <button type='button' className='hidden md:flex md:py-2 md:px-6 rounded-full bg-[#ffb684] hover:bg-[#d5754d] hover:cursor-pointer font-bold shadow-lg transition duration-300'>
                                <Link to='/signup'>Sign up</Link>
                            </button>
                        </div>)
                    } */}

                    {/* login */}
                    {
                            (!getLoginLoc && !isLogged) && (<div>
                            <button type='button' className='hidden md:flex md:py-2 md:px-6 rounded-full bg-[#ffb684] hover:bg-[#d5754d] hover:cursor-pointer font-bold shadow-lg transition duration-300'>
                                <Link to='/login'>Login</Link>
                            </button>
                        </div>)
                    }
                </div>

            </div>
        </div>
        <Outlet />
    </>
  )
}

export default Nav