import { useEffect, useState } from 'react'
import ItemList from './ItemList'
import { itemDesc, related } from '../../../../api'
import { useLocation } from 'react-router-dom'

const Details = () => {
    const [cart,setCart] = useState([])
    const [wish,setWish] = useState([])
    const [item,setItem] = useState([])
    const [relPrds,setrelPrds] = useState([])
    const [review,setReview] = useState([])
    const loc = useLocation()

    useEffect(()=> {
        getItem()
        getReview()
        getRelated()
    },[loc.state])

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

    const getItem = async() => {
        const {details} = loc.state || {}
        const res = await itemDesc(details)
        setItem(res)
        return res
    }

    const getReview = async() => {
        const prd= await getItem()
        const res = await itemDesc(prd?._id)
        setReview(res)
    }

    const getRelated = async() => {
        const prd= await getItem()
        const res = await related(prd?.category)
        setrelPrds(res)
    }

    return (
        <>
            <ItemList item={item} review={review} relPrds={relPrds} cart={cart} wish={wish}/>
        </>
    )
}

export default Details