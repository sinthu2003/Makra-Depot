import React, { useEffect, useState } from 'react'
import { addOneQuan, getCart, minusOneQuan, removeCart } from '../../api'
import { HiMinus, HiPlus } from 'react-icons/hi'
import Footer from '../Footer/Footer'
import { MdOutlineDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'
// import film from '../../../public/assets/All Products/'
const CartPage = () => {
    const [cartItems,setcartItems] = useState([])

    // get cart items
    const getData = async() => {
        const data = await getCart();
        setcartItems(data)
    }

    // remove item
    const remove = async(cart : any) => {
        const removed = await removeCart(cart._id,cart.product_id._id)
        if(removed?.status === 200 || removed?.status === 201){
            const updatedCart = await getCart()
            setcartItems(updatedCart)
        }
    }

    // minusOne quantity
    const minusOne = async(prd : any) => {
        await minusOneQuan(prd)
        getData()
    }

    // addOne quantity
    const addOne = async(prd : any) => {
        await addOneQuan(prd)
        getData()
    }

    useEffect (() => {
        getData()
    },[])

  return (
    <div className='min-h-screen p-10'>
        {/* cart container */}
        <div>
                <div className='flex flex-col gap-2 w-3/4 bg-white mx-auto p-10 shadow-lg'>
                    {/* head */}
                    <div className='flex flex-col gap-2 border-b border-gray-400 p-2'>
                        <div className='md:flex justify-between'>
                            <p className='text-xl font-bold text-[#d5754d]'>Shopping Cart</p>
                            <div className='ml-auto'>
                                <p className='text-xl font-bold text-[#d5754d]'>Cart Total</p>
                                <p className='text-xl font-bold'>₹{
                                    cartItems?.length > 0 ? 
                                    cartItems.reduce((total,item) =>
                                        total + item.product_id.rate * item.quantity,0
                                    )
                                    :0
                                }</p>
                            </div>
                        </div>
                        <p className='text-sm text-blue-700'>Select all items</p>
                        <p className='text-sm text-blue-700 ml-auto hidden md:flex'>Price</p>
                    </div>
                {cartItems?.length > 0 ? (cartItems.map( (item) => (
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
                            <p className='text-gray-500 text-sm'>Eligible for free shipping</p>
                            <p className='text-red-500'>Limited time deal</p>
                            <button className='bg-red-500 w-[80px] h-[30px] text-white rounded-md'>{item.product_id.desc}</button>
                            {/* quantity */}
                            <button
                                className="font-bold px-2 py-1 mt-2 border-3  w-[100px] border-yellow-400 rounded-full cursor-pointer flex justify-between items-center"
                                >
                                {item.quantity > 1 ? 
                                    <HiMinus className='text-lg' onClick={() => minusOne(item.product_id)}/> //quan is greater than 1 
                                        :
                                    <MdOutlineDelete className='text-md' onClick={() => remove(item)}/>
                                }
                                <span className='text-sm'>{item.quantity}</span>
                                <HiPlus className='text-sm' onClick={() => addOne(item.product_id)}/>
                                </button>
                        </div>
                        {/* price */}
                        <div className='md:ml-auto'>
                            <p className='font-bold'>₹{item.product_id.rate}</p>
                        </div>
                    </div>
                    ))) :(
                        <div className='flex flex-col justify-center align-center p-4 mx-auto gap-4'>
                            <p className='font-extrabold text-2xl mx-auto'>Cart is Empty</p>
                            <button className="py-2 px-6 rounded-full bg-[#ffb684] hover:bg-[#d5754d] hover:cursor-pointer font-bold shadow-md transition duration-300">
                                <Link to='/wishlist'>Go to Wish List</Link>
                            </button>
                        </div>
                    )}
                    {/* place your order */}
                    {
                        cartItems?.length > 0 && (
                            <div className='flex justify-center'>
                                <button className="font-bold m-2 py-2 px-4 bg-yellow-400 rounded-full cursor-pointer hover:bg-yellow-500 whitespace-nowrap">
                                    Place Your Order
                                </button>
                            </div>
                        )
                    }
                </div>
        </div>
        {/*  */}
        <Footer />
    </div>
  )
}

export default CartPage