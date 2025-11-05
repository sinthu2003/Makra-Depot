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
        <div className='bg-[#ffb684]/70 py-20 flex flex-col justify-center items-center gap-4'>
            <p className='font-bold text-4xl font-inter'>Ready to Light Up Your Celebration?</p>
            <p className='font-medium text-lg'>Join thousands of happy customers who trust us for their special moments</p>
            <div className='flex font-medium gap-4'>
                <Link to="/products" ><button className='py-3 px-5 bg-white dark:bg-black dark:text-white rounded-lg cursor-pointer hover:scale-105 transition duration-300 hover:shadow-2xl'>Shop Now</button></Link>
                <button className='py-3 px-5 bg-[#d5754d] rounded-lg text-white cursor-pointer hover:scale-105 transition duration-300 hover:shadow-2xl dark:text-black' onClick={()=>goTo()}>Contact Us</button>
            </div>
        </div>
    </>
  )
}

export default Banner