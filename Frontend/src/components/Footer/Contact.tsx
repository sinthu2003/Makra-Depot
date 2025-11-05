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
            <div className='m-5 w-[80%] mx-auto flex flex-col gap-10'>
                {/* head */}
                <div className='items-center justify-center flex flex-col'>
                    <h1 className='font-bold text-3xl dark:text-white'>Contact Us</h1>
                    <div className="h-[3px] w-1/16 mx-auto mt-2 bg-[#d5754d]"></div>
                    <p className='mt-3 font-semibold dark:text-white/80'>We're here to help! Reach out to us for any questions or assistance</p>
                </div>
                {/* cards */}
                <div className='flex gap-5 justify-between'>
                    <div className='p-4 shadow-lg flex flex-col gap-2 bg-white dark:bg-gray-900 rounded-lg w-full dark:shadow-[#d5754d]/50 border border-white dark:border-[#ffb684]/50'>
                        <IoLocationOutline className='p-2 bg-[#ffb684] size-9 rounded-lg' />
                        <p className='font-bold text-sm dark:text-white'>Visit Us</p>
                        <p className='text-xs text-gray-800 word-break dark:text-white/50'>{company?.address?.street} {company?.address?.city}, {company?.address?.state}, {company?.address?.zipCode}, {company?.address?.country}</p>
                    </div>
                    {/* call */}
                    <div className='p-4 shadow-lg flex flex-col gap-2 bg-white dark:bg-gray-900 rounded-lg w-full dark:shadow-[#d5754d]/50 border border-white dark:border-[#ffb684]/50'>
                        <MdOutlineLocalPhone className='p-2 bg-[#ffb684] size-9 rounded-lg' />
                        <p className='font-bold text-sm dark:text-white'>Call Us</p>
                        <p className='text-xs text-gray-800 dark:text-white/50'>{company?.phone}<br></br>Mon - Sat, 9AM-7PM</p>
                    </div>
                    {/* mail */}
                    <div className='p-4 shadow-lg flex flex-col gap-2 bg-white dark:bg-gray-900 rounded-lg w-full dark:shadow-[#d5754d]/50 border border-white dark:border-[#ffb684]/50'>
                        <GoMail className='p-2 bg-[#ffb684] size-9 rounded-lg' />
                        <p className='font-bold text-sm dark:text-white'>Email Us</p>
                        <p className='text-xs text-gray-800 dark:text-white/50'>{company?.email}<br></br>24/7 Support</p>
                    </div>
                    {/* hours */}
                    <div className='p-4 shadow-lg flex flex-col gap-2 bg-white dark:bg-gray-900 rounded-lg w-full dark:shadow-[#d5754d]/50 border border-white dark:border-[#ffb684]/50'>
                        <GoClock className='p-2 bg-[#ffb684] size-9 rounded-lg' />
                        <p className='font-bold text-sm dark:text-white'>Support Hours</p>
                        <p className='text-xs text-gray-800 dark:text-white/50'>Monday - Saturday <br></br>9.00 AM - 7.00 PM <br></br>Sunday Closed</p>
                    </div>
                </div>

                <div className='flex gap-10'>
                    {/* questions */}
                    <div className='bg-white p-6 dark:bg-gray-900 rounded-lg border border-[#d5754d] dark:border-[#ffb684]/50 w-[50%] flex flex-col gap-5'>
                        <p className='font-bold flex gap-1 items-center dark:text-white gap-2'><FaRegCircleQuestion className='text-[#d5754d]'/>Frequently Asked Questions</p>
                        {/* 1 */}
                        <p className='font-semibold text-sm dark:text-white'>What are your delivery times?<br></br>
                        <span className='font-medium text-xs text-gray-500 dark:text-white/50'>We typically deliver within 3-5 business days. Shipping charges are decided by the lorry service.</span></p>
                        {/* 2 */}
                        <p className='font-semibold text-sm dark:text-white'>Do you offer bulk discounts?<br></br>
                        <span className='font-medium text-xs text-gray-500 dark:text-white/50'>Yes, we offer special pricing for bulk orders. Contact us for a custom quote.</span></p>
                        {/* 3 */}
                        <p className='font-semibold text-sm dark:text-white'>What payment methods do you accept?<br></br>
                        <span className='font-medium text-xs text-gray-500 dark:text-white/50'>We accept cash on delivery, bank transfers, and other payment methods.</span></p>
                    </div>
                    {/* form */}
                    <div className='bg-white p-6 dark:bg-gray-900 rounded-lg border border-[#d5754d] dark:border-[#ffb684]/50 w-[50%] flex flex-col gap-5 dark:text-white'>
                        <p className='font-bold dark:text-white text-xl'>Send Us a Message</p>
                        <form className='flex flex-col gap-4' onSubmit={handleSubmit(send)}>
                            <div className='flex justify-between gap-3'>
                                <input placeholder='Name' {...register('name')} className='outline-none border border-[#d5754d] px-2 rounded-lg h-[30px] text-sm w-full'/>
                                <input placeholder='Email' {...register('email')} className='outline-none border border-[#d5754d] px-2 rounded-lg h-[30px] text-sm w-full'/>
                            </div>
                            <div className='flex justify-between gap-3'>
                                <input placeholder='Phone' {...register('phone')} className='outline-none border border-[#d5754d] px-2 rounded-lg h-[30px] text-sm w-full'/>
                                <select defaultValue="" {...register('subject')} className='outline-none border border-[#d5754d] px-2 rounded-lg h-[30px] text-sm w-full'>
                                    <option hidden value="" className='dark:text-black'>Select a subject</option>
                                    <option value="general-injury" className='dark:text-black'>General Inquiry</option>
                                    <option value="order-related" className='dark:text-black'>Order Related</option>
                                    <option value="product-info" className='dark:text-black'>Product Information</option>
                                    <option value="bulk-order" className='dark:text-black'>Bulk Orders</option>
                                    <option value="complain" className='dark:text-black'>Complaint</option>
                                    <option value="other" className='dark:text-black'>Other</option>
                                </select>
                            </div>
                            <textarea placeholder='How can we help you?' className='outline-none border border-[#d5754d] p-2 rounded-lg h-[60px] text-sm w-full' {...register('message')}></textarea>
                            <button type="submit" className='rounded-lg w-full center text-sm bg-[#d5754d] py-2 cursor-pointer font-semibold hover:-translate-y-1 transition duration-300'>Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact