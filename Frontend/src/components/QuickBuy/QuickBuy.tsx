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


  return (
    <div className='mx-5 p-5 flex flex-col gap-10'>
        {/* head */}
        <div className='flex justify-between dark:text-white'>
          <div className='flex items-center justify-center gap-2'>
            {/* flex */}
            <div className='flex gap-1 items-center'>
                <FiBox className='text-[#d5754d] size-7'/>
                <h1 className='font-bold text-2xl whitespace-nowrap'>Quick Buy</h1>
            </div>
            <p className='text-xs font-semibold text-center w-full text-green-600'>{all.length} Products Available</p>
          </div>
          
          {/* search */}
          <form onSubmit={handleSubmit(searchPrd)}>
            <input placeholder='Search Products...' id="search" className='border border-[#d5754d]/40 px-2 outline-none rounded-md text-sm w-80 h-10' {...register('search')}/>
          </form>
          
          {/* filter */}
          <div className='flex gap-2'>
              <select id="catSearch" {...register('catSearch')} className='border border-[#d5754d]/40 px-2 outline-none rounded-md text-sm w-60 h-10' defaultValue="" onChange={(e)=>category(e.target.value)} >
                <option value="" hidden>All Categories</option>
              {
                cat.map((item) => (
                  <option value={item.slug} key={item.slug} className='dark:text-black'>{item.name}</option>
                ))
              }
            </select>
            <select id="brandSearch" {...register('brandSearch')} className='border border-[#d5754d]/40 px-2 outline-none rounded-md text-sm w-60 h-10' defaultValue="" onChange={(e)=>brandFilter(e.target.value)}>
              <option value="" hidden>All Brands</option>
              {
                brand.map((item) => (
                  <option value={item.name} key={item.slug} className='dark:text-black'>{item.name}</option>
                ))
              }
            </select>
          </div>
        </div>

      {/* main */}
      <div className='flex gap-2'>
        {/* list */}
        <div className='bg-white text-xs w-3/4 shadow-2xl rounded-lg overflow-x-auto border border-[#d5754d]'>
            <table className="w-full border-collapse text-left text-xs">
          <thead className="text-gray-700">
            <tr>
              <th className="px-4 py-3">S.No</th>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Brand</th>
              <th className="px-4 py-3 whitespace-nowrap">Display Price</th>
              <th className="px-4 py-3 whitespace-nowrap">Selling Price</th>
              <th className="px-4 py-3 text-center">Qty</th>
              <th className="px-4 py-3 text-right">Total</th>
            </tr>
          </thead>
           <tbody>
            {all!=null && all?.length>0 ?
            all?.map((item, index) => {
              const qty = quantity(item) || 0;
              const total = item.price * qty;
              return (
                <tr
                  key={item.slug}
                  className="border-t border-gray-200 transition"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{item.sku}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    {/* <img
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    /> */}
                    <span>{item.name}</span>
                  </td>
                  <td className="px-4 py-3">{item.brand}</td>
                  <td className="px-4 py-3">₹{item.price.toFixed(2)}</td>
                  <td className="px-4 py-3 text-green-600 font-semibold">
                    ₹{item.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => minusOne(item)}
                        className="px-2 py-1 bg-[#ffb684] rounded cursor-pointer"
                      >
                        -
                      </button> 
                      <input
                        type="number"
                        value={qty}
                        readOnly
                        className="w-12 pl-4 flex text-center border border-[#d5754d] rounded"
                      />
                      <button
                        onClick={() => addOne(item)}
                        className="px-2 py-1 bg-[#ffb684] rounded cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  {/* total */}
                  <td className="px-4 py-3 text-right">
                    {qty > 0 ? `₹${total.toFixed(2)}` : "-"}
                  </td>
                </tr>
              );
            }) :
            <tr>
                <td colSpan="8" className="text-center py-6 font-semibold text-gray-500">
                  {desc}
                </td>
            </tr>
        }
          </tbody>
        </table>
        </div>
        {/* cart */}
        <div className='w-1/4'>
          <div className='flex flex-col p-4 bg-white border border-[#d5754d] rounded-lg gap-4 pb-6'>
              <p className='font-bold text-md'>Cart Summary</p>
              {/* items */}
              <div className='flex justify-between text-xs font-semibold '>
                <p className='text-gray-500'>Total Items</p>
                <p>
                  {localCart.reduce((sum,item)=>sum+item.quantity,0)}
                </p>
              </div>
              {/* sub total */}
              <div className='flex justify-between text-xs font-semibold '>
                <p className='text-gray-500'>Subtotal</p>
                <p>₹
                  {
                    localCart.reduce((sum,item)=>sum + item.product.price * item.quantity,0)
                  }
                </p>
              </div>
              <div className='h-[1px] border border-gray-200'></div>
              {/* price */}
              <div className='flex justify-between text-sm font-semibold '>
                <p>Total</p>
                <p className='text-[#d5754d]'>₹
                  {
                    localCart.reduce((sum,item)=>sum + item.product.price * item.quantity,0)
                  }
                </p>
              </div>
              {/* button */}
              <button className='flex justify-center items-center gap-1 py-1 hover:bg-[#d5754d] rounded-lg cursor-pointer bg-[#ffb684] hover:shadow-2xl hover:-translate-y-1 transition duration-300' onClick={()=>proceed()}>
                <HiShoppingCart className='size-4'/> <p className='font-bold text-sm'>Proceed to Checkout</p>
              </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickBuy