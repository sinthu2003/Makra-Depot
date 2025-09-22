import axios from 'axios'
import { useEffect, useState } from 'react'
import { HiMinus, HiPlus } from 'react-icons/hi'
import { MdOutlineDelete } from 'react-icons/md';
import { addOneQuan, addWishList, createCartItem, getCart, getProducts, getWishList, minusOneQuan, removeCartItem, updateWishList } from '../../../api';
import { HiMiniHeart, HiOutlineHeart } from 'react-icons/hi2';
import { BiLoaderCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const Products = ({ products,cart,wish }) => {
  const [localProducts, setLocalProducts] = useState(products);
  const [localCart,setLocalCart] = useState(cart)
  const [localWish,setLocalWish] = useState(wish)
  const [loadingIds, setLoadingIds] = useState([]); //loads until api fetches data
  const [isLogged,setIsLogged] = useState(false)

  // nav
  const nav = useNavigate()

  // render after await prd fetched
  useEffect(() => {
    setLocalProducts(products);
    setLocalCart(cart)
    setLocalWish(wish)
    setIsLogged(!!localStorage.getItem('webtoken'))
  }, [products,cart,wish]);

  // quantity
  const quantity = (prd : any) => {
    const getCart = localCart?.find( (item : any) => item.product_id._id == prd._id);
    return getCart? getCart.quantity : 0
  }

  //remove from cart get cart id 
  const removeFromCart = async (prd : any) => {
      try{
        const res = await removeCartItem(prd._id)
        if (res?.status === 200 || res?.status === 201) {  //deltd cart using prd id
          setLocalCart(await getCart())
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingIds(prev => prev.filter(id => id !== prd._id));
      }
  }

  // create cart
  const addToCart = async (prd : any) => {

    if(isLogged){
      setLoadingIds(prev => [...prev, prd._id]);

      try {
        const response = await createCartItem(prd._id)
        if (response?.status === 200 || response?.status === 201) {  // cart created and product status changed
            // setLocalProducts(prev =>
            //   prev.map(p =>
            //     p._id === prd._id ? { ...p, added: true } : p
            //   )
            // );
            setLocalCart(await getCart())
          }
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingIds(prev => prev.filter(id => id !== prd._id));
      }
    }
    else{
      nav('/login')
    }
  }
  
  const isLoading = (id : string) => {
    return loadingIds.includes(id);
  }

  //  addOne
  const addOne = async(prd : any) => {
    const res = await addOneQuan(prd)
    if(res.status === 200 || res.status === 201) {
      const cartdata = await getCart()
      return setLocalCart(cartdata)
    }
  }

  // minusOne
  const minusOne = async(prd : any) => {
    const res =await minusOneQuan(prd)
    if(res.status === 200 || res.status === 201) {
      const cartdata = await getCart()
      return setLocalCart(cartdata)
    }
  }

  // update wishlist
  const updateWish = async(prd : any) => {
    if(isLogged){
      const res = await updateWishList(prd)
      if(res?.status === 200 || res?.status === 201) {
        const list = await getWishList()
        return setLocalWish(list.data)
      }
    }
    else{
      nav('/login')
    }
  }

  // create
  const addWish = async(prd :any) => {
    if(isLogged){
        const res = await addWishList(prd._id)
      if(res?.status === 200 || res?.status === 201) {
        const list = await getWishList()
        return setLocalWish(list.data)
      }
    }
    else{
      nav('/login')
    }
  } 

  return (
    <>
      <div className='align-center justify-center flex'>
        <h1 className='font-bold'>GRAND REDUCTION DEALS</h1>
      </div>

      <div className="m-10 p-5">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-15">
          {localProducts?.map((prd : any) => (
            <li key={prd._id} className="bg-white shadow rounded-lg border-1 border-[#d5754d] hover:cursor-pointer p-4 flex flex-col items-center">
              <div className='ml-auto text-lg'>
                {/* if logged action works */}
                {isLogged ?
                
                 localWish.some((wish : any) => wish.product_id._id === prd._id) ? 
                (<HiMiniHeart className='text-red-500' onClick={() => updateWish(prd)} />) :
                <HiOutlineHeart onClick={() => addWish(prd)} />
                
                : (
                  <HiOutlineHeart onClick={() => addWish(prd)} />
                )
                }
              </div>
              <div className="w-full flex items-center justify-center mb-4">
                <img src={`/assets/All Products/${prd.img}`} className="w-4/5 max-w-[220px] h-50 rounded-lg" />
              </div>

              <p className="font-bold text-center text-sm mb-2">{prd.name}</p>

              <div className="flex justify-between w-full text-sm">
                <p className="text-gray-900 font-semibold whitespace-nowrap">₹{prd.rate}</p>
                <p className="text-green-500 font-bold truncate max-w-[100px] text-right">{prd.desc}</p>
              </div>

              <div className="flex flex-col gap-2 py-2">
                <p className="text-gray-500 text-sm whitespace-nowrap">1k+ bought in the last month</p>
                <div className="flex">
                  <span className="text-gray-500 text-sm whitespace-nowrap">Delivery</span>
                  <span className="font-bold ml-2 text-sm"> Jul 24 - Jul 30</span>
                </div>

              {isLogged ? (
              isLoading(prd._id) ? (
                <button className="font-bold m-2 p-2 bg-gray-400 rounded-full cursor-not-allowed" disabled>
                  <BiLoaderCircle className='mx-auto' />
                </button>
              ) : !localCart.some((cart : any) => cart.product_id._id === prd._id) ? (
                <button
                  className="font-bold m-2 p-2 bg-yellow-400 rounded-full cursor-pointer hover:bg-yellow-500"
                  onClick={() => addToCart(prd)}
                >
                  Add to Cart
                </button>
              ) : (
                <button
                  className="font-bold m-2 px-4 py-2 border-2 border-yellow-400 rounded-full cursor-pointer flex justify-between items-center"
                >
                  {quantity(prd) > 1 ? (
                    <HiMinus className='text-lg' onClick={() => minusOne(prd)} />
                  ) : (
                    <MdOutlineDelete className='text-lg' onClick={() => removeFromCart(prd)} />
                  )}
                  <span className='text-lg'>{quantity(prd)}</span>
                  <HiPlus className='text-lg' onClick={() => addOne(prd)} />
                </button>
              )
            ) : (
              <button
                className="font-bold m-2 p-2 bg-yellow-400 rounded-full cursor-pointer hover:bg-yellow-500"
                onClick={() => addToCart(prd)}
              >
                Add to Cart
              </button>
            )}

              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Products;
