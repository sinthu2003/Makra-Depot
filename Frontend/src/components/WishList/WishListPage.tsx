import  { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineDelete } from 'react-icons/md'
import { HiMiniHeart } from 'react-icons/hi2'
import { CountContext } from '../Navbar/CountContext'
import { newCart, updateWishList } from '../../api'

const WishListPage = () => {
  
  const [wish,setWish] = useState([])
  const [cart,setCart] = useState([])
  const { setCartCount,setWishCount } = useContext(CountContext);

   const isLikelyImageUrl = (str) =>
  /^https?:\/\//.test(str) || str.startsWith("/") || str.startsWith("data:");

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

    const addToCart = (prd :any) => {
        const existing = loadCart()
        const found = existing.find((item :any) => item.product.slug === prd.slug)
        if (found) {
          found.quantity += 1
        } else {
          existing.push({ product: prd, quantity: 1 })
        }
        saveCart(existing)
      }

      const removeWish = async(prd :any) => {
          const existing = fetch()
          const foundIndex = existing.findIndex((item :any) => item?.product.slug === prd?.slug);
          if (foundIndex !== -1) {
            // If found, remove it (toggle off)
            existing.splice(foundIndex, 1);
          } else {
            // If not found, add it (toggle on)
            existing.push({ product: prd, quantity: 1 });
          }
          saveWish(existing)
        } 

      const saveWish = (wishData:any) => {
          localStorage.setItem('wish', JSON.stringify(wishData))
          setWish([...wishData])
          setWishCount(wishData.length)
          updateWishList()
        }

      const saveCart = (cartData:any) => {
          localStorage.setItem('cart', JSON.stringify(cartData))
          setCart([...cartData])
          setCartCount(cartData.length)
          newCart()
        }


  return (
    <>
      {/* MODIFICATION: Changed 'min-h-screen' to 'min-h-full' */}
      <div className='min-h-full p-3 sm:p-5'> 
  {/* cart container */}
  <div>
    <div className='flex flex-col gap-2 w-full md:w-3/4 bg-white/60 mx-auto dark:bg-gray-900 dark:text-white p-3 sm:p-5 shadow-lg rounded-md border border-[#d5754d] m-5'>
      {/* head */}
      <div className='flex flex-col gap-2 border-b border-gray-400 dark:border-gray-100/20 p-2'>
        <p className='text-lg sm:text-xl font-bold text-[#d5754d]'>Shopping List</p>
        {wish?.length > 0 && (
          <p className='text-xs text-gray-400'>{wish.length} item(s) in your wishlist</p>
        )}
        <p className='text-sm text-blue-700 ml-auto hidden md:flex'>Price</p>
      </div>
      
      {wish?.length > 0 ? (
        wish.map((item) => (
          <div key={item.product.slug} className='flex flex-col sm:flex-row gap-4 sm:gap-6 p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0'>
            {/* product image and info */}
            <div className='flex gap-3 sm:gap-4 flex-1'>
              {/* img */}
              {item?.product.image && isLikelyImageUrl(item.product.image) ? (
                <img 
                  src={item?.product.image} 
                  className='w-16 h-16 sm:w-[100px] sm:h-[90px] rounded-lg object-cover flex-shrink-0' 
                  alt={item.product.name}
                />
              ) : (
                <img 
                  src={'/assets/Product/Product.webp'} 
                  className='w-16 h-16 sm:w-[100px] sm:h-[90px] rounded-lg object-cover flex-shrink-0' 
                  alt="Product placeholder"
                />
              )}

              {/* desc */}
              <div className='flex flex-col gap-1 text-xs flex-1 min-w-0'>
                <p className='font-medium text-sm sm:text-base line-clamp-2'>{item.product.name}</p>
                <p className='text-green-500 text-xs sm:text-sm'>In stock</p>
                
                {/* price - visible on mobile */}
                <div className='md:hidden mt-1'>
                  <p className='font-bold text-sm'>₹{item.product.price}</p>
                </div>

                {/* action buttons */}
                <div className='flex gap-2 mt-2'>
                  {/* add to cart */}
                  {cart.some((data: any) => data.product.slug == item.product.slug) ? (
                    <button className="font-bold py-1 px-3 rounded-full bg-green-300 whitespace-nowrap text-xs sm:text-sm w-28 sm:w-[120px] h-7 sm:h-[30px] dark:text-black flex items-center justify-center">
                      Added to cart
                    </button>
                  ) : (
                    <button 
                      className="font-bold py-1 px-3 rounded-full whitespace-nowrap text-xs sm:text-sm w-28 sm:w-[120px] h-7 sm:h-[30px] bg-[#ffb684] hover:bg-[#d5754d] cursor-pointer hover:scale-105 transition duration-300 flex items-center justify-center text-black"
                      onClick={() => addToCart(item.product)}
                    >
                      Add to cart
                    </button>
                  )}
                  
                  {/* remove from list */}
                  <button 
                    className="font-bold py-1 px-3 border-2 border-gray-300 rounded-full cursor-pointer whitespace-nowrap text-lg sm:text-xl w-10 h-7 sm:h-[30px] flex items-center justify-center hover:scale-105 transition duration-300 hover:text-red-500 hover:border-red-500"
                    onClick={() => removeWish(item.product)}
                  >
                    <MdOutlineDelete />
                  </button>
                </div>
              </div>
            </div>

            {/* price - hidden on mobile, visible on medium screens and up */}
            <div className='hidden md:flex md:ml-auto md:items-start'>
              <p className='font-bold text-sm sm:text-base'>₹{item.product.price}</p>
            </div>
          </div>
        ))
      ) : (
        // empty list
        <div className='flex flex-col justify-center items-center p-4 mx-auto gap-3 text-center'>
          <HiMiniHeart className='text-[#d5754d] size-8 sm:size-10' />
          <p className='font-bold text-lg sm:text-xl'>Your WishList is Empty</p>
          <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-md'>
            Save your favorite items here to buy them later
          </p>
          <button className="py-2 px-4 rounded-lg bg-[#ffb684] hover:bg-[#d5754d] hover:cursor-pointer font-bold shadow-md transition duration-300 text-sm sm:text-base mt-2">
            <Link to='/products'>Shop Now</Link>
          </button>
        </div>
      )}
    </div>
  </div>
</div>
    </>
  )
}

export default WishListPage