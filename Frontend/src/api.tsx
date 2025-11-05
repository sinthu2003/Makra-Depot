import axios from "axios";

// const apiUrl = 'https://makradepot-827015814474.asia-south1.run.app/csa-srv'
const apiUrl = 'http://localhost:3000'

// live apis

// new arrivals
export const getNewProducts = async() => {
        try{
            const result = await axios.get(`${apiUrl}/products?sort=createdAt&order=desc&status=active&inStock=true&limit=4`);
            return result.data.data.data;
        }
        catch(e){
            console.error('Error Message is',e);
            return []
        }
}

// categories
export const getCategories = async() => {
        try{
            const result = await axios.get(`${apiUrl}/categories`);
            return result.data.data.data;
        }
        catch(e){
            console.error('Error Message is',e);
            return []
        }
}

// featured
export const getFeatured = async() => {
        try{
            const result = await axios.get(`${apiUrl}/products?tags=Featured&status=active&inStock=true&limit=4`);
            return result.data.data.data;
        }
        catch(e){
            console.error('Error Message is',e);
            return []
        }
}

export const getProducts = async() => {
    try{
        const result = await axios.get(`${apiUrl}/products`)
        return result.data.data.data;
    }
    catch(e){
        console.error('Error Message is',e);
        return []
    }
}

export const getBrands = async() => {
    try{
        const result = await axios.get(`${apiUrl}/brands/active`)
        return result.data.data;
    }
    catch(e){
        console.error('Error Message is',e);
        return []
    }
}

export const getQuickBuy = async() => {
    try{
        const result = await axios.get(`${apiUrl}/products?page=1&limit=200`)
        return  result.data.data.data
    }
    catch(e){
        console.error('Error Message is',e);
        return []
    }
}

export const catFilter = async(slug:string) => {
     try{
        const result = await axios.get(`${apiUrl}/products?page=1&limit=12&category=${slug}`)
        return result.data.data.data;
    }
    catch(e){
        console.error('Error Message is',e);
        return []
    }
}


export const brandFilter = async(slug:string) => {
     try{
        const result = await axios.get(`${apiUrl}/products?page=1&limit=12&brand=${slug}`)
        return result.data.data.data;
    }
    catch(e){
        console.error('Error Message is',e);
        return []
    }
}

export const brandCatFilter = async(cat:string,slug:string) => {
     try{
        const result = await axios.get(`${apiUrl}/products?page=1&limit=12&category=${cat}&brand=${slug}`)
        return result.data.data.data;
    }
    catch(e){
        console.error('Error Message is',e);
        return []
    }
}

//item desc
export const itemDesc = async(slug:string) => {
     try{
        const result = await axios.get(`${apiUrl}/products/slug/${slug}`)
        return result.data.data;
    }
    catch(e){
        console.error('Error Message is',e);
        return []
    }
}

// reviews
export const review = async(id:any) => {
     try{
        const result = await axios.get(`${apiUrl}/reviews/product/${id}`)
        return result.data.data;
    }
    catch(e){
        console.error('Error Message is',e);
        return []
    }
}

// related prds
export const related = async(cat:any) => {
     try{
        const result = await axios.get(`${apiUrl}/products?limit=4&category=${cat}`)
        return result.data.data.data;
    }
    catch(e){
        console.error('Error Message is',e);
        return []
    }
}

// user login
export const userLogin = async (data :any) => {
    const res = await axios.post(`${apiUrl}/customers/otp/generate`,data)
    return res;
}

// verify
export const verifyNumber = async (data :any) => {
     try{
        const res = await axios.post(`${apiUrl}/customers/otp/verify`,data)
        return res;
     }
     catch(e){
        console.error('Error Message is',e);
        return []
    }

}

// signup
export const completeReg = async (data :any) => {
     try{
        const res = await axios.post(`${apiUrl}/customers/complete-registration`,data)
        return res;
     }
     catch(e){
        console.error('Error Message is',e);
        return []
    }

}

// get user
export const userDetails = async () => {
     try{
        const auth = axios.create({
            baseURL : apiUrl,
            headers : {
                Authorization : `Bearer ${localStorage.getItem('webtoken')}`
            }
        });
        const res = await auth.get('/customers/me')
        return res;
     }
     catch(e){
        console.error('Error Message is',e);
        return []
    }

}

// address
export const shippingAdd = async (data :any) => {
    const res = await userDetails()
    const updatedAdd = [...(res.data.data.shippingAddresses || []),data]
    const auth = axios.create({
            baseURL : apiUrl,
            headers : {
                Authorization : `Bearer ${localStorage.getItem('webtoken')}`
            }
    });
    const requestBody = {
        "shippingAddresses":updatedAdd
    }

    if(data.isDefault){
        requestBody.address = data
        const clean = res.data.data.shippingAddresses?.map((addr)=> ({
            ...addr,'isDefault':false
        }))
        const updateModified = [...(clean || []),data]
        requestBody.shippingAddresses = updateModified
    }
    console.log(requestBody)
    
     try{
        const res = await auth.put('/customers/me',requestBody)
        return res;
     }
     catch(e){
        console.error('Error Message is',e);
        return []
    }

}


// get user
export const createOrder = async (data :any) => {
     try{
        const auth = axios.create({
            baseURL : apiUrl,
            headers : {
                Authorization : `Bearer ${localStorage.getItem('webtoken')}`
            }
        });
        const res = await auth.post('/orders/my-order',data)
        // send sms
        if(res?.status == 200 || res?.status == 201){
           await updateUserOrders(res.data.data.total)
            const log=JSON.parse(localStorage.getItem('user'))
            const mid=res.data.data._id
            const body = {
                id:mid,phone:log.phone
            }
            sendOrderPlacedSms(body)
        }
        return res;
     }
     catch(e){
        console.error('Error Message is',e);
        return []
    }

}

//get all my orders
export const myOrders =async() => {
    try{
        const auth = axios.create({
            baseURL : apiUrl,
            headers : {
                Authorization : `Bearer ${localStorage.getItem('webtoken')}`
            }
        });
        const res = await auth.get('orders/my-orders')
        return res;
     }
     catch(e){
        console.error('Error Message is',e);
        return []
    }
}

// get company details
export const getCompany =async() => {
    try{
        const res = await axios.get(`${apiUrl}/company/public`)
        return res
     }
     catch(e){
        console.error('Error Message is',e);
        return []
    }
}

export const contactMsg =async(data : any) => {
    try{
        const res = await axios.post(`${apiUrl}/contact-messages`,data)
        return res
     }
     catch(e){
        console.error('Error Message is',e);
        return []
    }
}

// sms 
export const sendOrderPlacedSms = async(data:any) => {
    const response = await axios.post(`${apiUrl}/customers/sms`,data)
    return response
}

export const getCoupon = async(code :any)=> {
    const response = await axios.get(`${apiUrl}/coupons/code/${code}`)
    return response
}

export const updateUserOrders = async(total:any) => {
    try{
        const auth = axios.create({
            baseURL : apiUrl,
            headers : {
                Authorization : `Bearer ${localStorage.getItem('webtoken')}`
            }
        });
        const res= await auth.post('customers/orderUpdate',{total})
        return res;
     }
     catch(e){
        console.error('Error Message is',e);
        return []
    }
}

// update wishlist
export const updateWishList = async() => {
    try{
        const requestBody =  JSON.parse(localStorage.getItem('wish') || '[]')
        const user = JSON.parse(localStorage.getItem('user') || '')
        const res= await axios.put(`${apiUrl}/customers/${user._id}/wishlist`,{requestBody})
        return res;
     }
     catch(e){
        console.error('Error Message is',e);
        return []
    }
}

// update cart
export const newCart = async() => {
    try{
        const localCart =  JSON.parse(localStorage.getItem('cart') || '[]')

        // user info
        const user = JSON.parse(localStorage.getItem('user') || '')
        const customerInfo = {
            customerId: user._id,

            customerName: user.name,

            customerEmail: user.email,

            customerPhone: user.phone,
        }

        // cart items
        const cartItem =  
            localCart.map((item :any) => ({
                    "productId": item.product.slug,

                    "productName": item.product.name,

                    "productSku": item.product.sku,

                    "quantity": item.quantity,

                    "unitPrice": item.product.price,

                    "totalPrice": Math.floor(item.quantity * item.product.price) 
            }))
        

        const requestBody = {
            customer :customerInfo,
            items:cartItem,
        }

        const res= await axios.put(`${apiUrl}/abandoned-cart/my-cart`,{requestBody})
        return res;
     }
     catch(e){
        console.error('Error Message is',e);
        return []
    }
}

// get cart for user
export const getCartItems = async() => {
    try{
        const auth = axios.create({
            baseURL : apiUrl,
            headers : {
                Authorization : `Bearer ${localStorage.getItem('webtoken')}`
            }
        });
        const res= await auth.get('abandoned-cart/my-cart')
        const cartData = res.data.items?.map((prd :any)=> (
            {
                "product":{
                    "slug":prd.productId,
                    "name":prd.productName,
                    "sku":prd.productSku,
                    "price":prd.unitPrice
                },
                "quantity":prd.quantity
            }
        ))
        return cartData;
     }
     catch(e){
        console.error('Error Message is',e);
        return []
    }
}
