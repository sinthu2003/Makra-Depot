// import React from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {  HiMenu, HiSearch, HiShoppingCart } from "react-icons/hi";
import { useContext, useEffect, useState } from 'react';
import { HiMiniHeart } from 'react-icons/hi2';
import {  FaUser } from 'react-icons/fa';
import { IoMdArrowDropdown, IoMdHeart } from 'react-icons/io';
import { PiPackageLight, PiSignInBold, PiSignOutLight, PiUserCircleThin } from 'react-icons/pi';
import { getCompany, userDetails } from '../../api';
import {  LuSun } from 'react-icons/lu';
import { AiFillMoon } from 'react-icons/ai';
import { GiFireworkRocket, GiShoppingBag } from 'react-icons/gi';
import { CountContext } from './CountContext';
import { MdBrandingWatermark, MdCancel, MdOutlineContactPhone } from 'react-icons/md';
import { TbCategoryFilled } from 'react-icons/tb';
import { IoRocket } from 'react-icons/io5';
import { FaCircleUser } from 'react-icons/fa6';

const Nav = () => {
    
    // hide signin 
    const location = useLocation()

    const getLoginLoc = location.pathname === '/login'

    const isLogged = !!localStorage.getItem('webtoken')

    const [company,setCompany] = useState()


    const [user,setUser] = useState()
    const [isOpen,setIsOpen]=useState(false)


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

    const getDetails = async() => {
            const res= await getCompany()
            if(res?.status == 200 || res?.status == 201){
                setIsOpen(false)
                setCompany(res.data.data[0])
                nav('/contact',{state:{details:company}})
            }
            else{
                nav('/login')
            }
        }
    
  return (
   <>
  <div className='p-2 sticky top-0 z-50 bg-[#fff9e6] dark:bg-gray-900 shadow-xs w-full overflow-x-hidden overflow-y-hidden'>
    <div className='flex justify-between items-center px-3 sm:px-4 md:px-6'>
      {/* title & sidebar icon */}
      <div className='lg:m-4 flex items-center gap-2'>
        <HiMenu className='md:size-8 text-[#d5754d] lg:hidden size-5 sm:size-6' onClick={() => setIsOpen(true)}/>
        <p className="flex gap-1 items-center">
          <GiFireworkRocket className="p-1 sm:p-2 rounded-lg bg-[#d5754d] md:size-8 text-lg text-white size-5 sm:size-6" />
          <span className='font-bold font-outfit text-sm sm:text-md md:text-xl lg:text-lg italic text-[#d5754d] whitespace-nowrap'>
            <Link to='/'>Makra Depot</Link>
          </span>
        </p>
      </div>
      
      {/* menu list - desktop */}
      <div className='hidden lg:flex font-medium justify-between gap-5 whitespace-nowrap'>
        <div><Link to='/products' className="border-b-2 border-transparent hover:border-black hover:text-[#d5754d] transition-all duration-300 dark:text-white dark:hover:border-white">Products</Link></div>
        <div><Link to='/categories' className="border-b-2 border-transparent hover:border-black dark:hover:border-white hover:text-[#d5754d] transition-all duration-300 dark:text-white">Categories</Link></div>
        <div><Link to='/brands' className="border-b-2 border-transparent hover:border-black hover:text-[#d5754d] transition-all duration-300 dark:text-white dark:hover:border-white">Brands</Link></div>
        <div>
          <Link to='/quickbuy' className="transform border-transparent transition duration-300 bg-[#ffb684] px-4 py-1 rounded-full hover:bg-[#d5754d] hover:shadow-lg hover:scale-105 ease-in-out">Quick Buy</Link>
        </div>
        {/* {isLogged && 
          <div><Link to='/dashboard' className="border-b-2 border-transparent hover:border-black hover:text-[#d5754d] transition-all duration-300 dark:text-white dark:hover:border-white">Dashboard</Link></div> 
        } */}
      </div>

      {/* icons */}
      <div className='flex align-center justify-center gap-1 sm:gap-2 my-2'>
        {/* theme */}
        <div className='md:text-3xl flex text-gray-400 text-lg sm:text-xl' onClick={()=>toggleTheme()}>
          <button className='shadow-lg cursor-pointer transition duration-300 flex justify-between gap-1 bg-white rounded-full items-center'>
            <LuSun className={`size-5 sm:size-6 rounded-full p-1 mx-1 ${!darkMode && "bg-yellow-200/60 text-[#d5754d]"}`}/>
            <AiFillMoon className={`size-5 sm:size-6 rounded-full p-1 mx-1 ${darkMode && "bg-black text-white"}`}/>
          </button>
        </div>

        {/* search - show on tablet+ */}
        <div className='text-2xl sm:text-3xl text-[#d5754d] md:flex hidden'>
          <button className='cursor-pointer hover:scale-110 transition duration-300' title='Search Products'><Link to='/products'><HiSearch /></Link></button>
        </div>

        {/* wishlist - show on tablet+ */}
        <div className='relative text-2xl sm:text-3xl text-[#d5754d] items-center justify-center md:flex hidden'>
          <button className='cursor-pointer hover:scale-110 transition duration-300' title='Wishlist'><Link to='/wishlist'><HiMiniHeart /></Link></button>
          {wishCount >0 &&
            <span className='absolute text-white text-xs px-1 rounded-full bg-red-500 font-semibold translate-x-3 -translate-y-3 min-w-[16px] h-[16px] flex justify-center items-center'>{wishCount}</span> 
          }
        </div>

        {/* cart */}    
        <div className='relative text-2xl sm:text-3xl text-[#d5754d] flex items-center justify-center'>
          <button className='cursor-pointer hover:scale-110 transition duration-300' title='Cart'><Link to='/cart'><HiShoppingCart /></Link></button>
          {cartCount >0 && 
            <span className='absolute text-white text-xs bg-green-600 px-1 rounded-full font-semibold translate-x-3 -translate-y-3 min-w-[16px] h-[16px] flex justify-center items-center'>{cartCount}</span>
          }
        </div>
        
        {/* profile */}
          {isLogged &&
  <div className='group text-2xl sm:text-3xl text-[#d5754d] flex items-center gap-1 relative'>
    <button className='cursor-pointer group-hover:scale-110 transition duration-300 flex items-center'>
      <FaUser className='size-5 sm:size-6'/>
      <IoMdArrowDropdown className='size-3 sm:size-4 group-hover:rotate-180 transition duration-400'/>
    </button>
    {/* dropdown */}
    <div className='fixed top-16 right-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-[100]'>
      <div className='bg-white p-4 text-xs rounded-lg border border-[#d5754d]/30 w-[140px] sm:w-[150px] shadow-2xl'>
        <p className='font-bold'>{user?.name}</p>
        <p className='truncate'>{user?.email}</p>
        <div className='h-[1px] border my-2 border-gray-200'></div>
        {/* actions */}
        <div className='flex flex-col gap-1 font-semibold text-gray-700'>
          <Link to="/user">
            <p className='flex gap-1 items-center cursor-pointer hover:bg-[#ffb684] rounded-lg p-1 transition duration-200'>
              <PiUserCircleThin className='size-4 sm:size-5'/>
              Profile
            </p>
          </Link>
          <Link to="/orders">
            <p className='flex gap-1 items-center cursor-pointer hover:bg-[#ffb684] rounded-lg p-1 transition duration-200'>
              <PiPackageLight className='size-3 sm:size-4'/>
              My Orders
            </p>
          </Link>
        </div>
        <div className='h-[1px] border my-2 border-gray-200'></div>
        {/* log out */}
        <p 
          className='flex gap-1 items-center font-semibold text-gray-700 cursor-pointer hover:bg-red-500/90 rounded-lg py-1 px-2 hover:text-black transition duration-200' 
          onClick={()=>SignOut()}
        >
          <PiSignOutLight className='size-3 sm:size-4'/>
          Logout
        </p>
      </div>
    </div>
  </div>
}

        {/* login */}
        {(!getLoginLoc && !isLogged) && (
          <div>
            <button type='button' className='hidden md:flex md:py-2 md:px-4 rounded-xl bg-[#ffb684] hover:bg-[#d5754d] hover:cursor-pointer font-bold shadow-lg transition duration-300 text-sm'>
              <Link to='/login'>Sign In</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
  
  {/* mobile sidebar modal */}
  <div className='lg:hidden'>
    {isOpen && (
      <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 z-50 dark:text-white/80" onClick={() => setIsOpen(false)}>
        <div
          className={`fixed top-0 left-0 h-full w-48 sm:w-56 md:w-64 bg-[#fff9e6] dark:bg-gray-900 shadow-lg transform 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          transition-transform duration-500 ease-[cubic-bezier(0.22, 1, 0.36, 1)] will-change-transform`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* head */}
          <div className='px-4 pt-4'>
            <div className="flex justify-between items-center border-b-1 border-[#ffb684] pb-2">
              <h2 className="text-md font-bold">Hello !</h2>
              <span className='cursor-pointer text-lg' onClick={() =>setIsOpen(false)}><MdCancel /></span>
            </div>
          </div>
          
          {/* list */}
          <div className="flex flex-col p-4 gap-3 text-sm md:text-lg">
            <Link to='products' onClick={() => setIsOpen(false)} className='px-2'><span className="border-b-2 border-transparent hover:border-black hover:text-[#d5754d] transition-all duration-300 text-bold flex gap-2 items-center"><GiShoppingBag />Products</span></Link>
            <Link to='categories' onClick={() => setIsOpen(false)} className='px-2'><span className="border-b-2 border-transparent hover:border-black hover:text-[#d5754d] transition-all duration-300 text-bold flex gap-2 items-center"><TbCategoryFilled  />Categories</span></Link>
            <Link to='brands' onClick={() => setIsOpen(false)} className='px-2'><span className="border-b-2 border-transparent hover:border-black hover:text-[#d5754d] transition-all duration-300 text-bold flex gap-2 items-center"><MdBrandingWatermark  />Brands</span></Link>
            <Link to='wishlist' onClick={() => setIsOpen(false)} className='px-2'><span className="border-b-2 border-transparent hover:border-black hover:text-[#d5754d] transition-all duration-300 text-bold flex gap-2 items-center md:hidden"><IoMdHeart  />Wishlist</span></Link>
            <Link to='quickbuy'><p className='flex gap-2 items-center justify-center text-black font-bold bg-[#ffb684] cursor-pointer rounded-lg py-1 px-2 hover:text-black mt-2' onClick={()=>{setIsOpen(false);}}>
                  <span><IoRocket  className='size-4'/> </span>Quickbuy
                </p></Link>
          </div>
          
          {/* settings */}
          <div className='px-4 pt-4'>
            <div className="flex justify-between items-center border-b-1 border-[#ffb684] pb-2">
              <h2 className="text-md font-bold">Help & Settings</h2>
            </div>
          </div>
          
          <div className="flex flex-col p-4 gap-3 text-sm md:text-lg">
            <Link to='contact' onClick={() => getDetails()} className='px-2'><span className="border-b-2 border-transparent hover:border-black hover:text-[#d5754d] transition-all duration-300 text-bold flex items-center gap-2"><MdOutlineContactPhone />Contact Us</span></Link>
            {isLogged ? 
              <>
                <Link to='user' onClick={() => setIsOpen(false)} className='px-2'><span className="border-b-2 border-transparent hover:border-black hover:text-[#d5754d] transition-all duration-300 text-bold flex items-center gap-2"><FaCircleUser />Your Account</span></Link>
                <p className='flex gap-2 items-center justify-center text-black font-bold cursor-pointer bg-red-500/90 rounded-lg py-1 px-2 hover:text-black mt-2' onClick={()=>{SignOut(); setIsOpen(false);}}>
                  <span><PiSignOutLight className='size-4'/> </span>Logout
                </p>
              </>
            :
              <>
                <Link to='/login' onClick={() => setIsOpen(false)} className='px-2'><span className="border-b-2 border-transparent hover:border-black hover:text-[#d5754d] transition-all duration-300 text-bold flex items-center gap-2"><PiSignInBold /> Sign In</span></Link>
              </>
            }
          </div>
        </div>
      </div>
    )}
  </div>
</>
  )
}

export default Nav