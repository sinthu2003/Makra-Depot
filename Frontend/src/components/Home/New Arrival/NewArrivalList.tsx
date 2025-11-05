import React, { useEffect, useState } from 'react'
import NewArrival from './NewArrival'
import {  getNewProducts } from '../../../api'

const NewArrivalList = () => {
  const [products,setProducts] = useState([])

    // call func
    useEffect(() => {
        getPrds()
    },[])

    // fetch prd from api
    const getPrds = async() => {
        try{
            const result = await getNewProducts();
            // const result =  await prd.json();
            setProducts(result);
        }
        catch(e){
            console.error('Error Messsage is',e);
            setProducts([])
        }
    }

    return (
        <NewArrival products={products}/>
    )
}

export default NewArrivalList