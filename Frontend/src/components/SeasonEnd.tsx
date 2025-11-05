import React from 'react'
import { FaRocket } from 'react-icons/fa'

const SeasonEnd = () => {
  return (
    <div className='bg-[#fff9e6]'>
        <div className='flex justify-center items-center py-20 min-h-screen'>
            <div className='bg-[#ffb684] p-10 rounded-lg flex flex-col justify-center items-center gap-1'>
                <p className='font-bold'>Season Ended</p>
                <p className='font-semibold flex items-center gap-1'>See You Next Year!<FaRocket /></p>
            </div>
        </div>
    </div>
  )
}

export default SeasonEnd