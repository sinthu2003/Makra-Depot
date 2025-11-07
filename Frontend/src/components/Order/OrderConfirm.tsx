import React from 'react'
import { GiFireworkRocket } from 'react-icons/gi'
import { Link, useLocation } from 'react-router-dom'
import { LuPackageOpen } from 'react-icons/lu'
import { IoLocationOutline } from 'react-icons/io5'
import { FaRegNoteSticky } from 'react-icons/fa6'
import { FaLightbulb } from 'react-icons/fa'
import { RiShoppingBag3Line } from 'react-icons/ri'
import { FiHome } from 'react-icons/fi'
import Invoice from './Invoice'

const OrderConfirm = () => {
  const loc = useLocation()
  const orderInfo= loc.state.orderInfo
  return (
    <>
      <div className='my-4 w-[60%] min-h-screen mx-auto flex flex-col gap-5'>
          {/* success msg */}
          <div className='bg-green-200 rounded-lg px-10 py-8 flex items-center justify-between'>
              <div>
                   <GiFireworkRocket className='size-8' />
                    <p className='font-bold text-lg flex flex-col'>Order Successfully Placed
                      <span className='text-sm font-normal'>Order #{orderInfo.orderNumber} - {new Date(orderInfo.createdAt).toLocaleDateString('en-GB')}</span>
                    </p>
              </div>
              <div>
                  <Invoice invoice={orderInfo}/>
              </div>
          </div>
          {/* items */}
          <div className='flex flex-col gap-4 dark:text-white'>
            <p className='flex gap-1 items-center font-bold text-xl'><LuPackageOpen className='text-[#d5754d]'/>Order Items</p>
            {orderInfo.items.map((prd) => (
              <div className='flex gap-2 border-b border-[#ffb684]/80' key={prd._id}>
                <img src="/assets/Product/Product.webp" className='w-15 h-15 rounded-lg'/>
                {/* price */}
                <div className='flex flex-col gap-1 mb-2'>
                  <p className='font-bold text-xs whitespace-nowrap word-break'>{prd.productName}</p>
                  {/* <p className='text-xs text-gray-700 whitespace-nowrap word-break'>SKU: {prd.sku}</p>
                  <p className='text-xs text-gray-700 whitespace-nowrap word-break'>Brand: {prd.brand}</p> */}
                  <p className='text-xs whitespace-nowrap'>Qty: {prd.price} ₹{prd.price} each <span className='font-bold'>₹{prd.subtotal}</span></p>
                </div>
              </div>
            ))
            }
            {/* flex */}
            <div className='flex justify-between gap-3'>
            {/* address */}
                <div className='w-[70%]'>
                  <p className='flex gap-1 items-center font-bold text-xl'><IoLocationOutline className='text-[#d5754d]'/>Delivery Address</p>
                  <div className='flex flex-col gap-2'>
                    <p className='text-md font-semibold'>{orderInfo.customerName}</p>
                    <p className='text-xs'>{orderInfo.shippingAddress.street},{orderInfo.shippingAddress.city}</p>
                    <p className='text-xs'>{orderInfo.shippingAddress.state}- {orderInfo.shippingAddress.zipCode}</p>
                    <p className='text-xs'>{orderInfo.shippingAddress.country}</p>
                    <p className='text-xs'>Phone : {orderInfo.customerPhone}</p>
                    <p className='px-6 py-2 bg-yellow-200/40 rounded-lg text-xs flex gap-1 items-center'><FaLightbulb />Payment will be collected offline at the time of delivery</p>
                  </div>
                </div>
              {/* order summary */}
              <div className='flex flex-col gap-2'>
                  <p className='flex gap-1 items-center font-bold text-xl'><FaRegNoteSticky className='text-[#d5754d]'/>Order Summary</p>
                  <p className='flex text-sm justify-between '>Subtotal <span>₹{orderInfo.subtotal}</span></p>
                  <p className='flex text-sm justify-between '>Shipping <span>{orderInfo.shipping == 0? 'FREE' : orderInfo.shipping}</span></p>
                  <div className='h-[1px] border border-[#ffb684]/40'></div>
                  {orderInfo.discount >0 &&<p className='text-xs text-green-600 font-semibold'>{orderInfo.discount}% discount applied</p>}
                  <p className='text-md font-semibold flex justify-between'>Total <span>₹{orderInfo.total}</span></p>
                  <div className='bg-[#ffb684] rounded-lg px-2 py-1'>
                      <p className='text-xs flex justify-between dark:text-black'>Order Status <span className='text-red-500'>{orderInfo.status.charAt(0).toUpperCase()+orderInfo.status.slice(1)}</span></p>
                      <p className='text-xs flex justify-between dark:text-black'>Payment Status <span className='text-red-500'>{orderInfo.paymentStatus.charAt(0).toUpperCase()+orderInfo.paymentStatus.slice(1)}</span></p>
                  </div>
              </div>
            </div>

            {/* action flex */}
            <div className='flex justify-between mt-10 gap-4'>
              <button className='justify-center flex gap-2 py-2 items-center bg-[#ffb684] hover:bg-[#d5754d] rounded-lg shadowfont-semibold hover:-translate-y-1 cursor-pointer transition duration-300 hover:shadow-2xl w-full  dark:text-black'><LuPackageOpen/><Link to="/orders">View My Orders</Link></button>
              <button className='w-full justify-center flex gap-2 py-2 items-center hover:bg-[#d5754d] border border-[#d5754d] shadow rounded-lg font-semibold hover:-translate-y-1 cursor-pointer transition duration-300 hover:shadow-2xl  dark:hover:text-black'><RiShoppingBag3Line  /><Link to="/products">Continue Shopping</Link></button>
              <button className='w-full justify-center flex gap-2 py-2 items-center hover:bg-[#d5754d] border border-[#d5754d] rounded-lg shadow font-semibold hover:-translate-y-1 cursor-pointer transition duration-300 hover:shadow-2xl dark:hover:text-black'><FiHome/><Link to="/">Go to Home</Link></button>
            </div>
          </div>
      </div>
    </>
  )
}

export default OrderConfirm