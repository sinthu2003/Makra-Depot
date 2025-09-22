// import React from 'react'

import { useEffect, useState } from 'react';
import Products from './Products'
import axios from 'axios';
import { getCart, getProducts, getWishList } from '../../../api';
// import DtProduct from './DtProduct'

const ProductList = () => {

    const [products,setProducts] = useState([])
    const [cart,setCart] = useState([])
    const [wish,setWish] = useState([])

    // call func
    useEffect(() => {
        getPrds()
        getCrt()
        getWish()
    },[])

    // fetch prd from api
    const getPrds = async() => {
        try{
            const result = await getProducts();
            // const result =  await prd.json();
            setProducts(result);
        }
        catch(e){
            console.error('Error Messsage is',e);
            setProducts([])
        }
    }

    // fetch cart to display quantity
    const getCrt = async() => {
        try{
            const cart = await getCart()
            setCart(cart)
        }
        catch(e){
            console.error(e)
        }
    }

    const getWish = async() => {
        try{
            const wish = await getWishList()
            setWish(wish?.data)
        }
        catch(e) {
            console.error(e)
        }
    }

    return (
        <Products products={products} cart={cart} wish={wish}/>
    )
}

export default ProductList