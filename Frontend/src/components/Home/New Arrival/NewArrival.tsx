import React, { useContext, useEffect, useState } from 'react'
import { HiMinus, HiOutlineHeart, HiPlus, HiShoppingCart } from 'react-icons/hi';
import { HiMiniHeart } from 'react-icons/hi2';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineDelete } from 'react-icons/md';
import { BiLoaderCircle } from 'react-icons/bi';
import { FaStar } from 'react-icons/fa';
import { CiStar } from 'react-icons/ci';
import { IoMdCart } from 'react-icons/io';
import { CountContext } from '../../Navbar/CountContext';
import { newCart, updateWishList } from '../../../api';

const NewArrival = ({products}) => {
    const [localProducts, setLocalProducts] = useState(products);
    const [localCart,setLocalCart] = useState([])
    const [localWish,setLocalWish] = useState([])
    const [loadingIds, setLoadingIds] = useState([]); //loads until api fetches data
    const [isLogged,setIsLogged] = useState(false)

    // nav
    const nav = useNavigate()
    const { setCartCount,setWishCount } = useContext(CountContext);
    // item
    const item=(slug:any) => {
      nav(`/products/${slug}`,{state:{details:slug}})
    }

     const goTo=async() => {
      nav('/products',{state:{newArrival : 'new'}})
    }


    useEffect(() => {
        setLocalProducts(products);
        setLocalCart(loadCart)
        setLocalWish(loadWish)
        setIsLogged(!!localStorage.getItem('webtoken'))
      }, [products]);
        
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

        const loadWish = () => {
          try {
            return JSON.parse(localStorage.getItem('wish') || '[]')
          } catch {
            return []
          }
        }

        const saveCart = (cartData) => {
          localStorage.setItem('cart', JSON.stringify(cartData))
          setLocalCart([...cartData])
          setCartCount(cartData.length);
          newCart()
        }

        const saveWish = (wishData) => {
          localStorage.setItem('wish', JSON.stringify(wishData))
          setLocalWish([...wishData])
          setWishCount(wishData.length);
          updateWishList()
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
            
        // create
        const addWish = async(prd :any) => {
          const existing = loadWish()
          const foundIndex = existing.findIndex((item) => item.product.slug === prd.slug);
          if (foundIndex !== -1) {
            // If found, remove it (toggle off)
            existing.splice(foundIndex, 1);
          } else {
            // If not found, add it (toggle on)
            existing.push({ product: prd, quantity: 1 });
          }
          saveWish(existing)
        } 

  return (
      <div className='m-10 p-5 flex flex-col gap-10'>
        <div className='items-center justify-center flex flex-col'>
          <h1 className='font-bold text-3xl dark:text-white'>New Arrivals</h1>
          <div className="h-[3px] w-1/16 mx-auto mt-1 bg-[#d5754d]"></div>
          <p className='mt-3 font-semibold dark:text-white/80'>Check out our latest collection of premium fireworks</p>
        </div>
        {/* cards */}
        <div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-15">
            {localProducts?.slice(0,4).map((prd : any) => (
              <li key={prd.slug} onClick={()=>item(prd.slug)} className="group bg-white dark:bg-gray-900 dark:text-white hover:shadow-2xl dark:hover:shadow-[#d5754d]/30 rounded-xl border-1 border-[#d5754d] hover:cursor-pointer p-4 flex flex-col items-center hover:translate-x hover:-translate-y-4 transition-all duration-400 gap-2">

                <div className='relative flex flex-col gap-1 w-full'>
                    {/* cart or wish */}
                    <div className='flex justify-between text-lg transition duration-300 group-hover:blur-sm'>
                      {/* new */}
                      <div className='px-2 bg-green-300 rounded-xl'>
                        <p className='text-xs font-semibold dark:text-black'>New</p>
                      </div>
                      {/* wish */}
                      <div>
                        {/* if logged action works */}
                        
                        {localWish.some((wish : any) => wish.product.slug === prd.slug) ? 
                          (<HiMiniHeart className='text-red-500' onClick={() => addWish(prd)} />) :
                        <HiOutlineHeart onClick={(e) => {e.stopPropagation(); addWish(prd)}} />
                        }
                      </div>
                    </div>

                    {/* prd img */}
                    <div className="flex mt-2">
                      {/* <img src={'/assets/Product/Product.webp'} className="w-full h-50 rounded-lg transition duration-300 group-hover:blur-sm" /> */}
                      <img src={prd.image? prd.image:null} className="w-full h-50 rounded-lg transition duration-300 group-hover:blur-sm" />

                      {/* on hover icons */}
                      <div className='text-lg absolute inset-0 flex justify-center items-center hidden group-hover:flex transition duration-500 gap-2'>
                        {/* wish */}
                        <div className='p-2 rounded-full bg-white hover:bg-[#ffb684] hover:border-[#ffb684] hover:scale-110 border border-gray-200 transition duration-300'>
                            {/* if logged action works */}
                            
                            {localWish.some((wish : any) => wish.product.slug === prd.slug) ? 
                            (<HiMiniHeart className='text-red-500' onClick={(e) => {e.stopPropagation();addWish(prd)}} />) :
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
                  <p className="text-gray-900 dark:text-white font-bold text-xl whitespace-nowrap">₹{prd.price}</p>
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
        {/* all products */}
        <div className='flex justify-center'>
          <button onClick={()=>goTo()} className='px-4 py-3 bg-black text-white dark:bg-white dark:text-black rounded-xl font-semibold text-xs hover:shadow-2xl dark:hover:shadow-[#d5754d]/50 transition-all duration-300 hover:cursor-pointer w-0-0.5/6  whitespace-nowrap hover:scale-110'>View All New Arrivals</button>
        </div>
  
      </div>
    );
}

export default NewArrival