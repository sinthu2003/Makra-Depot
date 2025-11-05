import React, { useContext, useEffect, useState } from 'react'
import { BiLoaderCircle } from 'react-icons/bi';
import { HiShoppingCart, HiMinus, HiPlus, HiOutlineHeart } from 'react-icons/hi';
import { HiMiniHeart } from 'react-icons/hi2';
import { MdOutlineDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom'
import { FaShippingFast, FaStar } from 'react-icons/fa';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { CiStar } from 'react-icons/ci';
import { IoMdCart } from 'react-icons/io';
import { CountContext } from '../../../Navbar/CountContext';
import { newCart, updateWishList } from '../../../../api';

const ItemList = ({item,review,relPrds,cart,wish}) => {
    const [details,setDetails] = useState(item)
    const [rev,setRev] = useState([])
    const [rel,setRel] = useState([])
    const [isLogged,setIsLogged] = useState(false)
    const [localCart,setLocalCart] = useState(cart)
    const [localWish,setLocalWish] = useState(wish)
    const [loadingIds, setLoadingIds] = useState([]); //loads until api fetches data

    const nav = useNavigate()
    const { setCartCount,setWishCount } = useContext(CountContext);


    // item desc
  const show=(slug:any) => {
    nav(`/products/${slug}`,{state:{details:slug}})
  }
    // render after await prd fetched
      useEffect(() => {
        setDetails(item)
        setRev(review)
        setRel(relPrds)
        setLocalCart(loadCart)
        setLocalWish(loadWish)
        setIsLogged(!!localStorage.getItem('webtoken'))
      }, [cart,wish,item,review]);

    // action button functions
     const isLoading = (id : string) => {
          return loadingIds.includes(id);
        }
      
        const loadCart = () => {
          try {
            return JSON.parse(localStorage.getItem('cart') || '[]')
          } catch {
            return []
          }
        }

        const saveWish = (wishData) => {
          localStorage.setItem('wish', JSON.stringify(wishData))
          setLocalWish([...wishData])
          setWishCount(wishData.length)
          updateWishList()
        }

        const loadWish = () => {
          try {
            return JSON.parse(localStorage.getItem('wish') || '[]')
          } catch {
            return []
          }
        }

        const addWish = async(prd :any) => {
          const existing = loadWish()
          const foundIndex = existing.findIndex((item) => item.product.slug === prd.slug);
          if (foundIndex !== -1) {
            existing.splice(foundIndex, 1);
          } else {
            existing.push({ product: prd, quantity: 1 });
          }
          saveWish(existing)
        }


        const saveCart = (cartData) => {
          localStorage.setItem('cart', JSON.stringify(cartData))
          setLocalCart([...cartData])
          setCartCount(cartData.length)
          newCart()
        }

        // --- Add product for the first time ---
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

        // --- Increase quantity ---
        const addOne = (prd) => {
          const existing = loadCart()
          const updated = existing.map(item =>
            item.product.slug === prd.slug
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
              item.product.slug === prd.slug
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter(item => item.quantity > 0) // remove if quantity hits 0

          saveCart(updated)
        }

        // --- Remove product entirely ---
        const removeFromCart = (prd) => {
          const existing = loadCart().filter(item => item.product.slug !== prd.slug)
          saveCart(existing)
        }

        // --- Quantity helper for rendering ---
        const quantity = (prd) => {
          const existing = localCart.find(item => item.product.slug === prd.slug)
          return existing?.quantity || 0
        }

  

  return (
    <div className='mb-10 mr-10 mt-6 p-5 flex flex-col gap-5 ml-15 dark:text-white'>
      {/* title */}
      <div className='flex flex-col'>
        <h1 className='font-semibold text-sm'>Home / Products / {details.name}</h1>
      </div>
      {/* details */}
      <div className='grid grid-cols-2'>
        {/* img */}
        <div>
            {/* <img src={'/assets/Product/Product.webp'} className="transition duration-300 hover:shadow-2xl hover:scale-105 w-130 h-100 overflow-hidden rounded-xl border border-gray-300 dark:border-[#ffb684]/20" /> */}
            <img src={details.image} className="transition duration-300 hover:shadow-2xl hover:scale-105 w-130 h-100 overflow-hidden rounded-xl border border-gray-300 dark:border-[#ffb684]/20" />
        </div>
        {/* desc */}
        <div className='flex flex-col py-4 gap-4'>
            <div className='flex gap-3'>
                <p className='font-semibold text-xs text-[#d5754d]'>{details.category}</p>
                <p className='font-semibold text-xs'>{details.brand}</p>
            </div>
            <p className='font-semibold text-2xl'>{details.name}</p>
            
            {/* rate */}
            <div className='flex flex-col'>
                {/* {details.stock && details.discount ?
                    <> */}
                    <p className="text-gray-900 font-bold whitespace-nowrap text-xl dark:text-[#d5754d]">₹{details.price}</p>
                    {/* <p className="text-gray-900 font-bold whitespace-nowrap text-xl">₹{(details.rate - (details.rate * details.discount) / 100).toFixed(2)}</p> */}
                    {/* </>
                    :
                    <p className="text-gray-900 whitespace-nowrap font-bold text-xl">₹{details.rate}</p>
                } */}
            </div>

            {/* stock */}
            <div className='w-full text-xs'>
                  {/* {details.stock ?  */}
                  <p className="inline-block text-green-500 bg-green-100 px-2 py-1 rounded-md">In Stock</p>
                  {/* :<p className="inline-block text-red-500 bg-red-100 px-2 py-1 rounded-md">Out of Stock</p>} */}
            </div>


            {/* action button  */}
            <div className='flex w-full my-2 items-center gap-2'>
                <>
                        {isLoading(details.slug) ? (
                        <button className="font-bold px-6 py-2 bg-gray-400 rounded-full cursor-not-allowed w-full" disabled>
                            <BiLoaderCircle className='mx-auto' />
                        </button>
                        ) : !localCart.some((cart : any) => cart.product.slug === details.slug) ? (
                        <button type="button"
                            className={`font-bold px-6 py-2 rounded-full transition duration-300 w-full dark:text-black
                                ${details.inStock ?
                                    'bg-[#ffb684] hover:bg-[#d5754d] hover:shadow-xl hover:scale-101 cursor-pointer':'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            onClick={(e) => {
                              e.stopPropagation(); 
                              if (details.inStock) addToCart(details);
                            }}
                          >
                            Add to Cart
                        </button>
                        ) : (
                        <button
                            className="font-bold transition duration-300 px-6 py-2 py-2 border-2 border-[#d5754d] rounded-full cursor-pointer flex justify-between items-center gap-4 w-full"
                        >
                            {quantity(details) > 1 ? (
                            <HiMinus className='text-lg' onClick={() => minusOne(details)} />
                            ) : (
                            <MdOutlineDelete className='text-lg' onClick={() => removeFromCart(details)} />
                            )}
                            <span className='text-lg px-2'>{quantity(details)}</span>
                            <HiPlus className='text-lg' onClick={() => addOne(details)} />
                        </button>
                        )}
                    
                    {/* wish */}
                    <div className='text-lg transition duration-300 border border-gray-300 rounded-md px-4 py-2 hover:cursor-pointer hover:bg-[#d5754d] hover:border-[#d5754d] hover:shadow-xl hover:scale-105'>
                          {/* if logged action works */}
                          
                          {localWish.some((wish : any) => wish.product.slug === details.slug) ? 
                          (<HiMiniHeart className='text-red-500' onClick={() => addWish(details)} />) :
                          <HiOutlineHeart onClick={() => addWish(details)} />
                          }
                      </div>
                </>
            </div>
            <div className='bg-[#d5754d]/30 h-[1px]'></div>
              {/* shipping icons */}
              <div className='flex justify-center gap-10'>
                <div className='flex flex-col'> 
                  <FaShippingFast className='size-10 text-[#d5754d] mx-auto'/>
                  <p className='font-semibold text-sm w-full'>Fast Shipping</p>
                </div>
                <div className='flex flex-col'>
                  <RiSecurePaymentLine className='size-10 text-[#d5754d] mx-auto'/>
                  <p className='font-semibold text-sm w-full'>Secure Payment</p>
                </div>
              </div>
          </div>
      </div>
      {/* reviews */}
      <div className='flex flex-col'>
          <p className='font-bold text-lg'>Customer Reviews ({rev !=null ? rev.length : 0})</p>
          <p className='flex justify-center p-10'>No reviews yet. Be the first to review this product! </p>
      </div>
      {/* related */}
      <div className='flex flex-col gap-6'>
          <p className='font-bold text-lg'>Related Products</p>
          {/* cards */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-10">
          {rel?.filter((prd: any) => prd.slug !== details.slug).slice(0,4).map((prd : any) => (
            <li key={prd.slug} onClick={()=>show(prd.slug)} className="group bg-white hover:shadow-2xl rounded-xl border-1 border-[#d5754d] hover:cursor-pointer p-4 flex flex-col items-center hover:translate-x hover:-translate-y-4 transition-all duration-400 gap-2 dark:bg-gray-900">
                      {/* cart or wish */}
                      <div className='text-lg transition duration-300 group-hover:blur-sm w-full flex justify-end'>
                          {/* if logged action works */}
                          
                          {localWish.some((wish : any) => wish.product.slug === prd.slug) ? 
                          (<HiMiniHeart className='text-red-500' onClick={(e) => {e.stopPropagation(); addWish(prd)}} />) :
                          <HiOutlineHeart onClick={(e) => {e.stopPropagation(); addWish(prd)} }/>
                          
                          }
                      </div>

                    {/* prd img */}
                    <div className="relative flex mt-2 w-full justify-center">
                      {/* <img src={'/assets/Product/Product.webp'} className="h-50 rounded-lg transition duration-300 group-hover:blur-sm" /> */}
                      <img src={prd.image} className="w-full h-50 rounded-lg transition duration-300 group-hover:blur-sm" />

                      {/* on hover icons */}
                      <div className='text-lg absolute inset-0 flex justify-center items-center hidden group-hover:flex transition duration-500 gap-2'>
                        {/* wish */}
                        <div className='p-2 rounded-full bg-white hover:bg-[#ffb684] hover:border-[#ffb684] hover:scale-110 border border-gray-200 transition duration-300'>
                            {/* if logged action works */}
                            
                            {localWish.some((wish : any) => wish.product.slug === prd.slug) ? 
                            (<HiMiniHeart className='text-red-500' onClick={() => addWish(prd)} />) :
                            <HiOutlineHeart className='dark:text-black' onClick={(e) => {e.stopPropagation();addWish(prd)}}/>
                            
                            }
                        </div>
                        {/* cart */}
                        <div className='p-2 rounded-full bg-white hover:bg-[#ffb684] hover:border-[#ffb684] hover:scale-110 border border-gray-200 transition duration-200'>
                          {!localCart.some((cart : any) => cart.product.slug === prd.slug) ?
                            <HiShoppingCart className='dark:text-black' onClick={(e) => {e.stopPropagation(); addToCart(prd)}}/> :
                            <HiShoppingCart className="text-green-400" onClick={(e)=>{e.stopPropagation(); removeFromCart(prd)}}/>
                          }
                        </div>
                      </div>
                    </div>
                {/* name */}
                <div className='flex flex-col w-full h-full gap-2 m-2'>
                  <div className='flex gap-2'>
                    <p className="text-xs text-[#d5754d] font-semibold">{prd.category}</p>
                    <p className="text-xs font-semibold">{prd.brand}</p>
                  </div>
                  <p className="font-bold text-sm">{prd.name}</p>
                </div>
                
                {/* rating */}
                <div className='flex items-center gap-1 w-full'>
                  <div className='flex'>
                      {Array.from({length: 4},(_, i) => (
                        <FaStar key={i} className='size-3 text-yellow-400' />
                      ))}
                        <CiStar className='size-3' />
                  </div>
                    <p className='text-xs'>{prd.defaultRating}</p>
                </div>

                {/* desc */}
                <div className="flex justify-between w-full items-center">
                  <p className="text-gray-900 font-bold text-xl whitespace-nowrap">₹{prd.price}</p>
                  <p className="text-gray-500 font-semibold text-xs whitespace-nowrap">PER PCS</p>
                </div>
  
                <div className="flex flex-col gap-2 p-2  w-full">
                  {/* action button  */}
                    {
                      isLoading(prd.slug) ? (
                        <button className="font-bold m-2 p-2 bg-gray-400 rounded-full cursor-not-allowed" disabled>
                          <BiLoaderCircle className="mx-auto animate-spin" />
                        </button>
                      ) : (() => {
                          const inCart = localCart.some((item: any) => item.product.slug === prd.slug);

                          return !inCart ? (
                            <button
                              className="font-bold m-2 p-2 bg-[#ffb684] hover:bg-[#d5754d] rounded-xl cursor-pointer hover:shadow-xl text-sm flex items-center gap-1 justify-center dark:text-black"
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(prd);
                              }}
                            >
                              <IoMdCart className="size-4" />
                              Add to Cart
                            </button>
                          ) : (
                            <button
                              className="font-bold m-2 px-4 py-2 border-2 border-[#d5754d] rounded-xl cursor-pointer flex justify-between items-center hover:shadow-xl"
                            >
                              {quantity(prd) > 1 ? (
                                <HiMinus
                                  className="text-lg"
                                  onClick={(e) => { e.stopPropagation(); minusOne(prd) }}
                                />
                              ) : (
                                <MdOutlineDelete
                                  className="text-lg"
                                  onClick={(e) => { e.stopPropagation(); removeFromCart(prd) }}
                                />
                              )}
                              <span className="text-lg">{quantity(prd)}</span>
                              <HiPlus
                                className="text-lg"
                                onClick={(e) => { e.stopPropagation(); addOne(prd) }}
                              />
                            </button>
                          )
                      })()
                    }
      
                </div>
              </li>
            ))}
          </ul>
      </div>
    </div>
  )
}

export default ItemList