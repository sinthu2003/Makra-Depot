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
      <div className="flex flex-col py-20 w-[60%] gap-5 mx-auto">
        {/* user card */}
        <div className='bg-[#d5754d] px-12 py-6 flex rounded-md items-center gap-4'>
            <div className='bg-[#ffb684] p-6 rounded-full'>
              <FaUser className='size-8'/>
            </div>
            {/* details */}
            <div className='flex flex-col gap-1'>
                <p className='font-bold text-lg'>{user?.name}</p>
                <p className='text-sm'>{user?.email}</p>
                <p className='text-sm'>Member since {new Date(user?.createdAt).toLocaleDateString('en-GB')}</p>
            </div>
        </div>

        {/* count */}
        <div className='flex gap-4 justify-between dark:text-white'>
            <div className='py-4 px-10 border border-[#d5754d]/60 shadow rounded-lg flex items-center gap-8'>
              <p className='text-md flex flex-col'>Total Orders<span className='font-bold text-xl'>{user?.totalOrders}</span></p>
              <PiPackageBold  className='size-8 text-[#d5754d]'/>
            </div>
            <div className='py-4 px-10 border border-[#d5754d]/60 shadow rounded-lg flex items-center gap-8'>
              <p className='text-md flex flex-col'>Total Spent<span className='font-bold text-xl'>{user?.totalSpent}</span></p>
              <PiHandCoinsBold  className='size-8 text-[#d5754d]'/>
            </div>
            <div className='py-4 px-10 border border-[#d5754d]/60 shadow rounded-lg flex items-center gap-8'>
              <p className='text-md flex flex-col'>Wishlist Items<span className='font-bold text-xl'>{user?.wishlist.length}</span></p>
              <GoHeartFill className='size-8 text-[#d5754d]'/>
            </div>
        </div>

        {/* form */}
        <div className='border border-[#d5754d]/60 shadow rounded-lg py-4 px-8 flex flex-col gap-4 dark:text-white'>
            <p className='border-b border-[#d5754d]/30 font-medium'>Personal Info</p>
            <form>
                <div className='flex flex-col gap-2 w-full'>
                    <label className='font-medium text-sm flex gap-1 items-center'><FaUser className='size-3'/> Name</label>
                    <input type="name" id="name" className='px-4 py-2 outline-none bg-gray-200/90 dark:bg-black rounded-lg px-4 font-semibold text-sm' value={user?.name}/>
                </div>
                <div className='grid grid-cols-2 my-3 gap-3'>
                    <div className='flex flex-col gap-2'>
                      <label className='font-medium text-sm flex gap-1 items-center'><MdMail className='size-3'/>Email</label>
                        <input type="email" id="email" className='px-4 py-2 outline-none bg-gray-200/90 rounded-lg px-4 font-semibold text-sm dark:bg-black' value={user?.email}/>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label className='font-medium text-sm flex gap-1 items-center'><FaRegCalendar className='size-3'/>Date of Birth</label>
                        <input type="date" className='px-4 py-2 outline-none bg-gray-200/90 dark:bg-black rounded-lg px-4 font-semibold text-sm' id="dateOfBirth" value={user?.dateOfBirth}/>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label className='font-medium text-sm flex gap-1 items-center'><FaTransgender className='size-3'/>Gender</label>
                        <select className='px-4 py-2 outline-none bg-gray-200/90 rounded-lg px-4 font-semibold text-sm dark:bg-black' id="gender" defaultValue="" disabled>
                          <option value="">Other</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label className='font-medium text-sm flex gap-1 items-center'><MdOutlinePayment className='size-3'/>Preferred Payment Method</label>
                        <input type="text" className='px-4 py-2 outline-none bg-gray-200/90 dark:bg-black rounded-lg px-4 font-semibold text-sm' id="tier" value={user?.preferredPaymentMethod}/>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label className='font-medium text-sm flex gap-1 items-center'><MdOutlineLocalPhone className='size-3'/>Primary Phone</label>
                        <input type="text" className='px-4 py-2 outline-none bg-gray-200/90 dark:bg-black rounded-lg px-4 font-semibold text-sm' id="tier" value={user?.phone}/>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label className='font-medium text-sm flex gap-1 items-center'><MdOutlineLocalPhone className='size-3'/>Whatsapp Number</label>
                        <input type="text" className='px-4 py-2 outline-none bg-gray-200/90 dark:bg-black rounded-lg px-4 font-semibold text-sm' id="tier" value={user?.phone}/>
                    </div>
                </div>
                {user?.shippingAddresses?.length > 0 && 
                <div className='flex flex-col gap-2 w-full'>
                    <label className='font-medium text-sm flex gap-1 items-center'><RiBuilding2Line className='size-3'/> Addresses</label>
                    {user?.shippingAddresses.map((add,index)=> (
                      // <input type="name" id="name" className='px-4 py-2 outline-none bg-gray-200/90 rounded-lg px-4 font-semibold text-sm' value={add.street}/>
                      <div className='px-4 py-2 outline-none bg-gray-200/90 dark:bg-black rounded-lg px-4 font-semibold text-sm flex flex-col gap-1' key={index}>
                        {add.isDefault && <p className='text-xs p-1 bg-black/40 text-white inline-block rounded-lg w-fit'>Default</p>}
                        <p className='text-xs'>{add.street},{add.city}</p>
                        <p className='text-xs'>{add.state}- {add.zipCode}</p>
                      </div>
                    ))}
                </div> }
            </form>
        </div>

        {/* action */}
        <div className='flex justify-between w-full gap-4 grid grid-cols-2 dark:text-white'>
          <button className='w-full px-10 py-2 flex gap-1 justify-center items-center border border-[#d5754d] hover:bg-[#d5754d] rounded-lg shadowfont-semibold hover:-translate-y-1 cursor-pointer transition duration-300 hover:shadow-2xl dark:hover:text-black'><PiPackageBold /><Link to="/orders">My Orders</Link></button>
          <button className='w-full px-10 py-2 flex gap-2 justify-center items-center border border-[#d5754d] bg-[#d5754d] rounded-lg shadowfont-semibold hover:-translate-y-1 cursor-pointer transition duration-300 hover:shadow-2xl dark:text-black'><GoHeartFill/><Link to="/wishlist">My Wishlist</Link></button>
          <button className='w-full px-10 py-2 flex gap-2 justify-center items-center border border-[#d5754d] bg-[#d5754d] rounded-lg shadowfont-semibold hover:-translate-y-1 cursor-pointer transition duration-300 hover:shadow-2xl dark:text-black'><MdShoppingCart className='size-5'/><Link to="/cart">My Cart</Link></button>
          <button className='w-full px-10 py-2 flex gap-2 justify-center items-center hover:bg-red-500/90 border border-[#d5754d] shadow rounded-lg font-semibold hover:-translate-y-1 cursor-pointer transition duration-300 hover:shadow-2xl dark:hover:text-black' onClick={()=>SignOut()}><GoSignOut /> Sign out</button>
        </div>
      </div>
    </>

    )
}

export default UserProfile