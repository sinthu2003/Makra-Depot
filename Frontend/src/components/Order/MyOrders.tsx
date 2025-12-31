import React, { useEffect, useState } from 'react'
import { cancel, deleteProof, myOrders, uploadProof } from '../../api'
import { GoClock } from 'react-icons/go'
import { MdOutlinePayment } from 'react-icons/md'
import { FaRegCalendar, FaRegFileImage } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { FiSearch } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import Invoice from './Invoice'
import { RiDeleteBin7Fill, RiDownload2Line } from 'react-icons/ri'
import { FcCancel } from "react-icons/fc";

const MyOrders = () => {
    const [orders, setOrders] = useState([])
    const [filterOrd, setFilterOrd] = useState([])
    const [open, setOpen] = useState(false)
    const [order, setOrder] = useState()
    
    // Main form for search
    const { register, watch } = useForm() 
    const val = watch('search')

    useEffect(() => {
      getMyOrders()
    }, [])

    const isLikelyImageUrl = (str) =>
      /^https?:\/\//.test(str) || str.startsWith("/") || str.startsWith("data:");

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
    }, [val, orders])

    const getMyOrders = async() => {
        const res = await myOrders()
        if(res.status == 200 || res.status == 201){
            const arr = res.data.data
            setOrders(arr)
            setFilterOrd(arr)
        }
    }

    const reverseOrder = (desc: string) => {
      if(desc == "old"){
        setFilterOrd([...filterOrd].reverse())
      }
      else{
        setFilterOrd([...orders])
      }
    }

    const delProof = async(id:any,proofId:any) => {
        await deleteProof(id,proofId)
        getMyOrders()
    }

    const downloadImage = (filename) => {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = `/assets/Payment/${filename}`;
    link.download = filename; // Set the download filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    };

    // modal
    const assure = (data:any) => {
        setOpen(true)
        setOrder(data)
    }

    const cancelOrd = async(id:any) => {
        const res = await cancel(id)
        if(res.status == 200 || res.status == 201){
            getMyOrders()
            setOpen(false)
        }
    }

    // File Upload Component for each order
    const FileUploadForm = ({ orderId }) => {

        const { register, watch, handleSubmit, formState: { errors } } = useForm();
        
        const fileInput = watch('paymentProof');
        const hasFile = fileInput && fileInput.length > 0;

        const onSubmit = async(data:any) => {
          const res = await uploadProof(orderId,data.paymentProof[0].name)
          if(res?.status === 200 || res?.status === 201){
              getMyOrders()
          }
        };

        return (
            
            <form onSubmit={handleSubmit(onSubmit)} className="flex items-end gap-2">
                <div className="relative w-48 sm:w-60 h-8 sm:h-10 border border-[#d5754d] bg-white rounded-lg cursor-pointer focus:outline-none overflow-hidden">
                    <input
                        type="file"
                        {...register('paymentProof', { 
                            required: 'Payment proof is required',
                            // validate: {
                            //     fileType: (files) => 
                            //         files && ['image/jpeg', 'image/png', 'image/jpg'].includes(files[0]?.type) || 
                            //         'Only JPEG, PNG files are allowed'
                            // }
                        })}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        // accept="image/jpeg,image/png,image/jpg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-xs pointer-events-none gap-1 whitespace-nowrap overflow-hidden px-2">
                        <FaRegFileImage className="flex-shrink-0" />
                        <span className="truncate">
                            {hasFile ? fileInput[0].name : 'Upload Payment Proof'}
                        </span>
                    </div>
                </div>
                
                {errors.paymentProof && (
                    <p className="text-red-500 text-xs mt-1 text-right">{errors.paymentProof.message}</p>
                )}
                
                {hasFile && (
                    <button
                        type="submit"
                        className="mt-2 w-15 sm:w-20 h-8 sm:h-10 bg-[#d5754d] text-white rounded-lg hover:bg-[#c2643a] transition-colors duration-200 text-xs sm:text-sm font-medium hover:cursor-pointer"
                    >
                        Submit
                    </button>
                )}
            </form>
        );
    };

    return (
        <>
            <div className='my-6 sm:my-8 lg:my-10 w-[90%] sm:w-[85%] lg:w-[80%] flex flex-col mx-auto gap-4 sm:gap-5 min-h-screen'>
                {/* head */}
                <div className='flex flex-col gap-1 dark:text-white text-center sm:text-left'>
                    <p className='font-bold text-xl sm:text-2xl'>My Orders</p>
                    <p className='font-normal text-sm sm:text-base'>Track and manage your orders</p>
                </div>
                
                {/* filters */}
                <div className='w-full flex flex-col sm:flex-row gap-3 dark:text-white'>
                    {/* search */}
                    <div className='w-full sm:w-[80%] rounded-lg border border-[#d5754d] flex gap-2 items-center px-3 sm:px-4 text-gray-600 dark:bg-gray-800'>
                        <FiSearch className='flex-shrink-0' />
                        <input 
                            type="search" 
                            {...register('search')} 
                            placeholder='Search by Order Number or Product...' 
                            className='w-full py-2 sm:py-3 text-sm outline-none text-black dark:text-white bg-transparent'
                        />
                    </div>
                    {/* select */}
                    <select 
  className='w-full sm:w-[20%] rounded-lg border border-[#d5754d] text-sm outline-none px-3 py-2 sm:py-3 dark:bg-gray-800 dark:text-white max-w-[calc(100vw-2rem)]'
  onChange={(e) => reverseOrder(e.target.value)}
  style={{ 
    maxWidth: 'calc(100vw - 2rem)',
    left: '1rem',
    right: '1rem'
  }}
>
  <option value="new">Most Recent</option>
  <option value="old">Oldest First</option>
</select>
                </div>
                
                {/* items */}
                <div className='flex flex-col gap-4 sm:gap-6'>
                    {filterOrd.map((prd) => (
                        <div className='w-full border border-[#d5754d] rounded-lg shadow hover:shadow-xl hover:scale-102 p-3 sm:p-4 transition duration-300 flex flex-col gap-3 bg-white/60 dark:bg-gray-800' key={prd._id}>
                            <div className='flex flex-col sm:flex-row justify-between gap-3 sm:gap-4'>
                                {/* order details */}
                                <div className='flex flex-col gap-2 flex-1'>
                                    <div className='flex flex-col sm:flex-row sm:gap-4 gap-2'>
                                        <p className='font-semibold text-sm sm:text-base dark:text-white'>Order #{prd.orderNumber}</p>
                                        <div className='flex flex-wrap gap-2'>
                                            <p className='font-semibold flex items-center text-xs gap-1 p-1 bg-yellow-200/60 rounded-lg text-gray-600 dark:text-gray-800'>
                                                {prd.status == "pending" ? <GoClock className='size-3 sm:size-4'/> : <FcCancel  className='size-3 sm:size-4'/> }
                                                <span>{prd.status.charAt(0).toUpperCase() + prd.status.slice(1)}</span>
                                            </p>
                                            <p className={`font-normal flex items-center text-xs gap-1 rounded-lg px-2 ${prd.paymentStatus == 'paid' ? "bg-green-300" :"bg-red-300"}`}>
                                                {prd.paymentStatus =="pending" && <span>Payment</span> }{prd.paymentStatus.charAt(0).toUpperCase() + prd.paymentStatus.slice(1)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col sm:flex-row sm:gap-4 gap-1 text-gray-600 dark:text-gray-400'>
                                        <p className='font-semibold flex items-center text-xs gap-1'>
                                            <FaRegCalendar className='size-3'/>
                                            <span>{new Date(prd.createdAt).toLocaleDateString('en-GB')}</span>
                                        </p>
                                        <p className='font-semibold flex items-center text-xs gap-1'>
                                            <MdOutlinePayment className='size-3 sm:size-4'/>
                                            <span>₹{prd.total}</span>
                                        </p>
                                        <p className='font-semibold flex items-center text-xs gap-1'>
                                            <FaLocationDot className='size-3'/>
                                            <span>{prd.shippingAddress.city}</span>
                                        </p>
                                    </div>
                                </div>
                                
                                {/* proof upload and invoice */}
                                <div className='flex flex-col lg:flex-row items-end gap-2'>
                                    {prd.status == "pending" && <FileUploadForm orderId={prd._id} />}
                                    <Invoice invoice={prd} />
                                    {prd.paymentStatus == "pending" && prd.status == "pending" && <span className='flex items-center border border-[#d5754d] px-2 rounded-lg text-sm h-8 sm:h-10 gap-1 cursor-pointer hover:text-red-500 hover:shadow-md transition duartion-300 dark:text-white font-semibold' onClick={()=>assure(prd)}>Cancel Order<FcCancel className='size-5 '/></span> }
                                </div>
                            </div>
                            
                            {/* line */}
                            <div className='h-[1px] border border-[#ffb684]/40'></div>
                            
                            {/* prd */}
                            <div className='flex flex-col py-3 sm:py-4 gap-3 sm:gap-4'>
                                <div className='flex flex-col md:flex-row justify-between gap-3'>
                                <div>
                                {prd?.items.map((item) => (
                                        <div className='flex gap-2 sm:gap-3 flex-1' key={item._id}>
                                            {/* img */}
                                            {item.image && isLikelyImageUrl(item.image) ? (
                                                <img src={item.image} className='w-12 h-12 sm:w-15 sm:h-15 rounded-lg object-cover flex-shrink-0' alt={item.productName} />
                                            ) : (
                                                <img src={'/assets/Product/Product.webp'} className='w-12 h-12 sm:w-15 sm:h-15 rounded-lg object-cover flex-shrink-0' alt={item.productName} />
                                            )}

                                            {/* price */}
                                            <div className='flex flex-col gap-1 flex-1'>
                                                <p className='font-semibold text-xs sm:text-sm line-clamp-2 dark:text-white'>{item.productName}</p>
                                                <p className='text-xs text-gray-700 dark:text-gray-400 whitespace-nowrap'>
                                                    Qty: {item.quantity} x ₹{item.price}
                                                </p>
                                                <p className='font-bold text-sm sm:text-base dark:text-white'>₹{item.quantity * item.price}</p>
                                            </div>
                                        </div>
                                    // </div>
                                ))}
                                </div>
                                <div className='flex-shrink-0 flex flex flex-col md:flex-row gap-2'>
                                    {prd?.paymentProofs.length > 0 && prd.paymentProofs.map((item) => (
                                        <div key={item._id} className='group relative w-30 h-18 rounded-lg'> 
                                            <img 
                                            src={`/assets/Payment/${item.file}`} 
                                            className={`w-full h-full rounded-lg transition duration-300 ${prd.status == "pending" && "group-hover:blur-xs"} border border-[#d5754d] object-cover`} 
                                            />
                                            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition duration-300'>
                                                <RiDownload2Line 
                                                className='bg-[#ffb684] p-2 text-black hover:scale-105 rounded-md size-8 cursor-pointer transition duration-300' 
                                                onClick={() => downloadImage(item.file)}
                                                />
                                                {prd.status == "pending" &&
                                                <RiDeleteBin7Fill 
                                                className='text-red-400 bg-[#ffb684] p-2 hover:text-red-500 hover:scale-105 rounded-md hover:shadow-2xl size-8 cursor-pointer transition duration-300' 
                                                onClick={() => delProof(prd._id, item._id)}
                                                />
                                                }
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                </div>
                            </div>
                            
                            {/* line */}
                            <div className='h-[1px] border border-[#ffb684]/40'></div>
                            
                            {/* sub total */}
                            <div className='text-xs text-gray-600 dark:text-gray-400 font-semibold space-y-1'>
                                <p className='flex items-center justify-between'>
                                    Subtotal
                                    <span>₹{prd?.subtotal}</span>
                                </p>
                                <p className='flex items-center justify-between'>
                                    Shipping
                                    <span className='italic text-xs'>Charges decided by lorry service</span>
                                </p>
                            </div>
                            
                            {/* line */}
                            <div className='h-[1px] border border-[#ffb684]/40'></div>
                            
                            {/* total */}
                            <div className='text-base sm:text-lg font-bold dark:text-white'>
                                <p className='flex items-center justify-between flex-wrap gap-2'>
                                    Total
                                    <span className='flex items-center gap-1'>
                                        {prd.discount > 0 && (
                                            <span className='text-green-600 text-xs'>-{prd.discount}%</span>
                                        )}
                                        ₹{prd.total}
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* modal */}
            { open && 
                <div 
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blur-xs bg-opacity-50 backdrop-blur-xs"
                >
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-md transform transition-all p-6 flex flex-col justify-center items-center gap-4 dark:text-white border border-[#ffb684] text-sm">
                        <p>Are you sure you want to cancel Order - {order?.orderNumber} ?</p>
                        <div className='flex gap-2'>
                            <button className='px-3 py-1 rounded-lg border border-gray-400 cursor-pointer hover:shadow-xl hover:scale-105 transition duration-300' onClick={()=>cancelOrd(order._id)}>Confirm</button>
                            <button className='px-3 py-1 rounded-lg bg-[#d5754d] cursor-pointer hover:shadow-xl hover:scale-105 transition duration-300' onClick={()=>setOpen(false)}>Close</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default MyOrders