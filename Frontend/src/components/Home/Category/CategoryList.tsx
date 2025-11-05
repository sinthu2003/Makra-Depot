// import React from 'react'
import { useEffect, useState } from 'react'
import Category from './Category'
import { getCategories } from '../../../api'
import CategoryPage from './CategoryPage'
// import DtCategory from './DtCategory'

const CategoryList : React.FC = () => {

  const [cat,setCat] = useState([])

  const getLoc = location.pathname === '/categories'

    // call func
      useEffect(() => {
        getCat()
      },[])
  
      // fetch cat from api
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

  return (
    // <DtCategory topProducts={topProducts}/>
    <>
    {getLoc ? 
      <CategoryPage cat={cat}/> :
      <Category topProducts={cat}/>
    }
    </>
  )
}

export default CategoryList