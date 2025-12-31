import { useContext, useEffect, useState } from 'react'
import { HiMinus, HiPlus, HiShoppingCart } from 'react-icons/hi'
import { MdOutlineDelete } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { BiLoader } from 'react-icons/bi'
import { BsCheckCircleFill } from 'react-icons/bs'
import { GiCancel } from 'react-icons/gi'
import { FaArrowRightLong } from 'react-icons/fa6'
import { CountContext } from '../Navbar/CountContext'
import type React from 'react'
import { newCart } from '../../api'

const CartPage = () => {
  const [crt, setCrt] = useState([])        // cart items
  const [loader, setLoader] = useState(false)
  const [isLogged, setIsLogged] = useState(false)
  const nav = useNavigate()
  const { setCartCount } = useContext(CountContext);

 const isLikelyImageUrl = (str) =>
  /^https?:\/\//.test(str) || str.startsWith("/") || str.startsWith("data:");
 
  // --- Load cart from localStorage ---
  const getData = () => {
    try {
      const storedCart = localStorage.getItem('cart')
      if (storedCart) {
        setCrt(JSON.parse(storedCart))
      } else {
        setCrt([])
      }
    } catch (error) {
      console.error('Error reading cart from localStorage:', error)
      setCrt([])
    }
  }

  // --- Load cart helper ---
  const loadCart = () => {
    try {
      return JSON.parse(localStorage.getItem('cart') || '[]')
    } catch {
      return []
    }
  }

  // --- Save cart helper ---
  const saveCart = (cartData) => {
    localStorage.setItem('cart', JSON.stringify(cartData))
    setCrt([...cartData])
    setCartCount(cartData.length)
    newCart()
  }

  // --- Increase quantity ---
  const addOne = (prd) => {
    const existing = loadCart()
    const updated = existing.map(item =>
      item?.product.slug === prd?.product.slug
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
    saveCart(updated)
  }

  // --- Decrease quantity ---
  const minusOne = (prd) => {
    const existing = loadCart()
    const updated = existing
      .map(item =>
        item?.product.slug ===prd?.product.slug
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0)
    saveCart(updated)
  }

  // --- Remove item from cart ---
  const removeFromCart = (prd) => {
    const existing = loadCart().filter(item => item?.product.slug !== prd?.product.slug)
    saveCart(existing)
  }


  useEffect(() => {
    getData()
    setIsLogged(!!localStorage.getItem('webtoken'))
  }, [])

  // checkout
  const proceed = () => {
    if(isLogged){
      nav('/checkout')
    }
    else{
      nav('/login')
    }
  }

  return (
    // MODIFICATION: Changed 'min-h-screen' to 'min-h-full' to fit within the Layout's flex-1 main container
    <div className='min-h-full p-5'> 
      <div className='flex flex-col gap-2 w-3/4 bg-white/60  dark:bg-gray-900 dark:text-white mx-auto p-5 shadow-lg rounded-md border border-[#d5754d] m-5'>

        {/* Header */}
        <div className='flex gap-2 border-b border-gray-400 p-2'>
           <div className='flex gap-1 flex-col'>
              <p className='md:text-xl font-bold text-[#d5754d] text-xs whitespace-nowrap'>Shopping Cart</p>
              {crt?.length > 0 && 
               <p className='text-gray-600 text-xs dark:text-gray-400'>{crt.length} item(s) in your cart</p>
              }
            </div>
           <div className='ml-auto flex gap-1 flex-col'>
              <p className='md:text-lg font-bold text-[#d5754d] text-xs whitespace-nowrap'>Cart Total</p>
              <p className='text-lg font-bold'>₹{
                  crt?.length > 0 ? 
                  crt.reduce((total,item) => {
                      const rate = item?.product.price
                      return total + rate * item?.quantity
                  },0)
                  :0
              }</p>
            </div>
        </div>
        {/* Cart items */}
        {crt.length > 0 ? crt?.map((item) => (
          <div key={item?.product.slug} className='flex flex-col md:flex-row md:gap-10 gap-4 p-4 border-b border-gray-200 dark:border-gray-100/20'>
            {/* Product image */}
            {item?.product.image && isLikelyImageUrl(item.product.image) ? (
                          <img src={item?.product.image} className='w-[90px] h-20 rounded-lg' />
                      ) : (
                        <img src={'/assets/Product/Product.webp'} className='w-[90px] h-20 rounded-lg' />
                      )}

            {/* Product info */}
            <div className='flex flex-col gap-1 flex-1 text-xs'>
              <div className='flex gap-2'>
                <p className='font-semibold'>{item?.product.name}</p>
                <p className='font-semibold text-[#d5754d]'>{item?.product.category}</p>
                <p className='font-semibold'>{item?.product.brand}</p>
              </div>
              <div className='flex gap-2'>
                <p className='text-green-500'>In stock</p>
                <p className='font-semibold'>₹{item?.product.price}</p>
              </div>

              {/* Quantity controls */}
              <div className='flex items-center gap-2 mt-2'>
                <div className='flex items-center gap-2 px-2 py-1 rounded-lg border border-[#d5754d]'>
                  {item.quantity > 1 ? (
                    <HiMinus className=' cursor-pointer' onClick={() => minusOne(item)} />
                  ) : (
                    <MdOutlineDelete className=' cursor-pointer' onClick={() => removeFromCart(item)} />
                  )}
                  <span className='px-2'>{item.quantity}</span>
                  <HiPlus className=' cursor-pointer' onClick={() => addOne(item)} />
                </div>
              </div>
            </div>

            {/* Price */}
            <div className='md:ml-auto flex items-center'>
                <p className='text-md font-bold'>
                    ₹{item?.product.price * item.quantity}
                </p>
            </div>
          </div>
        )) : (
          <div className='flex flex-col justify-center align-center p-4 mx-auto gap-2'>
            <HiShoppingCart className='text-[#d5754d] w-full size-10' />
            <p className='font-bold text-xl mx-auto'>Your Cart is Empty</p>
            <p className='text-xs text-center md:text-sm'>Looks like you haven't added anything to your cart yet</p>
            <button className="py-2 px-4 rounded-lg bg-[#ffb684] hover:bg-[#d5754d] hover:cursor-pointer font-bold shadow-md transition duration-300">
                <Link to='/wishlist'>Go to wishlist</Link>
            </button>
        </div>
        )}

        {/* Place order */}
        {crt.length > 0 && (
          <div className='flex justify-center items-center group dark:text-black'>
              <button
                className="font-bold m-2 py-2 px-8 bg-[#ffb684] hover:bg-[#d5754d] rounded-lg cursor-pointer hover:shadow-2xl flex items-center gap-2 md:text-sm hover:scale-105 transition duration-300 text-xs whitespace-nowrap"
                onClick={proceed}
              >
                {loader ? <BiLoader className='size-6 animate-spin' /> : 'Proceed to checkout'}
                <FaArrowRightLong className='group-hover:translate-x-1 transition duration-400'/>
              </button>
          </div>
        )}
      </div>

    </div>
  )
}

export default CartPage