import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCompany } from '../../../api'

const Banner = () => {
  const [company,setCompany] = useState()
  
    useEffect(() => {
      getDetails()
    },[])
  
    const getDetails = async() => {
        const res= await getCompany()
        if(res?.status == 200 || res?.status == 201){
            setCompany(res.data.data[0])
        }
    }

  const nav = useNavigate()
  const goTo = async() => {
    nav('/contact',{state:{details:company}})
  }

  return (
    <>
        <div className='bg-[#ffb684]/70 py-12 sm:py-16 lg:py-20 flex flex-col justify-center items-center gap-3 sm:gap-4 px-4 text-center'>
    <p className='font-bold text-2xl sm:text-3xl lg:text-4xl font-inter'>Ready to Light Up Your Celebration?</p>
    <p className='font-medium text-base sm:text-lg max-w-2xl'>Join thousands of happy customers who trust us for their special moments</p>
    <div className='flex flex-col sm:flex-row font-medium gap-3 sm:gap-4 w-full sm:w-auto justify-center'>
        <Link to="/products">
            <button className='py-2 sm:py-3 px-4 sm:px-5 bg-white dark:bg-black dark:text-white rounded-lg cursor-pointer hover:scale-105 transition duration-300 hover:shadow-2xl w-full sm:w-auto text-sm sm:text-base'>
                Shop Now
            </button>
        </Link>
        <button className='py-2 sm:py-3 px-4 sm:px-5 bg-[#d5754d] rounded-lg text-white cursor-pointer hover:scale-105 transition duration-300 hover:shadow-2xl dark:text-black w-full sm:w-auto text-sm sm:text-base' onClick={()=>goTo()}>
            Contact Us
        </button>
    </div>
</div>
    </>
  )
}

export default Banner