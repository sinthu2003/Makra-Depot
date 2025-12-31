import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiBox } from 'react-icons/fi'
import { HiShoppingCart } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { CountContext } from '../Navbar/CountContext'
import { newCart } from '../../api'

const QuickBuy = ({list,cat,brand}) => {
    const [all,setAll]  = useState([])
    const [isLogged,setIsLogged] = useState(false)
    const [desc,setDesc] = useState('')
    const [localCart,setLocalCart] = useState([])

    const {register,handleSubmit,watch,setValue} = useForm()
    const searchValue = watch("search")

    useEffect(() =>{
      setDesc('Loading')
      setAll(list)
      list.length ==0 && setDesc('No Products Available')
      setIsLogged(!!localStorage.getItem('webtoken'))

      // search changes
      if(!searchValue){
        setAll(list)
        setValue('catSearch',"")
        setValue('brandSearch',"")
      }
      else{
        searchPrd({search:searchValue})
      }

      setLocalCart(loadCart)
    },[searchValue,list])

    const nav = useNavigate()
    const { setCartCount,setWishCount } = useContext(CountContext);

    const proceed =() => {
      if(!isLogged){
        nav('/login')
      }
      else{
        nav('/checkout')
      }
    }


    // add to cart
    const loadCart = () => {
      try {
        return JSON.parse(localStorage.getItem('cart') || '[]')
      } catch {
        return []
      }
    }

    const addOne = (prd) => {
      const existing = loadCart()

      const found = existing.find(item => item.product.slug === prd.slug)
      if (found) {
        found.quantity += 1
      } else {
        existing.push({ product: prd, quantity: 1 })
      }
      
      saveCart(existing)
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

    const saveCart = (cartData) => {
      localStorage.setItem('cart', JSON.stringify(cartData))
      setLocalCart([...cartData])
      setCartCount(cartData.length)
      newCart()
    }

    const searchPrd =(data:any) => {
      const res=list.filter(item => item.name.toLowerCase().includes(data.search))
      setValue('catSearch',"")
      setValue('brandSearch',"")
      setAll(res)
      setDesc('No Products Available')
    }

    const category = async(newCat:any) => {
      setValue('catSearch',newCat)
      console.log(item)
      const result = all.filter(item => item?.category == newCat)  
      result.length && setDesc( 'No Product Available')
      setAll(result)
    }

    const brandFilter = async(newBrand:any) => {
      setValue('brandSearch',newBrand)
      const result = all.filter(item => item?.brand == newBrand)  
      result.length && setDesc( 'No Product Available')
      setAll(result)
    }

    const quantity = (prd) => {
      const found = localCart.find((item) => item.product.slug === prd.slug);
      return found ? found.quantity : 0;
    };

    // Add these to your component state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 50;

    // Calculate pagination values
    const totalPages = Math.ceil(all?.length / itemsPerPage) || 1;
    const currentItems = all?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ) || [];

    // Reset to page 1 when filters change
    useEffect(() => {
      setCurrentPage(1);
    }, [all]); // Reset when products change


  return (
   <div className='mx-2 sm:mx-3 lg:mx-5 p-3 sm:p-4 lg:p-5 flex flex-col gap-6 sm:gap-8 lg:gap-10'>
  {/* head */}
  <div className='flex flex-col lg:flex-row justify-between dark:text-white gap-4 sm:gap-6'>
    <div className='flex items-center justify-between lg:justify-start gap-2 w-full lg:w-auto'>
      <div className='flex gap-1 items-center'>
        <FiBox className='text-[#d5754d] size-5 sm:size-6 lg:size-7'/>
        <h1 className='font-bold text-lg sm:text-xl lg:text-2xl whitespace-nowrap'>Quick Buy</h1>
      </div>
      <p className='text-xs font-semibold text-green-600 lg:ml-4'>{all.length} Products Available</p>
    </div>
    
    {/* search */}
    <div className='w-full lg:w-auto'>
      <form onSubmit={handleSubmit(searchPrd)}>
        <input 
          placeholder='Search Products...' 
          id="search" 
          className='border border-[#d5754d]/40 px-2 outline-none rounded-md text-sm w-full lg:w-80 h-10' 
          {...register('search')}
        />
      </form>
    </div>
    
    {/* filter */}
    <div className='flex flex-col sm:flex-row gap-2 w-full lg:w-auto'>
      <select 
        id="catSearch" 
        {...register('catSearch')} 
        className='border border-[#d5754d]/40 px-2 outline-none rounded-md text-sm w-full sm:w-48 lg:w-60 h-10' 
        defaultValue="" 
        onChange={(e)=>category(e.target.value)}
      >
        <option value="" hidden>All Categories</option>
        {cat.map((item) => (
          <option value={item.slug} key={item.slug} className='dark:text-black'>{item.name}</option>
        ))}
      </select>
      <select 
        id="brandSearch" 
        {...register('brandSearch')} 
        className='border border-[#d5754d]/40 px-2 outline-none rounded-md text-sm w-full sm:w-48 lg:w-60 h-10' 
        defaultValue="" 
        onChange={(e)=>brandFilter(e.target.value)}
      >
        <option value="" hidden>All Brands</option>
        {brand.map((item) => (
          <option value={item.name} key={item.slug} className='dark:text-black'>{item.name}</option>
        ))}
      </select>
    </div>
  </div>

  {/* main */}
  <div className='flex flex-col lg:flex-row gap-4 sm:gap-6'>
    {/* list */}
    <div className='bg-white dark:bg-white/80 text-xs w-full lg:w-3/4 shadow-2xl rounded-lg overflow-x-auto border border-[#d5754d]'>
      <div className='min-w-[800px]'> {/* Force horizontal scroll on mobile */}
        <table className="w-full border-collapse text-left text-xs">
          <thead className="text-gray-700 bg-gray-50">
            <tr>
              <th className="px-2 sm:px-4 py-2 sm:py-3">S.No</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3">Code</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3">Product</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 hidden sm:table-cell">Brand</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">Price</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-center">Qty</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {all!=null && all?.length>0 ?
            currentItems?.map((item, index) => {
              const qty = quantity(item) || 0;
              const total = item.price * qty;
              const actualIndex = (currentPage - 1) * itemsPerPage + index + 1;
              return (
                <tr
                  key={item.slug}
                  className="border-t border-gray-200 transition hover:bg-gray-50"
                >
                  <td className="px-2 sm:px-4 py-2 sm:py-3">{actualIndex}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 font-mono text-xs">{item.sku}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 flex items-center gap-2">
                    <span className="text-xs sm:text-sm line-clamp-2">{item.name}</span>
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 hidden sm:table-cell">{item.brand}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3">
                    <div className="flex flex-col">
                      <span className="text-green-600 font-semibold">₹{item.price.toFixed(2)}</span>
                    </div>
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-center">
                    <div className="flex items-center justify-center gap-1 sm:gap-2">
                      <button
                        onClick={() => minusOne(item)}
                        className="px-2 py-1 bg-[#ffb684] rounded cursor-pointer text-xs hover:bg-[#d5754d] transition duration-300"
                      >
                        -
                      </button> 
                      <input
                        type="number"
                        value={qty}
                        readOnly
                        className="w-8 sm:w-12 pl-2 sm:pl-4 flex text-center border border-[#d5754d] rounded text-xs"
                      />
                      <button
                        onClick={() => addOne(item)}
                        className="px-2 py-1 bg-[#ffb684] rounded cursor-pointer text-xs hover:bg-[#d5754d] transition duration-300"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  {/* total */}
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-right font-semibold">
                    {qty > 0 ? `₹${total.toFixed(2)}` : "-"}
                  </td>
                </tr>
              );
            }) :
            <tr>
                <td colSpan="7" className="text-center py-6 font-semibold text-gray-500">
                  {desc}
                </td>
            </tr>
            }
          </tbody>
        </table>
        
        {/* Pagination */}
        {all?.length > itemsPerPage && (
  <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t border-gray-200 gap-3">
    <div className="text-xs text-gray-600">
      Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, all.length)} of {all.length} products
    </div>
    <div className="flex gap-1 flex-wrap justify-center">
      <button
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded border border-[#d5754d] text-xs ${
          currentPage === 1 
            ? "opacity-50 cursor-not-allowed" 
            : "hover:bg-[#ffb684] cursor-pointer"
        }`}
      >
        Previous
      </button>
      
      {/* Always show first page */}
      <button
        onClick={() => setCurrentPage(1)}
        className={`px-3 py-1 rounded border border-[#d5754d] text-xs ${
          currentPage === 1
            ? "bg-[#d5754d] text-white"
            : "hover:bg-[#ffb684] cursor-pointer"
        }`}
      >
        1
      </button>

      {/* Show second page if not already on it */}
      {currentPage !== 2 && totalPages > 2 && (
        <button
          onClick={() => setCurrentPage(2)}
          className={`px-3 py-1 rounded border border-[#d5754d] text-xs ${
            currentPage === 2
              ? "bg-[#d5754d] text-white"
              : "hover:bg-[#ffb684] cursor-pointer"
          }`}
        >
          2
        </button>
      )}

      {/* Show ellipsis if there are pages between 2 and last */}
      {totalPages > 3 && currentPage < totalPages - 1 && currentPage > 2 && (
        <span className="px-2 py-1 text-gray-500">...</span>
      )}

      {/* Show current page if it's not 1, 2, or last */}
      {currentPage > 2 && currentPage < totalPages && (
        <button
          onClick={() => setCurrentPage(currentPage)}
          className="px-3 py-1 rounded border border-[#d5754d] text-xs bg-[#d5754d] text-white"
        >
          {currentPage}
        </button>
      )}

      {/* Show ellipsis before last page if needed */}
      {totalPages > 3 && currentPage < totalPages - 1 && (
        <span className="px-2 py-1 text-gray-500">...</span>
      )}

      {/* Always show last page if there is more than 1 page */}
      {totalPages > 1 && (
        <button
          onClick={() => setCurrentPage(totalPages)}
          className={`px-3 py-1 rounded border border-[#d5754d] text-xs ${
            currentPage === totalPages
              ? "bg-[#d5754d] text-white"
              : "hover:bg-[#ffb684] cursor-pointer"
          }`}
        >
          {totalPages}
        </button>
      )}
      
      <button
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded border border-[#d5754d] text-xs ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-[#ffb684] cursor-pointer"
        }`}
      >
        Next
      </button>
    </div>
  </div>
)}
      </div>
    </div>
    
    {/* cart */}
<div className='w-full lg:w-1/4'>
  <div className='flex flex-col p-3 sm:p-4 bg-white rounded-lg gap-3 sm:gap-4 pb-4 sm:pb-6 lg:top-4 bg-white/95 backdrop-blur-sm z-10 shadow-2xl lg:shadow-none'>
    <p className='font-bold text-sm sm:text-md hidden lg:flex'>Cart Summary</p>
    
    {/* Mobile layout - flex row for items and button side by side */}
    <div className='flex flex-col lg:flex-col gap-3 sm:gap-4 hidden lg:flex'>
      {/* Items and prices section */}
      <div className='flex flex-col gap-2 lg:gap-3'>
        {/* items */}
        <div className='flex justify-between text-xs font-semibold'>
          <p className='text-gray-500'>Total Items</p>
          <p>{localCart.reduce((sum,item)=>sum+item.quantity,0)}</p>
        </div>
        {/* sub total */}
        <div className='flex justify-between text-xs font-semibold'>
          <p className='text-gray-500'>Subtotal</p>
          <p>₹{localCart.reduce((sum,item)=>sum + item.product.price * item.quantity,0).toFixed(2)}</p>
        </div>
        <div className='h-[1px] border border-gray-200 lg:block hidden'></div>
        {/* price */}
        <div className='flex justify-between text-sm font-semibold'>
          <p>Total</p>
          <p className='text-[#d5754d]'>₹{localCart.reduce((sum,item)=>sum + item.product.price * item.quantity,0).toFixed(2)}</p>
        </div>
      </div>

      {/* Desktop separator - hidden on mobile */}
      <div className='h-[1px] border border-gray-200 lg:block hidden'></div>

      {/* Checkout button */}
      <button className='flex justify-center items-center gap-1 py-2 sm:py-3 hover:bg-[#d5754d] rounded-lg cursor-pointer bg-[#ffb684] hover:shadow-2xl hover:-translate-y-1 transition duration-300 lg:mt-0' onClick={()=>proceed()}>
        <HiShoppingCart className='size-4'/> 
        <p className='font-bold text-xs sm:text-sm'>Proceed to Checkout</p>
      </button>
    </div>

    {/* Mobile alternative layout - only shows on mobile when in flex-col */}
    <div className='flex lg:hidden justify-between items-center gap-4'>
      {/* Left side - items and total */}
      <div className='flex flex-col gap-1'>
        <div className='flex gap-2 text-xs font-semibold'>
          <p className='text-gray-500'>Items:</p>
          <p>{localCart.reduce((sum,item)=>sum+item.quantity,0)}</p>
        </div>
        <div className='flex gap-2 text-sm font-semibold'>
          <p className='text-gray-700'>Total:</p>
          <p className='text-[#d5754d]'>₹{localCart.reduce((sum,item)=>sum + item.product.price * item.quantity,0).toFixed(2)}</p>
        </div>
      </div>
      
      {/* Right side - checkout button */}
      <button className='flex justify-center items-center gap-1 py-2 px-4 hover:bg-[#d5754d] rounded-lg cursor-pointer bg-[#ffb684] hover:shadow-2xl transition duration-300 flex-shrink-0' onClick={()=>proceed()}>
        <HiShoppingCart className='size-4'/> 
        <p className='font-bold text-xs'>Checkout</p>
      </button>
    </div>
  </div>
</div>
    {/* cart */}
  </div>
</div>
  )
}

export default QuickBuy