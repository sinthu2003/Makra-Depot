import React from 'react'
import { IoArrowForwardCircleOutline } from 'react-icons/io5'
import { TbBrandAppgallery } from 'react-icons/tb'
import { BsShop } from 'react-icons/bs'
import { FiBox } from 'react-icons/fi'
import { FaArrowTrendUp } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

const BrandsPage = ({brand}) => {

  const nav = useNavigate()

  const goTo=async(name : string) => {
    nav('/products',{state:{brandName : name}})
  }

  return (
    <>
    <div className='m-4 sm:m-6 lg:m-25 mt-4 sm:mt-6 p-4 sm:p-5 flex flex-col gap-6 sm:gap-8 lg:gap-10 dark:text-white'>
  {/* head */}
  <div className='items-center justify-center flex flex-col text-center'>
    <h1 className='font-bold text-xl sm:text-2xl lg:text-3xl'>Shop By Brands</h1>
    <div className="h-[2px] sm:h-[3px] w-12 sm:w-16 mx-auto mt-1 sm:mt-2 bg-[#d5754d]"></div>
    <p className='text-xs sm:text-sm font-semibold mt-2'>Discover our collection from trusted brands</p>
  </div>
  
  {/* featured */}
  <div className='flex flex-col gap-3 sm:gap-4'>
    <p className='m-1 sm:m-2 font-bold text-lg sm:text-xl'>Featured Products</p>
    <ul className='flex gap-2 sm:gap-3 justify-center flex-wrap'>
      {brand.filter((b)=> b.productCount>10).slice(0,6).map((item, index) => (
        <li key={index} className='bg-[#d5754d]/20 dark:bg-[#ffb684]/70 p-3 sm:p-4 px-4 sm:px-6 rounded-lg shadow flex flex-col justify-center hover:shadow-2xl hover:cursor-pointer items-center hover:translate-x hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-400 gap-1 w-[120px] sm:w-[130px] lg:max-w-[150px]' onClick={()=>goTo(item.name)}>
          <TbBrandAppgallery className='size-5 sm:size-6 text-[#d5754d] dark:text-white/50'/>
          <p className='font-semibold text-xs text-center dark:text-black whitespace-nowrap truncate w-full'>{item.name}</p>
          <p className='text-xs dark:text-black'>{item.productCount} Products</p>
        </li>
      ))}
    </ul>
  </div>
  
  {/* all brands */}
  <div className='flex flex-col gap-3 sm:gap-4'>
    <p className='m-1 sm:m-2 font-bold text-lg sm:text-xl'>All Brands</p>
    <ul className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4'>
      {brand.map((item) => (
        <li key={item.name} className="group bg-white dark:text-white dark:bg-gray-900 hover:shadow-2xl rounded-xl border-1 border-[#d5754d] hover:cursor-pointer items-center hover:translate-x hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-400 overflow-hidden">
          <div className='flex flex-col'>
            {/* image */}
            <div className='relative'>
              <div className="h-24 sm:h-30 w-full transition duration-300 bg-[#d5754d] flex justify-center">
                <BsShop className='m-auto size-8 sm:size-10 text-white'/>
                <p className='absolute bg-white px-2 p-1 rounded-full shadow top-1 sm:top-2 right-1 text-xs font-semibold dark:text-black'>{item.productCount} Products</p>
              </div>
            </div>
            {/* action */}
            <div className='flex flex-col p-3 sm:p-4 gap-2 sm:gap-3'>
              <p className='font-bold text-base sm:text-lg line-clamp-1'>{item.name}</p>
              <p className='font-semibold text-xs line-clamp-2'>{item.description}</p>
              <div className='flex items-center gap-1 w-full flex-wrap'>
                <FiBox className='size-3'/>
                <p className='font-semibold text-xs text-gray-600'>{item.productCount} Products</p>
                {item.productCount >10 && 
                  <div className='flex items-center text-xs text-green-600 ml-auto gap-1'>
                    <FaArrowTrendUp className='size-3'/>
                    <p className='font-semibold'>Popular</p>
                  </div>
                }
              </div>
              <div className='bg-gray-100/20 h-[1px]'></div>
              <button className='font-semibold text-xs sm:text-sm text-[#d5754d] flex justify-center items-center gap-1 group-hover:bg-[#d5754d] group-hover:text-white w-full py-2 rounded-lg transition duration-300' onClick={()=>goTo(item.name)}>
                <p>View Products</p>
                <IoArrowForwardCircleOutline className='size-3 sm:size-4 group-hover:translate-x-1 transition duration-300'/>
              </button>
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

export default BrandsPage