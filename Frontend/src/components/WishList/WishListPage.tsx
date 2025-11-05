import  { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineDelete } from 'react-icons/md'
import { HiMiniHeart } from 'react-icons/hi2'
import { CountContext } from '../Navbar/CountContext'
import type React from 'react'
import { newCart, updateWishList } from '../../api'

const WishListPage = () => {
  
  const [wish,setWish] = useState([])
  const [cart,setCart] = useState([])
  const { setCartCount,setWishCount } = useContext(CountContext);

  useEffect(() => {
        setWish(fetch)
        setCart(loadCart)
  },[])


  const fetch =() => {
       try {
            return JSON.parse(localStorage.getItem('wish') || '[]')
          } catch {
            return []
          }
  }

  const loadCart = () => {
          try {
            return JSON.parse(localStorage.getItem('cart') || '[]')
          } catch {
            return []
          }
        }

    const addToCart = (prd) => {
        const existing = loadCart()
        const found = existing.find(item => item.product.slug === prd.slug)
        if (found) {
          found.quantity += 1
        } else {
          existing.push({ product: prd, quantity: 1 })
        }
        saveCart(existing)
      }

      const removeWish = async(prd :any) => {
          const existing = fetch()
          const foundIndex = existing.findIndex((item) => item?.product.slug === prd?.slug);
          if (foundIndex !== -1) {
            // If found, remove it (toggle off)
            existing.splice(foundIndex, 1);
          } else {
            // If not found, add it (toggle on)
            existing.push({ product: prd, quantity: 1 });
          }
          saveWish(existing)
        } 

      const saveWish = (wishData) => {
          localStorage.setItem('wish', JSON.stringify(wishData))
          setWish([...wishData])
          setWishCount(wishData.length)
          updateWishList()
        }

      const saveCart = (cartData) => {
          localStorage.setItem('cart', JSON.stringify(cartData))
          setCart([...cartData])
          setCartCount(cartData.length)
          newCart()
        }


  return (
    <>
      <div className='min-h-screen p-5'>
              {/* cart container */}
              <div>
                      <div className='flex flex-col gap-2 w-3/4 bg-white/60 mx-auto dark:bg-gray-900 dark:text-white  p-5 shadow-lg rounded-md border border-[#d5754d]'>
                          {/* head */}
                          <div className='flex flex-col gap-2 border-b border-gray-400 dark:border-gray-100/20 p-2'>
                              <p className='text-xl font-bold text-[#d5754d]'>Shopping List</p>
                              {wish?.length > 0 && <p className='text-xs text-gray-400'>{wish.length} item(s) in your wishlist</p>}
                              <p className='text-sm text-blue-700 ml-auto hidden md:flex'>Price</p>
                          </div>
                      {wish?.length > 0 ? (wish.map( (item) => (
                          <div key={item.product.slug} className='flex flex-col md:flex-row gap-10 p-4'>
                              {/* checkbox */}
                              {/* <input type='checkbox' className='mr-auto md:mr-0'/> */}
                              {/* img */}
                              <img src={`/assets/Product/Product.webp`} className='w-[100px] h-[90px] rounded-lg'/>
                              {/* desc */}
                              <div className='flex flex-col gap-1 text-xs'>
                                  <p>{item.product.name}</p>
                                  {/* <p className='text-green-500'>{item.productslug.desc}</p> */}
                                  <p className='text-green-500'>In stock</p> 
                                  {/* action buttons */}
                                  <div className='flex flex-col md:flex-row gap-2 '>
                                    {/* add to cart */}
                                    { cart.some((data : any) => data.product.slug == item.product.slug) ? 
                                    <button className="font-bold my-2 py-1 px-3 rounded-full bg-green-300 whitespace-nowrap w-[120px] h-[30px] dark:text-black">
                                      Added to cart
                                    </button>
                                    : 
                                      <button className="font-bold my-2 py-1 px-3 rounded-full whitespace-nowrap w-[120px] h-[30px] bg-[#ffb684] hover:bg-[#d5754d] cursor-pointer hover:scale-105 transition duration-300"
                                      onClick={()=>addToCart(item.product)}>
                                        Add to cart
                                      </button>
                                    }
                                    {/* remove from list */}
                                     <button className="font-bold my-2 py-1 px-3 border-2 border-gray-300 rounded-full cursor-pointer whitespace-nowrap text-xl mx-auto hover:scale-105 transition duration-300 hover:text-red-500 hover:border-red-500" onClick={() => removeWish(item.product)}>
                                        <MdOutlineDelete />                                    
                                      </button>
                                  </div>
                              </div>
                              {/* price */}
                              <div className='md:ml-auto'>
                                  <p className='font-bold'>₹{item.product.price}</p> 
                              </div>
                          </div>
                          ))) :
                          // empty list
                          (
                              <div className='flex flex-col justify-center align-center p-4 mx-auto gap-2'>
                                  <HiMiniHeart className='text-[#d5754d] w-full size-10' />
                                  <p className='font-bold text-xl mx-auto'>Your WishList is Empty</p>
                                  <p className='text-sm'>Save your favorite items here to buy them later</p>
                                  <button className="py-2 px-4 rounded-lg bg-[#ffb684] hover:bg-[#d5754d] hover:cursor-pointer font-bold shadow-md transition duration-300">
                                      <Link to='/products'>Shop Now</Link>
                                  </button>
                              </div>
                          )}
                      </div>
              </div>
              {/*  */}
          </div>
    </>
  )
}

export default WishListPage