import { FaLightbulb, FaPlus, FaShippingFast } from 'react-icons/fa'
import { GoTag } from 'react-icons/go'
import { IoLocationOutline } from 'react-icons/io5'
import { useForm } from 'react-hook-form'
import { useContext, useEffect, useState } from 'react'
import { MdOutlineAccessTime, MdOutlineShield } from 'react-icons/md'
import { createOrder, getCoupon, shippingAdd, userDetails } from '../../api'
import { useNavigate } from 'react-router-dom'
import { CountContext } from '../Navbar/CountContext'

const Checkout = () => {
  const [loginError,setLoginError]=useState(false)
  const [errMsg,setErrMsg]=useState(false)
  const [discount,setDiscount]=useState()
  const [list,setList] = useState([])
  const [user,setUser] = useState()
  const [total,setTotal] = useState(0)
  const [add,setAdd] = useState()
  const [isModelOpen,setIsModelOpen] = useState(false)
  const { setCartCount } = useContext(CountContext);
  

  const nav = useNavigate()

  const {
    register: registerCoupon,
    handleSubmit: handlerCouponSubmit,
    formState:{errors}
  } = useForm();

  const {
    register: registerAddress,
    handleSubmit: handleAddressSubmit,
    reset:resetAddress
  } = useForm();

  const {register:registerNotes,watch} = useForm();
  const notes = watch('customerNotes')

  // apply coupon
  const apply = async(code : any) => {
    if(errors.code?.message){
      setErrMsg(false)
      setLoginError(true)
    }
      try{
        const res = await getCoupon(code.code)
        if(res.status == 200 || res.status == 201){
          setDiscount(res.data.discountValue)
          setErrMsg(false)
        }
      }
      catch(e){
        setErrMsg(true)
      }
      
  }

  useEffect(() => {
      setList (JSON.parse(localStorage.getItem('cart') || '[]'))
      setUser (JSON.parse(localStorage.getItem('user') || '[]'))
      getAddress()
  },[])

  useEffect(() => {
    setTotal(list?.length > 0 ? 
        list.reduce((total,item) => {
            const rate = item?.product.price
            return total + rate * item?.quantity
        },0)
        :0)
  },[list])

  // order
  const placeOrder = async() => {
      const defaultAddress = add?.filter(loc => loc.isDefault)
      const items = list.map(item => ({
      productId: item.product._id,
      productName: item.product.name,
      sku: item.product.sku,
      price: item.product.price,
      quantity: item.quantity,
      subtotal: item.product.price * item.quantity,
    }));
    let orderTotal = total;
    if(discount){
      const cal = Math.floor((total - (total * (discount / 100))).toFixed(2))
      orderTotal=cal
      setTotal(cal)
    }
      const body = {
        "customerId": user?.id,
        "customerName": user?.name,
        "customerEmail": user?.email,
        "customerPhone": user?.phone,
        'items':items,
        "subtotal": orderTotal,
        "tax": 0,
        "shipping": 0,
        "packing": 0,
        "discount": discount,
        "total": orderTotal,
        "status": "pending",
        "paymentStatus": "pending",
        "paymentMethod": "cash",
        "shippingAddress": {
            "street":defaultAddress[0].street ,
            "city":defaultAddress[0].city ,
            "state":defaultAddress[0].state ,
            "zipCode":defaultAddress[0].zipCode,
            "country":defaultAddress[0].country 
        },
        "customerNotes":notes,
        "paymentProofs": [],
      }

      const res = await createOrder(body)
      if(res.status == 200 || res.status == 201){

        localStorage.setItem('cart','[]')
        setCartCount(0);
        nav(`/order-confirmation/${res?.data.data._id}`,{state:{orderInfo : res?.data.data}})
      }
  }

  const getAddress =async() => {
      try{
        const res = await userDetails()
        if(res.status === 200 || res.status === 201){
            setAdd(res.data.data.shippingAddresses)
        }
      }
      catch(e){
        console.log(e)
      }
  }

  const addAdd = async(data :any) => {
    try{
      const res=await shippingAdd(data)
      if(res.status === 200 || res.status === 201){
        getAddress()
        resetAddress()
        setIsModelOpen(false)
      }
    }
    catch(e){
      console.log(e)
    }
    setIsModelOpen(false)
  } 


  return (
    <>
      <div className='my-10 mx-20 dark:text-white'>
          <p className='font-bold text-2xl'>Checkout</p>
          <div className='flex m-4 gap-10'>
            {/* details */}
            <div className='flex flex-col w-3/4 gap-6'>
              {/* address */}

              {/* head */}
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-1'>
                  <IoLocationOutline className='text-[#d5754d] size-5'/>
                  <p className='font-semibold'>Delivery Address</p>
                </div>
                <div className='flex items-center gap-1 text-[#d5754d] cursor-pointer' onClick={()=>setIsModelOpen(true)}>
                  <FaPlus  className='size-3'/>
                  <p className='text-xs'>Add New</p>
                </div>
              </div>

              {/* content */}
              <div className='w-full justify-center items-center gap-2 flex flex-col font-semibold text-sm'>
                {add?.length == 0 ?  
                  <div className='border border-[#d5754d] py-20 px-50 flex flex-col justify-center gap-2 rounded-lg'><p className='text-gray-500'>No addresses found. Please add a delivery address.</p>
                  <button className='px-4 py-2 mx-auto rounded-lg bg-[#ffb684] hover:bg-[#d5754d] cursor-pointer transition duration-300' onClick={()=>setIsModelOpen(true)}>Add Address</button></div> :
                  <>
                  {add?.map((item,index) => (
                    <div className='border-2 border-[#ffb684] px-6 py-4 w-full rounded-lg flex flex-col gap-1' key={index}>
                      {item.isDefault && <p className='text-xs px-2 py-1 bg-[#ffb684]/50 inline-block rounded-lg w-fit'>Default</p>}
                      <p className='text-xs'>{item.street},{item.city}</p>
                      <p className='text-xs'>{item.state}- {item.zipCode}</p>
                    </div>
                  ))}
                  </>
                }
              </div>

               {/* coupon */}
               <div className='flex flex-col gap-2'>
                  <div className='flex items-center gap-1'>
                    <GoTag className='text-[#d5754d] size-4'/>
                    <p className='font-semibold'>Apply Coupon</p>
                  </div>
                  <p className='px-6 py-2 bg-red-200/40 rounded-lg text-xs flex gap-1 items-center dark:text-black dark:bg-red-100/80'><FaLightbulb />Payment will be collected offline after order confirmation</p>
                  <form className='text-sm flex flex-col gap-2' onSubmit={handlerCouponSubmit(apply)}>
                    <div className='flex gap-2'>
                      <input className='px-6 py-2 rounded-lg border border-[#d5754d] outline-none w-full' disabled={discount} placeholder='Enter coupon code' {...registerCoupon('code',{
                        required:{
                          value:true,
                          message:'Add a Coupon'
                        }
                      })} onFocus={()=> {setLoginError(false);setErrMsg(false)}}/>
                      <button type='submit' className='px-4 py-2 bg-[#ffb684] hover:bg-[#d5754d] cursor-pointer transition duration-300 rounded-lg font-semibold text-sm dark:text-black'>Apply</button>
                    </div>
                    {errors.code && <p className='text-xs font-semibold text-red-600 mx-4'>{errors.code.message as string}</p>}
                    {errMsg && <p className='text-xs font-semibold text-red-600 mx-4'>Invalid Coupon</p>}
                    {discount && <p className='text-xs font-semibold text-green-600 mx-4'>{discount}% discount applied</p>}
                  </form>
               </div>

               {/* notes */}
              <div className='flex flex-col gap-2'>
                <p className='font-semibold'>Order Notes (Optional)</p>
                <form className='text-sm flex flex-col gap-2'>
                    <textarea className='px-6 py-2 rounded-lg border border-[#d5754d] outline-none w-full' placeholder='Add any special instructions for your order...' {...registerNotes('customerNotes')} onFocus={()=> setLoginError(false)}></textarea>
                  </form>
              </div>
            </div>
            {/* summary */}
            <div className='flex flex-col gap-4 w-1/4'>
                <p className='font-semibold'>Order Summary</p>
                {/* prd */}
                {list?.map((item) => (
                    <div className='flex gap-2' key={item.product._id}>
                      <img src="/assets/Product/Product.webp" className='w-15 h-15 rounded-lg'/>
                      {/* price */}
                      <div className='flex flex-col gap-1'>
                        <p className='font-semibold text-xs whitespace-nowrap word-break'>{item.product.name}</p>
                        <p className='text-xs text-gray-700 whitespace-nowrap dark:text-white/60'>Qty: {item.quantity} x ₹{item.product.price}</p>
                      </div>
                    </div>
                ))}
                <div className='h-[1px] border border-black/10'></div>
                {/* sub total */}
                <div className='flex justify-between'>
                    <p className='font-semibold text-xs text-gray-900 dark:text-white/60'>Subtotal</p>
                    <p className='font-semibold text-xs text-gray-900 dark:text-white/60'>₹{total}</p>
                </div>
                <p className='text-xs whitespace-nowrap text-center dark:text-white/60'>Shipping Charges decided by the lorry service</p>
                <div className='h-[1px] border border-black/10'></div>
                {/* discount */}
                  {discount && <p className='text-xs font-semibold text-green-600'>{discount}% discount applied</p>}
                {/* total */}
                <div className='flex justify-between'>
                    <p className='font-bold text-lg'>Total</p>
                    {discount ? (
                      <p className='font-bold text-lg text-green-600'>
                        ₹{Math.floor((total - (total * (discount / 100))).toFixed(2))}
                      </p>
                    ) : (
                      <p className='font-bold text-lg'>₹{total}</p>
                    )}
                </div>
                {/* order */}
                <button className='flex px-6 py-2 rounded-lg bg-[#ffb684] font-semibold justify-center text-sm cursor-pointer hover:bg-[#d5754d] transition duration-300 hover:shadow-2xl hover:scale-102 dark:text-black' onClick={placeOrder}>Place Order</button>
                <div className='h-[1px] border border-black/10'></div>
                {/* desc */}
                <div>
                  <p className='flex gap-1 items-center text-sm'><MdOutlineShield className='size-4 text-green-600'/>Secure SSL Encryption</p>
                  <p className='flex gap-1 items-center text-sm'><FaShippingFast className='size-4 text-green-600'/>Fast & Reliable Delivery</p>
                  <p className='flex gap-1 items-center text-sm'><MdOutlineAccessTime className='size-4 text-green-600'/>Order Tracking Available</p>
                </div>
            </div>
          </div>

          {/* modal */}
          {isModelOpen && 
          <div className='fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-black/10 mt-20 overflow-y-auto'>
            <form className='max-w-[350px] h-auto bg-white shadow-2xl rounded-lg p-6 flex flex-col gap-2 text-sm' onSubmit={handleAddressSubmit(addAdd)}>
                <p className='font-bold text-[#d5754d]'>Add New Address</p>
                <label className='font-semibold'>Address Label</label>
                <select className='w-full border border-[#d5754d]  outline-none px-2 py-1 rounded-md' defaultValue="Home" {...registerAddress('label')}>
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                  <option value="Other">Other</option>
                </select>
                <label className='font-semibold'>Street Address</label>
                <input className='w-full border border-[#d5754d]  outline-none px-2 py-2 rounded-md ' placeholder='House No,Building,Street.Area' {...registerAddress('street')}/>
                <div className='flex gap-2'>
                    <div className='flex flex-col gap-2'><label className='font-semibold'>City</label>
                    <input className='w-full border border-[#d5754d]  outline-none px-2 py-1 rounded-md' {...registerAddress('city')}/></div>
                    <div className='flex flex-col gap-2'><label className='font-semibold'>State</label>
                    <input className='w-full border border-[#d5754d]  outline-none px-2 py-1 rounded-md' {...registerAddress('state')}/></div>
                </div>
                <div className='flex gap-2'>
                    <div className='flex flex-col gap-2'><label className='font-semibold'>Zip Code</label>
                    <input className='w-full border border-[#d5754d]  outline-none px-2 py-1 rounded-md' {...registerAddress('zipCode')}/></div>
                    <div className='flex flex-col gap-2'><label className='font-semibold'>Country</label>
                    <input className='w-full border border-[#d5754d]  outline-none px-2 py-1 rounded-md' {...registerAddress('country')}/></div>
                </div>
                <div className='flex items-center gap-1'>
                  <input type="checkbox" id="isDefault" {...registerAddress('isDefault')}/>Set as default address
                </div>
                <div className='flex justify-between w-full gap-2 my-4 font-semibold'>
                    <button type="button" className='px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-300 w-1/2 cursor-pointer' onClick={()=>setIsModelOpen(false)}>Cancel</button>
                    <button className='px-6 py-2 bg-[#ffb684] rounded-md hover:bg-[#d5754d] transition duration-300 w-1/2 cursor-pointer'>Add Address</button>
                </div>
            </form>
          </div>
          } 
            
          </div>
    </>
  )
}

export default Checkout