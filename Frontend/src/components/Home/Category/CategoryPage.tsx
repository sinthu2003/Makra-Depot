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
    <div className='m-25 mt-6 p-5 flex flex-col gap-10'>
        {/* head */}
      <div className='items-center justify-center flex flex-col'>
        <h1 className='font-bold text-3xl dark:text-white'>Shop By Category</h1>
        <div className="h-[3px] w-1/16 mx-auto mt-2 bg-[#d5754d]"></div>
      </div>
        {/* main */}
      <div>
        <ul className='flex gap-4 grid grid-cols-4'>
            {cat.map((item) => (
                <li key={item.name} className="group bg-white hover:shadow-2xl rounded-xl border-1 border-[#d5754d] hover:cursor-pointer items-center hover:translate-x hover:-translate-y-2 transition-all duration-400 overflow-hidden" onClick={()=>goTo(item.slug)}>
                    <div className='flex flex-col'>
                        {/* image */}
                        <div className='relative'>
                            <img src={'/assets/Product/Product.webp'} className="h-50 w-full transition duration-300" />
                            <p className='absolute bg-white px-2 p-1 rounded-full shadow bottom-2 left-1 text-xs font-semibold mx-2'>{item.productCount} Products</p>
                        </div>
                        {/* action */}
                        <div className='flex flex-col p-4 gap-2'>
                            <p className='font-semibold text-sm'>{item.name}</p>
                            <div className='font-semibold text-sm text-[#d5754d] flex items-center gap-1'>
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