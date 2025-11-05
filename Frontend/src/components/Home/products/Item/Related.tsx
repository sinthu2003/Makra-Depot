import React from 'react'
import CategoryList from '../../Category/CategoryList'

const Related = () => {
  return (
    <>
        {/* head
        <div className='items-center justify-center flex flex-col'>
            <h1 className='font-semibold text-xl'>You May Also Like</h1>
            <div className="h-[3px] w-1/16 mx-auto mt-1 bg-[#d5754d]"></div>
        </div> */}

        {/* products */}
        <CategoryList />

    </>
  )
}

export default Related