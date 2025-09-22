import axios from "axios";

// const apiUrl = 'http://localhost:3000'

// authorization
// const auth = axios.create({
//     baseURL : apiUrl,
//     headers : {
//         Authorization : `Bearer ${localStorage.getItem('webtoken')}`
//     }
// })

// for refresh call
// const authAxios = axios.create()

// request interceptor
axios.interceptors.request.use(
    async (req) => {
        const token = localStorage.getItem('webtoken')
       if (token) {
        req.headers.Authorization = `Bearer ${token}`;
        }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        if(error.response && error.response.status === 401){
            try{
                const refreshToken = localStorage.getItem('refreshToken')
                if (!refreshToken) {
                    return Promise.reject(new Error('No refresh token available'));
                }

                // refresh call
                const newToken = await axios.post('http://localhost:3000/user/refresh',{refreshToken})
                localStorage.setItem('webtoken',newToken.data.accesstoken)
                localStorage.setItem('refreshToken',newToken.data.refreshToken)

                // req with new token
                axios.defaults.headers.common['Authorization'] = `Bearer ${newToken.data.accesstoken}`;

                // original req
                const orginal = error.config;
                orginal.headers['Authorization'] = `Bearer ${newToken.data.accesstoken}`
                console.log('orginal',orginal)
                return axios(orginal)
            }
            catch (err){
                localStorage.removeItem('webtoken')
                localStorage.removeItem('refreshToken')
                window.location.href = '/login';
                return Promise.reject(err)
            }
        }
        return Promise.reject(error)
    }
)


// ------------------ cart ---------------------- //
// read
export const getCart = async() => {
     try {
        const id = await userData()
        if(id?.status === 200 || id?.status === 201) {
            const userId = id.data._id
            const cart = await axios.get(`http://localhost:3000/cart/${userId}`);
            return cart.data;
        }
        return []
    }
    catch(e){
        console.error(e)
        return [];
    } 
}

// const userId = await userData()
//         const user_id = userId?.data._id
//         const cart = await axios.get(`http://localhost:3000/cart/${user_id}`);
//         return cart.data;

// delete using cart id
export const removeCart = async(id : string,prd_id : string) => {
     try {
        return await axios.delete(`http://localhost:3000/cart/${id}`);
    }
    catch(e){
        console.error(e)
        return [];
    } 
}

// delete (object,prd_id)
export const removeCartItem = async(id : string) => {
     try {
        const get = await getPrdById(id)
        return await axios.delete(`http://localhost:3000/cart/${get._id}`);
    }
    catch(e){
        console.error(e)
        return [];
    } 
}

// create
export const createCartItem = async(data : any) => {
    const userId = await userData()
    if(userId){
        return await axios.post('http://localhost:3000/cart/',{user_id :userId?.data._id,product_id:data})
    }
    return {status:400}
}


// get prd by id
export const getPrdById = async (id : string ) => {
    const get = await axios.get(`http://localhost:3000/cart/prd/${id}`)
    return get.data
}

// addOne
export const addOneQuan = async (prd : any) => {
    const get = await getPrdById(prd._id)
    const update = await axios.patch(`http://localhost:3000/cart/addOne/${get._id}`) 
    return update
}

export const minusOneQuan = async (prd : any) => {
    const get = await getPrdById(prd._id)
    const update = await axios.patch(`http://localhost:3000/cart/minusOne/${get._id}`) 
    return update
}

// ---------------- product -------------------- //
// fetch
export const getProducts = async() => {
        try{
            const result = await axios.get('http://localhost:3000/products');
            return result.data;
        }
        catch(e){
            console.error('Error Messsage is',e);
            return []
        }
    }

// update product added to cart

// export const updateAdded = async(prd_id : any) => {
//     const update = await axios.patch(`http://localhost:3000/products/${prd_id}`)
//     return update;
// }

// update wishlist of prd
// export const updateLiked = async(prd_id : any) => {
//     const update = await axios.patch(`http://localhost:3000/products/wishlist/${prd_id}`)
//     return update;
// }

// ----------------------------------------------------------wish list ----------------------------------------------- //

// fetch

// export const getWishList = async() => {
//     return await axios.get('http://localhost:3000/wish-list')
// } 

export const getWishList = async() => {
    const userId = await userData()
    if(userId?.status === 200 || userId?.status === 201) {
        return await axios.get(`http://localhost:3000/wish-list/${userId.data._id}`)
    }
    return []
}

// create
export const addWishList = async(prd : any) => {
    const id = await userData()
    if(id?.status === 200 || id?.status === 201) {
        const userId = id.data._id
        const res= await axios.post('http://localhost:3000/wish-list',{userId,prd})
        return res
    }
    return []
}

// delete
export const updateWishList = async(prd : any) => {
    const res= await axios.delete(`http://localhost:3000/wish-list/${prd._id}`)
    return res
}

// ---------------------- user -------------------- //

export const signUp = async(data : any) => {
    // role
    data.role='User'
    const res = await axios.post('http://localhost:3000/user',data)
    if(res.status === 200 || res.status === 201) {
        return res;
    }
        return null
}

export const userLogin = async (data :any) => {
    const res = await axios.post('http://localhost:3000/user/login',data)
    if(res?.status === 200 || res?.status === 201){
        localStorage.setItem('webtoken',res.data.accesstoken)
        localStorage.setItem('refreshToken',res.data.refreshToken)
    }
    return res;
}

export const userData = async() => {
    try{
        // const auth = axios.create({
        //     baseURL : apiUrl,
        //     headers : {
        //         Authorization : `Bearer ${localStorage.getItem('webtoken')}`
        //     }
        // });
        const response = await axios.get('http://localhost:3000/user')
        return response
    }
    catch (e : any) {
        return {status : 401};
    }
}

// export const refreshToken= async() => {
//      try{
//         if(!!localStorage.getItem('refreshToken')){
//             const refreshToken = localStorage.getItem('refreshToken')
//             const response = await axios.post('http://localhost:3000/user/refresh',{refreshToken})
//             localStorage.setItem('webtoken',response.data)
//             // localStorage.setItem('refreshToken',response.data.refreshToken)
//             return userData()
//         }
//     }
//     catch (e : any) {
//         return {status : 401}
//     }
// }


// get all users
export const getAllUsers = () => {
    return axios.get('http://localhost:3000/user/list')
}