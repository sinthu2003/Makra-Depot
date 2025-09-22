import { useForm } from "react-hook-form";
import { userLogin } from "../../api";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    // type
    type formValues = {
        email : string,
        password: string
    }

    //  useForm 
    const {register,handleSubmit,formState} = useForm<formValues>({
        mode : 'onBlur'
    })

    // nav
    const nav = useNavigate()

    const onSubmit = async(data : any)  =>{
        const response = await userLogin(data)
        if (response?.status === 200 || response?.status === 201) {
            nav('/');
        }
    }

    const {errors} = formState
    return (
        <>
        <div className="flex justify-center items-center min-h-screen">
            <div className="shadow-xl rounded-lg bg-white border border-[#f0c2a2]">
            <form className="flex flex-col gap-2 p-10" onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* head */}
                <h1 className="text-center font-bold text-2xl text-[#d5754d]">LOGIN</h1>

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
                
                {/* login */}
                <button type='submit' className='w-full py-2 mt-4 rounded-full bg-[#d5754d] hover:bg-[#b35f3f] text-white font-bold shadow-md transition duration-300 disabled:bg-gray-300 disabled:text-black hover:cursor-pointer' 
                >Login</button>

                {/* signup action */}
                <p className="text-sm m-2">Don't have an account?<Link to="/signup" className="mx-2 text-blue-700 underline">Sign up</Link></p>

            </form>
            </div>
        </div>

        </>
    )
}

export default Login