import React, { useEffect, useState } from 'react'
import { IoMdArrowForward } from 'react-icons/io'
import { IoArrowForwardCircleOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

const CategoryPage = ({cat}) => {

  const nav = useNavigate()

  const goTo=async(slug : string) => {
    nav('/products',{state:{categorySlug : slug}})
  }

  return (
    <>
   <div className='m-4 sm:m-6 lg:m-25 mt-4 sm:mt-6 p-4 sm:p-5 flex flex-col gap-6 sm:gap-8 lg:gap-10'>
  {/* head */}
  <div className='items-center justify-center flex flex-col text-center px-2'>
    <h1 className='font-bold text-xl sm:text-2xl lg:text-3xl dark:text-white'>Shop By Category</h1>
    <div className="h-[2px] sm:h-[3px] w-12 sm:w-16 mx-auto mt-1 sm:mt-2 bg-[#d5754d]"></div>
  </div>
  
  {/* main */}
  <div>
    <ul className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6'>
      {cat.map((item) => (
        <li key={item.name} className="group bg-white hover:shadow-2xl md:rounded-xl border-1 border-[#d5754d] hover:cursor-pointer items-center hover:translate-x hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-400 overflow-hidden" onClick={()=>goTo(item.slug)}>
          <div className='flex flex-col'>
            {/* image */}
            <div className='relative'>
              <img src={'/assets/Product/Product.webp'} className="h-40 sm:h-50 w-full transition duration-300" />
              <p className='absolute bg-white px-2 p-1 rounded-full shadow bottom-2 left-2 text-xs font-semibold'>{item.productCount} Products</p>
            </div>
            {/* action */}
            <div className='flex flex-col p-3 sm:p-4 gap-1 sm:gap-2'>
              <p className='font-semibold text-sm text-center sm:text-left'>{item.name}</p>
              <div className='font-semibold text-sm text-[#d5754d] flex items-center gap-1 justify-center sm:justify-start'>
                <p>View Products</p>
                <IoArrowForwardCircleOutline className='size-4 group-hover:translate-x-1 transition duration-300'/>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
</div>
    </>
  )
}

export default CategoryPage