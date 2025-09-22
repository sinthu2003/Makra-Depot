// import React from 'react'
import img from '../../../assets/mainImg.png'
const Main = () => {


  return (
        <>
            <div className='w-full h-full'>
                <div className='p-2 md:p-10 flex flex-col lg:flex-row items-center justify-center gap-8'>
                    {/* Image */}
                    <div className='bg-white flex justify-center items-center rounded-full w-80 h-80 sm:w-85 sm:h-85 md:w-100 md:h-100'>
                        <img src={img} className='w-full h-full rounded-full transform scall-100 hover:scale-110 transition-transform duration-300 ease-out' />
                    </div>

                    {/* Text */}
                    <div className='text-center flex flex-col items-center lg:text-left px-4 sm:px-8'>
                        <h1 className='text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2'>Shop Smarter, Live Better</h1>
                        <h1 className='text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 whitespace-nowrap'>Join Millions of Happy Shoppers</h1>
                        <button type='button' className='py-2 px-6 sm:px-8 rounded-full bg-[#ffb684] hover:bg-[#d5754d] hover:cursor-pointer font-bold shadow-lg transition duration-300'>Shop Now </button>
                    </div>
                </div>
            </div>
        </>
  )
}

export default Main
