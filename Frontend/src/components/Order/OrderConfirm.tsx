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
import QrCodeGenerator from './QrCodeGenerator'

const OrderConfirm = () => {
  const loc = useLocation()
  const orderInfo= loc.state.orderInfo

  const isLikelyImageUrl = (str) =>
  /^https?:\/\//.test(str) || str.startsWith("/") || str.startsWith("data:");
  
  return (
    <>
     <div className='my-4 w-[90%] sm:w-[80%] lg:w-[60%] min-h-screen mx-auto flex flex-col gap-4 sm:gap-5'>
  {/* success msg */}
  <div className='bg-green-200 rounded-lg px-4 sm:px-6 lg:px-10 py-1 sm:py-2 flex flex-col sm:flex-row items-center justify-between gap-4'>
    {/* msg */}
    <div className='flex items-center gap-3'>
      <GiFireworkRocket className='size-6 sm:size-8' />
      <div>
        <p className='font-bold text-base sm:text-lg'>Order Successfully Placed</p>
        <span className='text-xs sm:text-sm font-normal block mt-1'>
          Order #{orderInfo.orderNumber} - {new Date(orderInfo.createdAt).toLocaleDateString('en-GB')}
        </span>
      </div>
    </div>

      {/* QR Code Section */}
      <div className='bg-white p-3 rounded-lg shadow-md border border-gray-200'>
        <div className='text-center mb-2'>
          <p className='text-xs font-semibold text-gray-600'>Scan with GPay</p>
        </div>
        <div className='flex justify-center'>
          <QrCodeGenerator 
            value={`upi://pay?pa=9894383645@upi&pn=Makra Depot&am=${orderInfo.total}&cu=INR&tn=Order${orderInfo.orderNumber}`}
            size={96}
          />
        </div>
      </div>

    {/* invoice */}
    <Invoice invoice={orderInfo}/>
  </div>
  
  {/* items */}
  <div className='flex flex-col gap-4 dark:text-white'>
    <p className='flex gap-1 items-center font-bold text-lg sm:text-xl'>
      <LuPackageOpen className='text-[#d5754d] size-5 sm:size-6'/>
      Order Items
    </p>
    
    {orderInfo.items.map((prd) => (
      <div className='flex gap-3 border-b border-[#ffb684]/80 pb-3' key={prd._id}>
        {/* img */}
        {prd?.image && isLikelyImageUrl(prd.image) ? (
          <img src={prd.image} className='w-12 h-12 sm:w-15 sm:h-15 rounded-lg object-cover flex-shrink-0' />
        ) : (
          <img src={'/assets/Product/Product.webp'} className='w-12 h-12 sm:w-15 sm:h-15 rounded-lg object-cover flex-shrink-0' />
        )}

        {/* price */}
        <div className='flex flex-col gap-1 flex-1'>
          <p className='font-bold text-xs sm:text-sm line-clamp-2'>{prd.productName}</p>
          <p className='text-xs whitespace-nowrap'>
            Qty: {prd.quantity} x ₹{prd.price} each 
            <span className='font-bold ml-2'>₹{prd.subtotal}</span>
          </p>
        </div>
      </div>
    ))}
    
    {/* flex container for address and summary */}
    <div className='flex flex-col lg:flex-row justify-between gap-6'>
      {/* address */}
      <div className='w-full lg:w-[70%]'>
        <p className='flex gap-1 items-center font-bold text-lg sm:text-xl mb-3'>
          <IoLocationOutline className='text-[#d5754d] size-5 sm:size-6'/>
          Delivery Address
        </p>
        <div className='flex flex-col gap-2 bg-gray-50 border border-[#ffb684] dark:bg-gray-800 p-4 rounded-lg'>
          <p className='text-sm sm:text-md font-semibold'>{orderInfo.customerName}</p>
          <p className='text-xs'>{orderInfo.shippingAddress.street}, {orderInfo.shippingAddress.city}</p>
          <p className='text-xs'>{orderInfo.shippingAddress.state} - {orderInfo.shippingAddress.zipCode}</p>
          <p className='text-xs'>{orderInfo.shippingAddress.country}</p>
          <p className='text-xs'>Phone: {orderInfo.customerPhone}</p>
          <p className='px-4 py-2 bg-yellow-200/40 rounded-lg text-xs flex gap-1 items-center mt-2 dark:text-black'>
            <FaLightbulb className='flex-shrink-0'/>
            Payment will be collected offline at the time of delivery
          </p>
        </div>
      </div>
      
      {/* order summary */}
      <div className='w-full lg:w-auto flex-1'>
        <p className='flex gap-1 items-center font-bold text-lg sm:text-xl mb-3'>
          <FaRegNoteSticky className='text-[#d5754d] size-5 sm:size-6'/>
          Order Summary
        </p>
        <div className='bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-[#ffb684]'>
          <p className='flex text-sm justify-between mb-2'>
            Subtotal <span>₹{orderInfo.subtotal}</span>
          </p>
          <p className='flex text-sm justify-between mb-2'>
            Shipping <span>{orderInfo.shipping == 0 ? 'FREE' : `₹${orderInfo.shipping}`}</span>
          </p>
          <div className='h-[1px] border border-[#ffb684]/40 my-2'></div>
          {orderInfo.discount > 0 && (
            <p className='text-xs text-green-600 font-semibold mb-2'>
              {orderInfo.discount}% discount applied
            </p>
          )}
          <p className='text-md font-semibold flex justify-between'>
            Total <span>₹{orderInfo.total}</span>
          </p>
          <div className='bg-[#ffb684] rounded-lg px-3 py-2 mt-3'>
            <p className='text-xs flex justify-between dark:text-black mb-1'>
              Order Status <span className='text-red-500'>{orderInfo.status.charAt(0).toUpperCase() + orderInfo.status.slice(1)}</span>
            </p>
            <p className='text-xs flex justify-between dark:text-black'>
              Payment Status <span className='text-red-500'>{orderInfo.paymentStatus.charAt(0).toUpperCase() + orderInfo.paymentStatus.slice(1)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* action buttons */}
    <div className='flex flex-col sm:flex-row justify-between gap-3 mt-6 sm:mt-10'>
      <button className='justify-center flex gap-2 py-2 sm:py-3 items-center bg-[#ffb684] hover:bg-[#d5754d] rounded-lg font-semibold hover:-translate-y-1 cursor-pointer transition duration-300 hover:shadow-2xl w-full dark:text-black md:text-sm text-xs'>
        <LuPackageOpen className='size-4 sm:size-5'/>
        <Link to="/orders">View My Orders</Link>
      </button>
      <button className='w-full justify-center flex gap-2 py-2 sm:py-3 items-center hover:bg-[#d5754d] border border-[#d5754d] rounded-lg font-semibold hover:-translate-y-1 cursor-pointer transition duration-300 hover:shadow-2xl dark:hover:text-black md:text-sm text-xs'>
        <RiShoppingBag3Line className='size-4 sm:size-5'/>
        <Link to="/products">Continue Shopping</Link>
      </button>
      <button className='w-full justify-center flex gap-2 py-2 sm:py-3 items-center hover:bg-[#d5754d] border border-[#d5754d] rounded-lg font-semibold hover:-translate-y-1 cursor-pointer transition duration-300 hover:shadow-2xl dark:hover:text-black md:text-sm text-xs'>
        <FiHome className='size-4 sm:size-5'/>
        <Link to="/">Go to Home</Link>
      </button>
    </div>
  </div>
</div>
    </>
  )
}

export default OrderConfirm