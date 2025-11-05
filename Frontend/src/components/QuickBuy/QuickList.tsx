import React, { useEffect, useState } from 'react'
import { getBrands, getCategories, getQuickBuy } from '../../api'
import QuickBuy from './QuickBuy'

const QuickList = () => {
  const [list,setList] = useState([])
  const [cat,setCat] = useState([])
  const [brand,setBrand] = useState([])

    // call func
      useEffect(() => {
        getPrds()
        getCat()
        getBrand()
      },[])
  
      // fetch cat from api
      const getPrds = async() => {
          try{
              const result = await getQuickBuy();
              setList(result);
          }
          catch(e){
              console.error('Error Messsage is',e);
              setList([])
          }
      }

      const getCat = async() => {
          try{
              const result = await getCategories();
              setCat(result);
          }
          catch(e){
              console.error('Error Messsage is',e);
              setCat([])
          }
      }

      const getBrand = async() => {
          try{
              const result = await getBrands();
              setBrand(result);
          }
          catch(e){
              console.error('Error Messsage is',e);
              setBrand([])
          }
      }

  return (
    <>
      <QuickBuy list={list} cat={cat} brand={brand}/>
    </>
  )
}

export default QuickList