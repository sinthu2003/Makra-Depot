// import React from 'react'
import Img3 from '../../assets/Category/Camera.webp'
import Img2 from '../../assets/Category/Headphones.webp'
import Img1 from '../../assets/Category/Monitor.webp'
import Img5 from '../../assets/Category/Projector.webp'
import Img4 from '../../assets/Category/Speaker.webp'

const Category = () => {
    const topProducts = [
        {
            name:'Monitors',
            img:Img1,
            rate:'6500'
        },
        {
            name:'Wireless Headphones',
            img:Img2,
            rate:'899'
        },
        {
            name:'Camera',
            img:Img3,
            rate:'999'
        },{
            name:'Mobile Speaker',
            img:Img4,
            rate:'499'
        },{
            name:'Projector',
            img:Img5,
            rate:'6990'
        },
    ];
  return (
    <div className='m-5 gap-10 p-10'>
        {/* head */}
        <div className='align-center justify-center flex'>
            <h1 className='font-bold'>BEST OF ELECTRONICS</h1>
        </div>
        {/* products */}
        <div className="m-4">
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {topProducts.map((prd,index) => (
                <li key={index} className="bg-white rounded-lg shadow-md border-3 border-[#fff9e6] hover:border-[#d5754d] hover:cursor-pointer transition-all p-4 flex flex-col items-center">
                    <div className="w-full h-40 flex items-center justify-center mb-4">
                        <img src={prd.img} className="w-4/5 max-w-[120px] h-40"/>
                    </div>
                    <p className="font-semibold text-center text-sm sm:text-base">{prd.name}</p>
                    <p className="text-gray-900 text-sm text-center mt-1">From ₹{prd.rate}</p>
                </li>
                ))}
            </ul>
        </div>

    </div>
  )
}

export default Category