// import React from 'react'

import { useEffect, useState } from 'react';
import Products from './Products'
import { getBrands, getCategories, getProducts } from '../../../api';

const ProductList = () => {

    const [products,setProducts] = useState([])
    const [cart,setCart] = useState([])
    const [wish,setWish] = useState([])
    const [cat,setCat] = useState([])
    const [brands,setBrands] = useState([])
    const [searchValue, setSearchValue] = useState(localStorage.getItem("search") || "");
    const [isProductLoading,setIsProductLoading] = useState(true)

    // donno
    useEffect(() => {
    const handleStorageChange = () => {
      setSearchValue(localStorage.getItem("search") || "");
    };

    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(handleStorageChange, 500);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

        // call func
        useEffect(() => {
            getPrds()
            getCat()
            getbrnd()
    },[location.pathname])

    // fetch prd from api
    const getPrds = async() => {
        try{
                const result = await getProducts()
                setIsProductLoading(true)
                setProducts(result)
                setIsProductLoading(false)
        }
        catch(e){
            console.error('Error Messsage is',e);
            setProducts([])
        }
    }

    const getCat = async() => {
          try{
              const result = await getCategories();
              // const result =  await prd.json();
              setCat(result);
          }
          catch(e){
              console.error('Error Messsage is',e);
              setCat([])
          }
      }

    const getbrnd = async() => {
          try{
              const result = await getBrands();
              // const result =  await prd.json();
              setBrands(result);
          }
          catch(e){
              console.error('Error Messsage is',e);
              setBrands([])
          }
      }

    return (
        <>
            <Products products={products} cart={cart} wish={wish} cat={cat} brands={brands} isProductLoading={isProductLoading}/>
        </>
    )
}

export default ProductList