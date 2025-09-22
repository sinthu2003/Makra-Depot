// import React from 'react'

import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { signUp } from "../../api";

const Signup = () => {

  type formValues = {
    name: string;
    email: string;
    password:string
    mobile_number: string;
    address: string;
    // dob:Date;
  };

  // useform
  const {register,handleSubmit,formState} = useForm<formValues>
  ({
    mode:'onBlur'
  })
  
  // useNavigate 
  const nav = useNavigate()

  // get formState
  const {errors,
    // isDirty,isValid,isSubmitting
  } = formState

  // onsubmit
  const onSubmit = async(data:formValues) =>{
    const response = await signUp(data);
    if(response){
      nav('/login')
    }
  }

  // reset
  // const clear= () =>{
  //     reset(undefined,{
  //       keepErrors: false
  //     })
  // }

  return (
    <>
     <div className="flex justify-center items-center min-h-screen">
        <div className="shadow-xl rounded-lg bg-white border border-[#f0c2a2]">
          <form className="flex flex-col gap-2 p-10" onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* head */}
            <h1 className="text-center font-bold text-2xl text-[#d5754d]">SIGN UP</h1>

            {/* name */}
            <label className="font-medium" htmlFor="name">Name</label>
            <input type='text' id='name' className="border border-[#f0c2a2] outline-none w-80 h-10 rounded-none "
              {...register('name',{
                required:{
                  value:true,
                  message:'Enter Your Name',
                },
                minLength:{value:2,message:'Name must have min 2 letters'},
                validate:(value) =>{
                  if(/ {2,}/.test(value)) return 'Double spaces are not allowed'
                }
              })}
            />
            <p className="text-red-700 text-sm ">{errors.name?.message as string}</p>

            {/* email */}
            <label className="font-medium" htmlFor="email">Email</label>
            <input id='email' type='email' className="outline-none w-80 h-10 border border-[#f0c2a2] rounded-none "
              {...register('email',{
                required:{
                  value:true,
                  message:'Enter Your Email'
                },
                pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,message:'Invalid Email Format'}
              })}
            />
            <p className="text-red-700 text-sm ">{errors.email?.message as string}</p>

            {/* password */}
            <label className="font-medium" htmlFor="password">password</label>
            <input id='password' type='password' className="outline-none w-80 h-10 border border-[#f0c2a2] rounded-none "
              {...register('password',{
                required:{
                  value:true,
                  message:'Enter Your password'
                },
              })}
            />
            <p className="text-red-700 text-sm ">{errors.password?.message as string}</p>
            
            {/* mobile */}
            <label className="font-medium" htmlFor="mobile_number">Mobile</label>
            <input id='mobile_number' type='text' className="outline-none w-80 h-10 border border-[#f0c2a2] rounded-none "
              {...register('mobile_number',{
                required:{
                  value:true,
                  message:'Enter Your Mobile',
                },          
                minLength:{value:10,message:'Invalid Mobile Number:Minimum 10 digits'},
                maxLength:{value:10,message:'Invalid Mobile Number:Max 10 digits'},
                validate: (value) => {
                  // const trimmedVal = value.trim()
                  if(!/^\d+$/.test(value)) 
                    return "Only numbers are allowed";
                  // else if (trimmedVal.length > 10 || trimmedVal.length < 10)
                  //   return "Number should not be lesser or exceed 10"
                  // else
                  return true
                }
              })} />
            <p className="text-red-700 text-sm ">{errors.mobile_number?.message as string}</p>

            {/* dob
            <label className="font-medium" htmlFor="dob">D.O.B</label>
            <input type='date' id='dob' className="outline-none w-80 h-10 border border-[#f0c2a2] rounded-none "
            {...register('dob',{
              required:{
                  value:true,
                  message:'Enter Your D.O.B',
                },
              valueAsDate:true
            })}/>
            <p className="text-red-700 text-sm ">{errors.dob?.message as string}</p> */}

            {/* address */}
            <label className="font-medium" htmlFor="address">Address</label>
            <textarea id='address' rows={3} className="outline-none w-80 h-15 border border-[#f0c2a2] rounded-none "
              {...register('address',{
                required:{
                  value:true,
                  message:'Enter Your Address',
                },
                maxLength:{value:40,message:'Address exceeds the limit'}
              })}
            />
            <p className="text-red-700 text-sm ">{errors.address?.message as string}</p>

            {/* <div className="flex justify-center align-center gap-2"> */}
                {/* sign up */}
                <button type='submit' className='w-full py-2 mt-4 rounded-full bg-[#d5754d] hover:bg-[#b35f3f] text-white font-bold shadow-md transition duration-300 disabled:bg-gray-300 disabled:text-black hover:cursor-pointer' 
                // disabled={!isDirty || isSubmitting || !isValid}
                >Sign up</button>
                {/* reset */}
                {/* <button type='submit' className='w-1/2 py-2 mt-4 rounded-full bg-[#d5754d] hover:bg-[#b35f3f] text-white font-bold shadow-md transition duration-300' onClick={clear}>Reset</button> */}
            {/* </div> */}

          </form>
        </div>
      </div>

    </>
  )
}

export default Signup