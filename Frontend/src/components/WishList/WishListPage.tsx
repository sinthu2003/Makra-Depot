import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import { createCartItem, getCart, getWishList, updateWishList } from '../../api'
import { Link } from 'react-router-dom'
import { MdOutlineDelete } from 'react-icons/md'

const WishListPage = () => {
  
  const [wish,setWish] = useState([])
  const [cart,setCart] = useState([])

  useEffect(() => {
    const fetch = async() => {
       const res = await getWishList()
        if(res?.status === 200 || res?.status === 201) {
          return setWish(res.data)
        }}
        fetch()
        getCartItems()
  },[])

  // remove item
  const updateWish = async(id : any) => {
    const res = await updateWishList(id)
    if(res?.status === 200 || res?.status === 201) {
      const list = await getWishList()
      return setWish(list?.data)
    } 
  }

  //  add to cart
  const addToCart = async(id : any) => {
    const res = await  createCartItem(id)
    if(res?.status === 200 || res?.status === 201) {
      const list = await getCart()
      return setCart(list)
    } 
  }

  //get Cart items
  const getCartItems = async() => {
    const res = await getCart()
    setCart(res)
  }

  return (
    <>
      <div className='min-h-screen p-10'>
              {/* cart container */}
              <div>
                      <div className='flex flex-col gap-2 w-3/4 bg-white mx-auto p-10 shadow-lg'>
                          {/* head */}
                          <div className='flex flex-col gap-2 border-b border-gray-400 p-2'>
                              <p className='text-xl font-bold text-[#d5754d]'>Shopping List</p>
                              <p className='text-sm text-blue-700'>Select all items</p>
                              <p className='text-sm text-blue-700 ml-auto hidden md:flex'>Price</p>
                          </div>
                      {wish?.length > 0 ? (wish.map( (item) => (
                          <div key={item._id} className='flex flex-col md:flex-row gap-10 p-4'>
                              {/* checkbox */}
                              <input type='checkbox' className='mr-auto md:mr-0'/>
                              {/* img */}
                              <img src={`/assets/All Products/${item.product_id.img}`} className='w-[140px] max-w-[150px] h-auto'/>
                              {/* desc */}
                              <div className='flex flex-col gap-1'>
                                  <p>{item.product_id.name}</p>
                                  {/* <p className='text-green-500'>{item.product_id.desc}</p> */}
                                  <p className='text-green-500 text-sm'>In stock</p>
                                  <p className='text-red-500'>Limited time deal</p>
                                  <button className='bg-red-500 w-[60px] h-[20px] text-white rounded-md text-xs'>{item.product_id.desc}</button>
                                  {/* action buttons */}
                                  <div className='flex flex-col md:flex-row gap-2 '>
                                    {/* add to cart */}
                                    { cart.some((data : any) => data.product_id._id == item.product_id._id) ? 
                                    <button className="font-bold my-2 py-1 px-3 rounded-full bg-green-300 whitespace-nowrap text-sm w-[120px] h-[30px]">
                                      Added to cart
                                    </button>
                                    : 
                                      <button className="font-bold my-2 py-1 px-3 bg-yellow-400 rounded-full cursor-pointer hover:bg-yellow-500 whitespace-nowrap text-sm w-[120px] h-[30px]" onClick={() => addToCart(item.product_id._id)}>
                                        Add to cart
                                      </button>
                                    }
                                    {/* remove from list */}
                                     <button className="font-bold my-2 py-1 px-3 border-2 border-gray-300 rounded-full cursor-pointer whitespace-nowrap text-xl mx-auto" onClick={() => updateWish(item.product_id)}>
                                        <MdOutlineDelete />                                    
                                      </button>
                                  </div>
                              </div>
                              {/* price */}
                              <div className='md:ml-auto'>
                                  <p className='font-bold'>₹{item.product_id.rate}</p>
                              </div>
                          </div>
                          ))) :
                          // empty list
                          (
                              <div className='flex flex-col justify-center align-center p-4 mx-auto gap-4'>
                                  <p className='font-extrabold text-2xl mx-auto'>List is Empty</p>
                                  <button className="py-2 px-6 rounded-full bg-[#ffb684] hover:bg-[#d5754d] hover:cursor-pointer font-bold shadow-md transition duration-300">
                                      <Link to='/'>Shop Now</Link>
                                  </button>
                              </div>
                          )}
                      </div>
              </div>
              {/*  */}
              <Footer />
          </div>
    </>
  )
}

export default WishListPage