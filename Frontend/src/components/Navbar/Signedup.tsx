// import React from 'react'
import { HiCheckCircle } from "react-icons/hi";
const Signedup = () => {
  return (
    <>
        <div className="p-10 flex justify-center align-center min-h-screen">
            <div className="flex flex-col w-1/2 h-50 items-center justify-center p-4 rounded-lg bg-green-50 shadow-md">
                <HiCheckCircle className="text-green-600 w-12 h-12 mb-4" />
                <p className="text-green-700 text-lg font-semibold">You are signed up</p>
            </div>
        </div>
    </>
  )
}

export default Signedup