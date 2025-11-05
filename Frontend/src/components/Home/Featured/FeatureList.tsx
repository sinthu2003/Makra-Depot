import { useEffect, useState } from 'react'
import { getFeatured } from '../../../api'
import FeaturedPrds from './FeaturedPrds'

const FeatureList = () => {
    const [products,setProducts] = useState([])

     // call func
    useEffect(() => {
        getPrds()
    },[])

    // fetch prd from api
    const getPrds = async() => {
        try{
            const result = await getFeatured();
            setProducts(result);
        }
        catch(e){
            console.error('Error Messsage is',e);
            setProducts([])
        }
    }

  return (
    <FeaturedPrds products={products}/>
  )
}

export default FeatureList