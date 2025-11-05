import  { useEffect, useState } from 'react'
import { getBrands } from '../../api'
import BrandsPage from './BrandsPage'

const BrandList = () => {
  const [brand,setBrand] = useState([])

    // call func
      useEffect(() => {
        getBrand()
      },[])
  
      // fetch cat from api
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
      <BrandsPage brand={brand}/>
    </>
  )
}

export default BrandList