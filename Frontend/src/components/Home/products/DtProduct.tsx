// import React from 'react'

import { useState } from "react";
import { HiMiniArrowsUpDown } from "react-icons/hi2";

// type
type Product = {
  name: string;
  rate: number;
  desc:string
  img: string;
};

type DtProductProps = {
  products: Product[];
};

const DtProduct = ({ products } : DtProductProps) => {

    // search
    const [search, setSearch] = useState('');

    // sort
    const [sort,setSort] = useState({key:'',order:''})

    const handleSort = (header : {key:''}) => {
        setSort({
            key:header.key,
            order:sort.key ? sort.order === 'asc' ? 'desc' : 'asc': 'desc'
        });
        //set current page to 1 after every sort
        // setcurrentPg(1) 
    }

    const getSorted = (arrayData : []) => {
        if(sort.order === 'asc'){
            return arrayData.sort((a,b) => a[sort.key] > b[sort.key] ? 1 : -1)
        }
        return arrayData.sort((a,b) => a[sort.key] > b[sort.key] ? -1 : 1)
    }

    // pagination 
    // const [currentPg,setcurrentPg] = useState(1)
    // const recordPerPage = 5
  
  return (
    <div className="p-14">
        {/* head */}
      <h2 className="text-lG font-bold mb-4 text-center">GRAND REDUCTION DEALS</h2>

        {/* search */}
        <input type="text" placeholder="Search Products..." value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        className="hidden md:flex mb-4 p-2 border rounded w-1/4 outline-none border-gray-300 ml-auto block"
        />

        {/* table */}
      <div className="hidden md:flex">
        <table className="w-full border-collapse border border-[#d5754d]">
            <thead>
                <tr>
                    <th className="border border-[#d5754d] py-2">
                        <button type="button" onClick={() => handleSort({key:'name'})} className="relative w-full cursor-pointer">
                            Product 
                            <span className="absolute top-1/2 -translate-y-1/2 right-5"><HiMiniArrowsUpDown /></span>
                        </button>
                    </th>
                    <th className="border border-[#d5754d] py-2">
                        <button type="button" onClick={() => handleSort({key:'rate'})} className="relative w-full cursor-pointer">
                            Price 
                            <span className="absolute top-1/2 -translate-y-1/2 right-5"><HiMiniArrowsUpDown /></span>
                        </button>                    
                    </th>
                    <th className="border border-[#d5754d] py-2">Reduction</th>
                    <th className="border border-[#d5754d] py-2">Image</th>
                </tr>
            </thead>
            <tbody>
                {getSorted(products).filter((prd) => {
                    const item = search.toLowerCase();
                    return item === '' ? prd : prd.name.toLowerCase().includes(item)
                }).map((prd, index) => (
                    <tr key={index} className="text-center">
                        <td className="border border-[#d5754d] py-2">{prd.name}
                            <span></span>
                        </td>
                        <td className="border border-[#d5754d] py-2">₹{prd.rate}</td>
                        <td className="border border-[#d5754d] py-2">₹{prd.desc}</td>
                        <td className="border border-[#d5754d] py-2">
                            <img src={prd.img} alt={prd.name} className="w-20 h-20 object-contain mx-auto" />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
      {/* card */}
      <div className="md:hidden m-10">
          <div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {products.map((prd,index) => (
                <li key={index} className="bg-white shadow rounded-lg border-3 border-[#fff9e6] hover:border-[#d5754d] hover:cursor-pointer p-4 flex flex-col items-center">

                  <div className="w-full flex items-center justify-center mb-4">
                    <img src={prd.img} className="w-4/5 max-w-[220px] h-50 rounded-lg"/>
                  </div>

                  <p className="font-bold text-center text-sm mb-2">{prd.name}</p>

                  <div className="flex justify-between w-full text-sm">
                    <p className="text-gray-900 font-semibold whitespace-nowrap">₹{prd.rate}</p>
                    <p className="text-green-500 font-bold truncate max-w-[100px] text-right">{prd.desc}</p>
                  </div>

                </li>
              ))}
            </ul>
          </div>
        </div>
    </div>
  )
}

export default DtProduct