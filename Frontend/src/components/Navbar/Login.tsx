import { useForm } from "react-hook-form";
import { completeReg, getCartItems, userLogin, verifyNumber } from "../../api";
import {  useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import {  ToastContainer } from "react-toastify";
import { MdMail, MdOutlineLocalPhone } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { CountContext } from "./CountContext";

const Login = () => {

    // type
    type formValues = {
        phone : string
    }

    //  useForm 
    const {register,handleSubmit,watch,setValue,formState} = useForm<formValues>()
    const {errors} = formState

    // 
    const {setWishCount,setCartCount} = useContext(CountContext)

    const otpRefs = useRef([])

    const [login,setLogin]=useState(false)
    const [verify,setVerify]=useState(false)
    const [check,setCheck]=useState(false)
    const [errMsg,setErrMsg]=useState(false)
    const [loadMsg,setLoadMsg]=useState(false)
    const [signup,setSignup]=useState(false)
    const value = watch('phone')
    const otpValues = watch(["otp1", "otp2", "otp3", "otp4", "otp5", "otp6"]);
    const [number,setNumber] = useState()

    useEffect(() => {
        if(value?.length == 10){
            setLogin(true)
        }
        else{
            setLogin(false)
        }

        const allFilled = otpValues.every((val) => val && val.trim() !== "");
        setCheck(allFilled);
    },[value,otpValues])


    // nav
    const nav = useNavigate()

    // focus to next input in verify
    const handleChange = (e, index) => {
        const value = e.target.value;
        if (!/^[0-9]?$/.test(value)) return;
        setValue(`otp${index + 1}`, value);
        if (value && index < 5) otpRefs.current[index + 1]?.focus();
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
        otpRefs.current[index - 1]?.focus();
        }
    };

    // generate otp
    const onSubmit = async(data : any)  =>{
        try{
            const response = await userLogin(data)
            setLoadMsg(true)
            setTimeout(() =>setLoadMsg(false),2000)

            if (response?.status === 200 || response?.status === 201) {
                setNumber(response.data.data.phone)
                setErrMsg(false)
                setVerify(true)
                for(let i=1;i<=6;i++){
                    setValue(`otp${i}`,'')
                }
            }
        }
        catch(e){
            console.log(e)
        }
    }

    // verify otp
    const onVerify = async(data : any) => {
        const otp = Object.keys(data).filter((key) => key.startsWith("otp")).map((key) => data[key]).join(""); 
        const arr = {
            phone:data.phone,
            otp:otp
        }  
        try{
            const response = await verifyNumber(arr)
            if (response?.status === 200 || response?.status === 201) {
                const result = response.data.data.requiresRegistration
                if(result){
                    setVerify(false)
                    setSignup(true)
                }
                else{
                    localStorage.setItem('webtoken',response.data.data.token)
                    localStorage.setItem('user',JSON.stringify(response.data.data.customer))
                    // store wish list
                    localStorage.setItem('wish',JSON.stringify(response.data.data.customer.wishlist))
                    setWishCount(response.data.data.customer.wishlist? response.data.data.customer.wishlist.length : 0)

                    // store cart
                    const arr = await getCartItems()
                    localStorage.setItem('cart',JSON.stringify(arr))
                    setCartCount(arr? arr.length : 0)
                    nav('/')
                }
            }
            else{
                setErrMsg(true)
            }
        }
        catch(e){
            console.log(e)
        } 
    };

    const resendOtp = async (data: any) => {
    try {
        const response = await userLogin(data);
        if (response?.status === 200 || response?.status === 201) {
        setNumber(response.data.data.phone);
        setVerify(true);
        } 
        else {
        nav("/login");
        }
    } catch (e) {
        console.log(e);
    }
    };

    // change number
    const change = () => {
        setVerify(false)
        nav('/login')
    }

    // signup
    const newRegister = async(data :any) => {
        try{
            const param = {
                phone:data.phone,
                name:data.name,
                email:data.email
            }
            const response = await completeReg(param)
            if(response?.status === 200 || response?.status === 201){
                localStorage.setItem('webtoken',response.data.data.token)
                localStorage.setItem('user',JSON.stringify(response.data.data.customer))
                nav('/')
            }
        }
        catch(e){
            console.log(e)
        }
    }



    return (
        <>
        {/* toast */}
        <ToastContainer autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover draggable />

        <div className="flex justify-center items-center min-h-[50vh] sm:min-h-[60vh] lg:min-h-screen dark:text-white/80 p-4">
  <div className="shadow-xl rounded-lg bg-white dark:bg-gray-900 dark:shadow-[#ffb684]/30 border border-[#f0c2a2] w-full max-w-md">
    {!signup && !verify && 
      <form className="flex flex-col gap-4 p-6 sm:p-8 lg:p-10" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* head */}
        <h1 className="text-center font-bold text-xl sm:text-2xl text-[#d5754d]">Firecrackers</h1>
        
        {/* enter phone number */}
        <div className="flex flex-col gap-4">
          <h1 className="text-center font-bold text-xl sm:text-2xl">Welcome!</h1>

          <label className="font-medium text-sm" htmlFor="phone">Phone Number</label>
          <div className="border border-[#f0c2a2] rounded-lg flex px-3 gap-2 items-center">
            <span className="flex items-center pointer-events-none">
              <MdOutlineLocalPhone size={18} className="text-gray-400"/>
            </span>
            <input 
              id='phone' 
              type='phone' 
              className="outline-none w-full h-12 sm:h-10 rounded-none text-sm font-medium bg-transparent" 
              placeholder="Enter Your 10-digit mobile number" 
              {...register('phone')}
            />
          </div>
          
          <p className="text-xs px-2 text-gray-600">We'll send you a verification code via SMS</p>
          
          {/* login */}
          <button 
            type='submit' 
            className={`w-full py-3 sm:py-2 mt-2 rounded-lg bg-[#d5754d] hover:bg-[#b35f3f] text-white font-bold shadow-md transition duration-300 text-sm hover:-translate-y-1 ${login ? "cursor-pointer" : "cursor-not-allowed"} ${loadMsg && "disabled"}`}
          >
            {!loadMsg ? 'Get OTP' : 'Sending OTP...'}
          </button>
        </div> 
      </form>
    }
    
    { verify && 
      <form className="flex flex-col gap-4 p-6 sm:p-8 lg:p-10" onSubmit={handleSubmit(onVerify)} noValidate>
        {/* head */}
        <h1 className="text-center font-bold text-xl sm:text-2xl text-[#d5754d]">Firecrackers</h1>
        
        <div className="flex flex-col gap-4">
          <h1 className="text-center font-bold text-xl sm:text-2xl">Verify Your Phone</h1>
          <p className="text-xs text-center text-gray-600">We've sent a verification code to {number}</p>
          
          {errMsg && (
            <p className="text-xs w-full px-4 py-2 border border-red-300 bg-red-100/60 rounded-lg text-center">
              Invalid OTP. Please Try Again
            </p>
          )}

          {/* otp */}
          <label className="font-medium text-sm text-center">Enter Verification Code</label>
          <div className="flex justify-center gap-2 sm:gap-3 w-full">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                {...register(`otp${index + 1}`)}
                ref={(el) => (otpRefs.current[index] = el)}
                value={otpValues[index] || ""}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-10 h-10 sm:w-12 sm:h-12 border border-[#f0c2a2] text-center text-lg font-bold rounded-md focus:border-[#e6935b] outline-none bg-transparent"
              />
            ))}
          </div>
          
          <div className="flex text-xs font-semibold justify-between mt-2">
            <button type="button" className="text-gray-600 cursor-pointer hover:text-gray-800" onClick={() => change()}>
              Change Number
            </button>
            <button type='button' className="text-[#d5754d] cursor-pointer hover:text-[#b35f3f]" onClick={() => resendOtp({phone:value})}>
              Resend OTP
            </button>
          </div>
                                          
          {/* verify button */}
          <button 
            type='submit' 
            className={`w-full py-3 sm:py-2 mt-2 rounded-lg bg-[#d5754d] hover:bg-[#b35f3f] text-white font-bold shadow-md transition duration-300 text-sm hover:-translate-y-1 ${check ? "cursor-pointer" : "cursor-not-allowed"}`}
          >
            Verify OTP
          </button>
        </div>
      </form>
    }
    
    {signup &&  
      <form className="flex flex-col gap-4 p-6 sm:p-8 lg:p-10" onSubmit={handleSubmit(newRegister)} noValidate>
        {/* head */}
        <h1 className="text-center font-bold text-xl sm:text-2xl text-[#d5754d]">Firecrackers</h1>
        
        {/* enter phone number */}
        <div className="flex flex-col gap-4">
          <h1 className="text-center font-bold text-xl sm:text-2xl">Complete Your Profile</h1>
          <p className="text-xs text-center text-gray-600">Just a few more details to get started</p>
          
          {/* error msgs */}
          {errors.name && (
            <p className="text-xs w-full px-4 py-2 border border-red-300 bg-red-100/60 rounded-lg text-center">
              {errors.name.message}
            </p>
          )}

          {errors.email && (
            <p className="text-xs w-full px-4 py-2 border border-red-300 bg-red-100/60 rounded-lg text-center">
              {errors.email.message}
            </p>
          )}
          
          {/* name */}
          <label className="font-medium text-sm" htmlFor="name">Name</label>
          {/* input */}
          <div className="border border-[#f0c2a2] rounded-lg flex px-3 gap-2 items-center">
            <span className="flex items-center pointer-events-none">
              <FaUser size={18} className="text-gray-400"/>
            </span>
            <input 
              type='text' 
              id='name' 
              className="outline-none w-full h-12 sm:h-10 rounded-none text-sm bg-transparent" 
              placeholder="Enter your full name"
              {...register('name',{
                required: {
                  value: true,
                  message: 'Enter Your Name',
                },
                minLength: {value: 2, message: 'Name must have min 2 letters'},
                validate: (value) => {
                  if(/ {2,}/.test(value)) return 'Double spaces are not allowed'
                }
              })}
            />
          </div>

          {/* email */}
          <label className="font-medium text-sm" htmlFor="email">Email</label>
          {/* input */}
          <div className="border border-[#f0c2a2] rounded-lg flex px-3 gap-2 items-center">
            <span className="flex items-center pointer-events-none">
              <MdMail size={18} className="text-gray-400"/>
            </span>
            <input 
              id='email' 
              type='email' 
              className="outline-none w-full h-12 sm:h-10 rounded-none text-sm bg-transparent" 
              placeholder="Enter your email address"
              {...register('email',{
                required: {
                  value: true,
                  message: 'Enter Your Email'
                },
                pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid Email Format'}
              })}
            />
          </div>
          
          <button 
            type='submit' 
            className="w-full py-3 sm:py-2 mt-2 rounded-lg bg-[#d5754d] hover:bg-[#b35f3f] text-white font-bold shadow-md transition duration-300 text-sm hover:-translate-y-1 cursor-pointer"
          >
            Create Account
          </button>
        </div>
      </form>
    }
  </div>
</div>

        </>
    )
}

export default Login