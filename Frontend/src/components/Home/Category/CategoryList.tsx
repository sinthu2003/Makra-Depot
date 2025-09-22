// import React from 'react'
import Img3 from '../../../assets/Category/Camera.webp'
import Img2 from '../../../assets/Category/Headphones.webp'
import Img1 from '../../../assets/Category/Monitor.webp'
import Img5 from '../../../assets/Category/Projector.webp'
import Img4 from '../../../assets/Category/Speaker.webp'
// import Category from './Category'
import DtCategory from './DtCategory'

const CategoryList : React.FC = () => {

  const topProducts  = [
        {
            name:'Monitors',
            img:Img1,
            rate:6500
        },
        {
            name:'Wireless Headphones',
            img:Img2,
            rate:899
        },
        {
            name:'Camera',
            img:Img3,
            rate:999
        },{
            name:'Mobile Speaker',
            img:Img4,
            rate:499
        },{
            name:'Projector',
            img:Img5,
            rate:6990
        },
    ];
  return (
    <DtCategory topProducts={topProducts}/>
  )
}

export default CategoryList