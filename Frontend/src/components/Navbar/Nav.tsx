// import React from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {  HiSearch, HiShoppingCart } from "react-icons/hi";
import { useContext, useEffect, useState } from 'react';
import { HiMiniHeart } from 'react-icons/hi2';
import {  FaUser } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { PiPackageLight, PiSignOutLight, PiUserCircleThin } from 'react-icons/pi';
import { userDetails } from '../../api';
import {  LuSun } from 'react-icons/lu';
import { AiFillMoon } from 'react-icons/ai';
import { GiFireworkRocket } from 'react-icons/gi';
import { CountContext } from './CountContext';

const Nav = () => {
    
    // hide signin 
    const location = useLocation()

    const getLoginLoc = location.pathname === '/login'

    const isLogged = !!localStorage.getItem('webtoken')

    const [user,setUser] = useState()

    const { cartCount, wishCount,setCartCount,setWishCount } = useContext(CountContext);

    const [darkMode,setDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === "true"
    })

    // get role if logged in
    useEffect(() => {
        getUser()
    },[isLogged])

    useEffect(() => {
        localStorage.setItem('darkMode',darkMode)
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    },[darkMode])

    const getUser = async() => {
        const res=await userDetails()
        if(res.status == 200 || res.status == 201){
            setUser(res.data.data)
        }
    }

    const toggleTheme = async() => {
        if(darkMode){
            setDarkMode(false)
        }
        else{
            setDarkMode(true)
        }
    }

    const nav = useNavigate()
    // logout
    const SignOut = async() => {
        localStorage.removeItem('webtoken')
        localStorage.removeItem('user')
        localStorage.removeItem('cart')
        localStorage.removeItem('wish')
        setCartCount(0)
        setWishCount(0)
        nav('/')
    }

  return (
    <>
        <div className='p-2 sticky top-0 z-50 bg-[#fff9e6] dark:bg-gray-900 shadow-xs'>
            <div className='flex justify-between items-center px-30'>
                {/* title */}
                <div className='m-4'>
                    <p className="flex gap-1 items-center"><GiFireworkRocket  className="p-2 rounded-lg bg-[#d5754d] size-8 text-lg text-white" />
                    <span className='font-bold font-outfit md:text-xl text-3xl italic text-[#d5754d]'><Link to='/'>Makra Depot</Link></span></p>
                </div>
                {/* menu list */}
                <div className='md:flex hidden font-medium justify-between gap-5 whitespace-nowrap'>
                         <div><Link to='/products' className="border-b-2 border-transparent hover:border-black hover:text-[#d5754d] transition-all duration-300 dark:text-white dark:hover:border-white">Products</Link></div>
                        <div><Link to='/categories' className="border-b-2 border-transparent hover:border-black dark:hover:border-white hover:text-[#d5754d] transition-all duration-300 dark:text-white">Categories</Link></div>
                        <div><Link to='/brands' className="border-b-2 border-transparent hover:border-black hover:text-[#d5754d] transition-all duration-300 dark:text-white dark:hover:border-white">Brands</Link></div>
                        <div>
                            <Link to='/quickbuy' className="transform border-transparent transition duration-300 bg-[#ffb684] px-4 py-1 rounded-full hover:bg-[#d5754d] hover:shadow-lg hover:scale-105 ease-in-out">Quick Buy</Link>
                        </div>
                        {isLogged && 
                        <div><Link to='/dashboard' className="border-b-2 border-transparent hover:border-black hover:text-[#d5754d] transition-all duration-300 dark:text-white dark:hover:border-white">Dashboard</Link></div> }

                </div>

                {/* icons */}
                <div className='flex align-center justify-center gap-2 m-2'>
                    {/* theme */}
                    <div className='text-3xl flex text-gray-400' onClick={()=>toggleTheme()}>
                        <button className='shadow-lg cursor-pointer transition duration-300 flex justify-between gap-1 bg-white rounded-full items-center'>
                            <LuSun className={`size-6 rounded-full p-1 mx-1 ${!darkMode && "bg-yellow-200/60 text-[#d5754d]"}`}/>
                            <AiFillMoon  className={`size-6 rounded-full p-1 mx-1 ${darkMode && "bg-black text-white"}`}/>
                        </button>
                    </div>

                    {/* search */}
                    <div className='text-3xl text-[#d5754d] flex'>
                        <button className='cursor-pointer hover:scale-110 transition duration-300' title='Search Products'><Link to='/products'><HiSearch /></Link></button>
                    </div>

                    {/* wishlist */}
                    <div className='relative text-3xl text-[#d5754d] flex items-center justify-center'>
                        <button className='cursor-pointer hover:scale-110 transition duration-300' title='Wishlist'><Link to='/wishlist'><HiMiniHeart /></Link></button>
                        {wishCount >0 &&
                        <span className='absolute text-white text-xs px-1 rounded-full bg-red-500 font-semibold translate-x-3 -translate-y-3 min-w-[16px] h-[16px] flex justify-center items-center'>{wishCount}</span> }
                    </div>

                    {/* cart */}    
                    <div className='relative text-3xl text-[#d5754d] flex items-center justify-center'>
                        <button className='cursor-pointer hover:scale-110 transition duration-300' title='Cart'><Link to='/cart'><HiShoppingCart /></Link></button>
                        {cartCount >0 && <span className='absolute text-white text-xs bg-green-600 px-1 rounded-full font-semibold translate-x-3 -translate-y-3 min-w-[16px] h-[16px] flex justify-center items-center'>{cartCount}</span>}
                    </div>
                    {/* profile */}
                    {isLogged &&
                    <div className='group text-3xl text-[#d5754d] flex items-center gap-1'>
                        <button className='cursor-pointer group-hover:scale-110 transition duration-300 flex items-center'>
                            <FaUser className='size-6'/>
                            <IoMdArrowDropdown className='size-4 group-hover:rotate-180 transition duration-400'/>
                        </button>
                        {/* dropdown */}
                        <div className='group-hover:opacity-100 opacity-0 flex justify-center transition duration-300 group-hover:-translate-y-1 translate-y-1 text-black pointer-events-none group-hover:pointer-events-auto'>
                            {/* user deatils*/}
                            <div className='bg-white p-4 absolute text-xs rounded-lg mt-3 border border-[#d5754d]/30 w-[150px]'>
                                <p className='font-bold'>{user?.name}</p>
                                <p>{user?.email}</p>
                                <div className='h-[1px] border my-2 border-gray-200'></div>
                                {/* actions */}
                                <div className='flex flex-col gap-1 font-semibold text-gray-700'>
                                    <Link to="/user"><p className='flex gap-1 items-center cursor-pointer hover:bg-[#ffb684] rounded-lg p-1'><span><PiUserCircleThin className='size-5'/> </span>Profile</p></Link>
                                    <Link to="/orders"><p className='flex gap-1 items-center cursor-pointer hover:bg-[#ffb684] rounded-lg p-1'><span><PiPackageLight  className='size-4'/> </span>My Orders</p></Link>
                                </div>
                                <div className='h-[1px] border my-2 border-gray-200'></div>

                                {/* log out */}
                                <p className='flex gap-1 items-center font-semibold text-gray-700 cursor-pointer hover:bg-red-500/90 rounded-lg py-1 px-2 hover:text-black' onClick={()=>SignOut()}><span><PiSignOutLight className='size-4'/> </span>Logout</p>
                            </div>
                        </div>
                        
                    </div>
                    }

                    {/* login */}
                    {
                            (!getLoginLoc && !isLogged) && (<div>
                            <button type='button' className='hidden md:flex md:py-2 md:px-4 rounded-xl bg-[#ffb684] hover:bg-[#d5754d] hover:cursor-pointer font-bold shadow-lg transition duration-300'>
                                <Link to='/login'>Sign In</Link>
                            </button>
                        </div>)
                    }
                </div>

            </div>
        </div>
    </>
  )
}

export default Nav