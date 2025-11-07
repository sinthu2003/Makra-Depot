import React, { useEffect, useState } from 'react'
import { myOrders } from '../../api'
import { GoClock } from 'react-icons/go'
import { MdOutlinePayment } from 'react-icons/md'
import { FaRegCalendar } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { FiSearch } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import Invoice from './Invoice'

const MyOrders = () => {
    const [orders,setOrders] = useState([])
    const [filterOrd,setFilterOrd] = useState([])
    const {register,watch}=useForm() 
    const val = watch('search')

    useEffect(()=> {
      getMyOrders()
    },[])

    useEffect(() => {
        if(val){
          const result = orders.filter((prd) =>
             prd.orderNumber.toLowerCase().includes(val.toLowerCase()) ||
             prd.items.some((item) => 
              item.productName.toLowerCase().includes(val.toLowerCase())
            )
        )
          setFilterOrd(result)
        }
        else{
          setFilterOrd(orders)
        }
    },[val,orders])

    const getMyOrders = async() => {
        const res = await myOrders()
        if(res.status== 200 || res.status == 201){
            const arr = res.data.data
            setOrders(arr)
        }
    }

    const reverseOrder = (desc :string) => {
      if(desc == "new"){
        setFilterOrd([...filterOrd].reverse())
      }
      else{
        setFilterOrd([...orders])
      }
    }

  return (
    <>
      <div className='my-10 w-[80%] flex flex-col mx-auto gap-5 min-h-screen'>
        {/* head */}
        <div className='flex flex-col gap-1 dark:text-white'>
            <p className='font-bold text-2xl'>My Orders</p>
            <p className='font-normal'>Track and manage your orders</p>
        </div>
        {/* filters */}
          <div className='w-full flex gap-2 dark:text-white'>
            {/* search */}
            <div className='w-[80%] rounded-lg border border-[#d5754d] flex gap-1 items-center px-4 text-gray-600'>
                <FiSearch />
                <input type="search" {...register('search')} placeholder='Search by Order Number or Product...' className='w-full py-2 text-sm outline-none text-black dark:text-white'/>
            </div>
            {/* select */}
            <select className='w-[20%] rounded-lg border border-[#d5754d] text-sm outline-none px-2' onChange={(e)=>reverseOrder(e.target.value)}>
              <option value="old" className='dark:text-black'>Oldest First</option>
              <option value="new" className='dark:text-black'>Most Recent</option>
            </select>
          </div>
        {/* items */}
        <div className='flex flex-col gap-4'>
            {filterOrd.map((prd) => (
                <div className='w-full border border-[#d5754d] rounded-lg shadow hover:shadow-xl hover:scale-102 p-4 transition duration-300 flex flex-col gap-2 bg-white/60' key={prd.id}>
                  {/* order details */}
                  <div className='flex justify-between'>
                    <div className='flex flex-col gap-2'>
                      <div className='flex gap-4'>
                          <p className='font-semibold'>Order #{prd.orderNumber}</p>
                          <p className='font-semibold flex items-center text-xs gap-1 p-1 bg-yellow-200/60 rounded-lg text-gray-600'><GoClock className='size-4'/><span>{prd.status.charAt(0).toUpperCase()+prd.status.slice(1)}</span></p>
                          <p className='font-semibold flex items-center text-xs gap-1 text-red-400 rounded-lg'>Payment {prd.paymentStatus.charAt(0).toUpperCase()+prd.paymentStatus.slice(1)}</p>
                      </div>
                      <div className='flex gap-4 text-gray-600'>
                          <p className='font-semibold flex items-center text-xs gap-1'><FaRegCalendar className='size-3'/><span>{new Date(prd.createdAt).toLocaleDateString('en-GB')}</span></p>
                          <p className='font-semibold flex items-center text-xs gap-1'><MdOutlinePayment className='size-4'/><span>₹{prd.total}</span></p>
                          <p className='font-semibold flex items-center text-xs gap-1'><FaLocationDot className='size-3'/><span>{prd.shippingAddress.city}</span></p>
                      </div>
                    </div>
                    {/* invoice */}
                    <div>
                        <Invoice invoice={prd}/>
                    </div>
                  </div>
                  {/* line */}
                  <div className='h-[1px] border border-[#ffb684]/40'></div>
                  {/* prd */}
                  <div className='flex flex-col py-4 gap-4'>
                        {prd?.items.map((item) => (
                          <div className='flex justify-between' key={item.productId}>
                            <div className='flex gap-2'>
                              <img src="/assets/Product/Product.webp" className='w-15 h-15 rounded-lg'/>
                              {/* price */}
                              <div className='flex flex-col gap-1'>
                                <p className='font-semibold text-xs whitespace-nowrap word-break'>{item.productName}</p>
                                <p className='text-xs text-gray-700 whitespace-nowrap'>Qty: {item.quantity} x ₹{item.price}</p>
                              </div>
                            </div>
                            <div>
                              <p className='font-bold text-sm'>₹{item.quantity * item.price}</p>
                            </div>
                          </div>
                        ))}
                  </div>
                  {/* line */}
                  <div className='h-[1px] border border-[#ffb684]/40'></div>
                  
                  {/* sub total */}
                  <div className='text-xs text-gray-600 font-semibold'>
                    <p className='flex items-center justify-between'>Subtotal<span>₹{prd?.subtotal}</span></p>
                    <p className='flex items-center justify-between'>Shipping<span className='italic'>Charges decided by lorry service</span></p>
                  </div>
                  {/* line */}
                  <div className='h-[1px] border border-[#ffb684]/40'></div>
                  {/* total */}
                  <div className='text-lg font-bold'>
                    <p className='flex items-center justify-between'>Total<span>
                      {prd.discount > 0 && <span className='text-green-600 text-xs mx-1'>{prd.discount}% discount applied </span>}
                      ₹{prd.total}</span></p>
                  </div>
                </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default MyOrders