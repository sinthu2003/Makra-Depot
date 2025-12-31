import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegCalendar, FaShieldAlt, FaTransgender, FaUser } from 'react-icons/fa'
import { userDetails } from '../../api'
import { GoHeartFill, GoSignOut } from 'react-icons/go'
import { MdMail, MdOutlineLocalPhone, MdOutlinePayment, MdShoppingCart } from 'react-icons/md'
import { RiBuilding2Line } from 'react-icons/ri'
import { PiHandCoinsBold, PiPackageBold } from 'react-icons/pi'
import { CountContext } from '../Navbar/CountContext'

const UserProfile = () => {

    const [user,setUser] = useState()

    const nav = useNavigate()
    
    const {setCartCount,setWishCount } = useContext(CountContext);
  
    useEffect(() => {
       getData()
    },[])

    const getData= async() => {
      try{
          const response = await userDetails()
          if (response?.status === 200 || response?.status === 201) {
            setUser(response.data.data)
          }
      }
      catch(e){
          console.log(e)
      }
    }

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
      <div className="flex flex-col py-8 sm:py-12 lg:py-20 w-[90%] sm:w-[80%] lg:w-[60%] gap-4 sm:gap-5 mx-auto">
  {/* user card */}
  <div className='bg-[#d5754d] px-4 sm:px-8 lg:px-12 py-4 sm:py-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 rounded-md'>
    <div className='bg-[#ffb684] p-4 sm:p-6 rounded-full'>
      <FaUser className='size-6 sm:size-8'/>
    </div>
    {/* details */}
    <div className='flex flex-col gap-1 text-center sm:text-left'>
      <p className='font-bold text-base sm:text-lg'>{user?.name}</p>
      <p className='text-xs sm:text-sm'>{user?.email}</p>
      <p className='text-xs sm:text-sm'>Member since {new Date(user?.createdAt).toLocaleDateString('en-GB')}</p>
    </div>
  </div>

  {/* count */}
  <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between dark:text-white'>
    <div className='py-3 sm:py-4 px-4 sm:px-6 lg:px-10 border border-[#d5754d]/60 shadow rounded-lg flex items-center justify-between sm:justify-start gap-4 sm:gap-6 lg:gap-8'>
      <p className='text-xs sm:text-md flex flex-col whitespace-nowrap'>
        Total Orders
        <span className='font-bold text-lg sm:text-xl'>{user?.totalOrders}</span>
      </p>
      <PiPackageBold className='size-6 sm:size-8 text-[#d5754d] flex-shrink-0'/>
    </div>
    <div className='py-3 sm:py-4 px-4 sm:px-6 lg:px-10 border border-[#d5754d]/60 shadow rounded-lg flex items-center justify-between sm:justify-start gap-4 sm:gap-6 lg:gap-8'>
      <p className='text-xs sm:text-md flex flex-col whitespace-nowrap'>
        Total Spent
        <span className='font-bold text-lg sm:text-xl'>₹{user?.totalSpent}</span>
      </p>
      <PiHandCoinsBold className='size-6 sm:size-8 text-[#d5754d] flex-shrink-0'/>
    </div>
    <div className='py-3 sm:py-4 px-4 sm:px-6 lg:px-10 border border-[#d5754d]/60 shadow rounded-lg flex items-center justify-between sm:justify-start gap-4 sm:gap-6 lg:gap-8'>
      <p className='text-xs sm:text-md flex flex-col whitespace-nowrap'>
        Wishlist Items
        <span className='font-bold text-lg sm:text-xl'>{user?.wishlist?.length || 0}</span>
      </p>
      <GoHeartFill className='size-6 sm:size-8 text-[#d5754d] flex-shrink-0'/>
    </div>
  </div>

  {/* form */}
  <div className='border border-[#d5754d]/60 shadow rounded-lg py-4 px-4 sm:px-6 lg:px-8 flex flex-col gap-4 dark:text-white'>
    <p className='border-b border-[#d5754d]/30 font-medium text-sm sm:text-base'>Personal Info</p>
    <form>
      <div className='flex flex-col gap-2 w-full mb-3'>
        <label className='font-medium text-xs sm:text-sm flex gap-1 items-center'>
          <FaUser className='size-3'/> Name
        </label>
        <input 
          type="name" 
          id="name" 
          className='px-3 sm:px-4 py-2 outline-none bg-gray-200/90 dark:bg-gray-800 rounded-lg font-semibold text-sm' 
          value={user?.name}
          readOnly
        />
      </div>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
        <div className='flex flex-col gap-2'>
          <label className='font-medium text-xs sm:text-sm flex gap-1 items-center'>
            <MdMail className='size-3'/>Email
          </label>
          <input 
            type="email" 
            id="email" 
            className='px-3 sm:px-4 py-2 outline-none bg-gray-200/90 dark:bg-gray-800 rounded-lg font-semibold text-sm' 
            value={user?.email}
            readOnly
          />
        </div>
        
        <div className='flex flex-col gap-2'>
          <label className='font-medium text-xs sm:text-sm flex gap-1 items-center'>
            <FaRegCalendar className='size-3'/>Date of Birth
          </label>
          <input 
            type="date" 
            className='px-3 sm:px-4 py-2 outline-none bg-gray-200/90 dark:bg-gray-800 rounded-lg font-semibold text-sm' 
            id="dateOfBirth" 
            value={user?.dateOfBirth}
            readOnly
          />
        </div>
        
        <div className='flex flex-col gap-2'>
          <label className='font-medium text-xs sm:text-sm flex gap-1 items-center'>
            <FaTransgender className='size-3'/>Gender
          </label>
          <select 
            className='px-3 sm:px-4 py-2 outline-none bg-gray-200/90 dark:bg-gray-800 rounded-lg font-semibold text-sm' 
            id="gender" 
            defaultValue="" 
            disabled
          >
            <option value="">Other</option>
          </select>
        </div>
        
        <div className='flex flex-col gap-2'>
          <label className='font-medium text-xs sm:text-sm flex gap-1 items-center'>
            <MdOutlinePayment className='size-3'/>Preferred Payment
          </label>
          <input 
            type="text" 
            className='px-3 sm:px-4 py-2 outline-none bg-gray-200/90 dark:bg-gray-800 rounded-lg font-semibold text-sm' 
            value={user?.preferredPaymentMethod}
            readOnly
          />
        </div>
        
        <div className='flex flex-col gap-2'>
          <label className='font-medium text-xs sm:text-sm flex gap-1 items-center'>
            <MdOutlineLocalPhone className='size-3'/>Primary Phone
          </label>
          <input 
            type="text" 
            className='px-3 sm:px-4 py-2 outline-none bg-gray-200/90 dark:bg-gray-800 rounded-lg font-semibold text-sm' 
            value={user?.phone}
            readOnly
          />
        </div>
        
        <div className='flex flex-col gap-2'>
          <label className='font-medium text-xs sm:text-sm flex gap-1 items-center'>
            <MdOutlineLocalPhone className='size-3'/>Whatsapp Number
          </label>
          <input 
            type="text" 
            className='px-3 sm:px-4 py-2 outline-none bg-gray-200/90 dark:bg-gray-800 rounded-lg font-semibold text-sm' 
            value={user?.phone}
            readOnly
          />
        </div>
      </div>
      
      {user?.shippingAddresses?.length > 0 && 
        <div className='flex flex-col gap-2 w-full mt-4'>
          <label className='font-medium text-xs sm:text-sm flex gap-1 items-center'>
            <RiBuilding2Line className='size-3'/> Addresses
          </label>
          <div className='space-y-2'>
            {user?.shippingAddresses.map((add,index)=> (
              <div className='px-3 sm:px-4 py-2 outline-none bg-gray-200/90 dark:bg-gray-800 rounded-lg font-semibold text-sm flex flex-col gap-1' key={index}>
                {add.isDefault && <p className='text-xs p-1 bg-black/40 text-white inline-block rounded-lg w-fit'>Default</p>}
                <p className='text-xs'>{add.street}, {add.city}</p>
                <p className='text-xs'>{add.state} - {add.zipCode}</p>
              </div>
            ))}
          </div>
        </div>
      }
    </form>
  </div>

  {/* action */}
  <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 dark:text-white'>
    <button className='w-full px-4 sm:px-6 py-2 sm:py-3 flex gap-1 justify-center items-center border border-[#d5754d] hover:bg-[#d5754d] rounded-lg font-semibold hover:-translate-y-1 cursor-pointer transition duration-300 hover:shadow-2xl dark:hover:text-black text-sm sm:text-base'>
      <PiPackageBold className='size-4 sm:size-5'/>
      <Link to="/orders">My Orders</Link>
    </button>
    <button className='w-full px-4 sm:px-6 py-2 sm:py-3 flex gap-2 justify-center items-center border border-[#d5754d] hover:bg-[#d5754d] rounded-lg font-semibold hover:-translate-y-1 cursor-pointer transition duration-300 hover:shadow-2xl text-sm sm:text-base'>
      <GoHeartFill className='size-4 sm:size-5'/>
      <Link to="/wishlist">My Wishlist</Link>
    </button>
    <button className='w-full px-4 sm:px-6 py-2 sm:py-3 flex gap-2 justify-center items-center border border-[#d5754d] hover:bg-[#d5754d] rounded-lg font-semibold hover:-translate-y-1 cursor-pointer transition duration-300 hover:shadow-2xl text-sm sm:text-base'>
      <MdShoppingCart className='size-4 sm:size-5'/>
      <Link to="/cart">My Cart</Link>
    </button>
    <button className='w-full px-4 sm:px-6 py-2 sm:py-3 flex gap-2 justify-center items-center bg-red-500/90 border border-[#d5754d] rounded-lg font-semibold hover:-translate-y-1 cursor-pointer transition duration-300 hover:shadow-2xl dark:hover:text-black text-sm sm:text-base' onClick={()=>SignOut()}>
      <GoSignOut className='size-4 sm:size-5'/> 
      Sign out
    </button>
  </div>
</div>
    </>

    )
}

export default UserProfile