import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FaRegCircleQuestion } from 'react-icons/fa6'
import { GoClock, GoMail } from 'react-icons/go'
import { IoLocationOutline } from 'react-icons/io5'
import { MdOutlineLocalPhone } from 'react-icons/md'
import { useLocation } from 'react-router-dom'
import { contactMsg } from '../../api'
import { toast, ToastContainer } from 'react-toastify'

const Contact = () => {
    const loc = useLocation()
    const company = loc.state.details
    const {register,handleSubmit,reset} = useForm()
    
    const send = async(data:any) => {
        const res = await contactMsg(data)
        if(res?.status == 200 || res?.status == 201){
            toast.success('Message sent')
            reset()
        }
    }

    return (
        <>
  <ToastContainer />
  <div className='w-[90%] sm:w-[85%] lg:w-[80%] mx-auto flex flex-col gap-6 sm:gap-8 lg:gap-10'>
    {/* head */}
    <div className='items-center justify-center flex flex-col text-center px-2'>
      <h1 className='font-bold text-xl sm:text-2xl lg:text-3xl dark:text-white'>Contact Us</h1>
      <div className="h-[2px] sm:h-[3px] w-12 sm:w-16 mx-auto mt-1 sm:mt-2 bg-[#d5754d]"></div>
      <p className='mt-2 sm:mt-3 font-semibold dark:text-white/80 text-sm sm:text-base'>We're here to help! Reach out to us for any questions or assistance</p>
    </div>
    
    {/* cards */}
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5'>
      <div className='p-3 sm:p-4 shadow-lg flex flex-col gap-2 bg-white dark:bg-gray-900 rounded-lg w-full dark:shadow-[#d5754d]/50 border border-white dark:border-[#ffb684]/50'>
        <IoLocationOutline className='p-2 bg-[#ffb684] size-7 sm:size-8 lg:size-9 rounded-lg' />
        <p className='font-bold text-xs sm:text-sm dark:text-white'>Visit Us</p>
        <p className='text-xs text-gray-800 word-break dark:text-white/50'>{company?.address?.street} {company?.address?.city}, {company?.address?.state}, {company?.address?.zipCode}, {company?.address?.country}</p>
      </div>
      
      {/* call */}
      <div className='p-3 sm:p-4 shadow-lg flex flex-col gap-2 bg-white dark:bg-gray-900 rounded-lg w-full dark:shadow-[#d5754d]/50 border border-white dark:border-[#ffb684]/50'>
        <MdOutlineLocalPhone className='p-2 bg-[#ffb684] size-7 sm:size-8 lg:size-9 rounded-lg' />
        <p className='font-bold text-xs sm:text-sm dark:text-white'>Call Us</p>
        <p className='text-xs text-gray-800 dark:text-white/50'>{company?.phone}<br></br>Mon - Sat, 9AM-7PM</p>
      </div>
      
      {/* mail */}
      <div className='p-3 sm:p-4 shadow-lg flex flex-col gap-2 bg-white dark:bg-gray-900 rounded-lg w-full dark:shadow-[#d5754d]/50 border border-white dark:border-[#ffb684]/50'>
        <GoMail className='p-2 bg-[#ffb684] size-7 sm:size-8 lg:size-9 rounded-lg' />
        <p className='font-bold text-xs sm:text-sm dark:text-white'>Email Us</p>
        <p className='text-xs text-gray-800 dark:text-white/50'>{company?.email}<br></br>24/7 Support</p>
      </div>
      
      {/* hours */}
      <div className='p-3 sm:p-4 shadow-lg flex flex-col gap-2 bg-white dark:bg-gray-900 rounded-lg w-full dark:shadow-[#d5754d]/50 border border-white dark:border-[#ffb684]/50'>
        <GoClock className='p-2 bg-[#ffb684] size-7 sm:size-8 lg:size-9 rounded-lg' />
        <p className='font-bold text-xs sm:text-sm dark:text-white'>Support Hours</p>
        <p className='text-xs text-gray-800 dark:text-white/50'>Monday - Saturday <br></br>9.00 AM - 7.00 PM <br></br>Sunday Closed</p>
      </div>
    </div>

    <div className='flex flex-col my-5 lg:mb-0 lg:flex-row gap-6 sm:gap-8 lg:gap-10'>
      {/* questions */}
      <div className='bg-white p-4 sm:p-6 dark:bg-gray-900 rounded-lg border border-[#d5754d] dark:border-[#ffb684]/50 w-full lg:w-[50%] flex flex-col gap-4 sm:gap-5'>
        <p className='font-bold flex gap-1 sm:gap-2 items-center dark:text-white text-sm sm:text-base'>
          <FaRegCircleQuestion className='text-[#d5754d] size-4 sm:size-5'/>
          Frequently Asked Questions
        </p>
        {/* 1 */}
        <div>
          <p className='font-semibold text-xs sm:text-sm dark:text-white'>What are your delivery times?</p>
          <span className='font-medium text-xs text-gray-500 dark:text-white/50'>We typically deliver within 3-5 business days. Shipping charges are decided by the lorry service.</span>
        </div>
        {/* 2 */}
        <div>
          <p className='font-semibold text-xs sm:text-sm dark:text-white'>Do you offer bulk discounts?</p>
          <span className='font-medium text-xs text-gray-500 dark:text-white/50'>Yes, we offer special pricing for bulk orders. Contact us for a custom quote.</span>
        </div>
        {/* 3 */}
        <div>
          <p className='font-semibold text-xs sm:text-sm dark:text-white'>What payment methods do you accept?</p>
          <span className='font-medium text-xs text-gray-500 dark:text-white/50'>We accept cash on delivery, bank transfers, and other payment methods.</span>
        </div>
      </div>
      
      {/* form */}
      <div className='bg-white p-4 sm:p-6 dark:bg-gray-900 rounded-lg border border-[#d5754d] dark:border-[#ffb684]/50 w-full lg:w-[50%] flex flex-col gap-4 sm:gap-5 dark:text-white'>
        <p className='font-bold dark:text-white text-lg sm:text-xl'>Send Us a Message</p>
        <form className='flex flex-col gap-3 sm:gap-4' onSubmit={handleSubmit(send)}>
          <div className='flex flex-col sm:flex-row justify-between gap-3'>
            <input 
              placeholder='Name' 
              {...register('name')} 
              className='outline-none border border-[#d5754d] px-2 rounded-lg h-[35px] sm:h-[30px] text-sm w-full dark:bg-gray-800 dark:text-white'
            />
            <input 
              placeholder='Email' 
              {...register('email')} 
              className='outline-none border border-[#d5754d] px-2 rounded-lg h-[35px] sm:h-[30px] text-sm w-full dark:bg-gray-800 dark:text-white'
            />
          </div>
          <div className='flex flex-col sm:flex-row justify-between gap-3'>
            <input 
              placeholder='Phone' 
              {...register('phone')} 
              className='outline-none border border-[#d5754d] px-2 rounded-lg h-[35px] sm:h-[30px] text-sm w-full dark:bg-gray-800 dark:text-white'
            />
            <select 
              defaultValue="" 
              {...register('subject')} 
              className='outline-none border border-[#d5754d] px-2 rounded-lg h-[35px] sm:h-[30px] text-sm w-full dark:bg-gray-800 dark:text-white'
            >
              <option hidden value="">Select a subject</option>
              <option value="general-injury">General Inquiry</option>
              <option value="order-related">Order Related</option>
              <option value="product-info">Product Information</option>
              <option value="bulk-order">Bulk Orders</option>
              <option value="complain">Complaint</option>
              <option value="other">Other</option>
            </select>
          </div>
          <textarea 
            placeholder='How can we help you?' 
            className='outline-none border border-[#d5754d] p-2 rounded-lg h-[80px] sm:h-[60px] text-sm w-full dark:bg-gray-800 dark:text-white'
            {...register('message')}
          ></textarea>
          <button 
            type="submit" 
            className='rounded-lg w-full center text-sm bg-[#d5754d] py-2 sm:py-2 cursor-pointer font-semibold hover:-translate-y-1 transition duration-300 hover:shadow-lg'
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  </div>
</>
    )
}

export default Contact