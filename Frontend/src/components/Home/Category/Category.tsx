import { useNavigate } from "react-router-dom"

const Category = ({topProducts} : any) => {
    
  const nav = useNavigate()
  
    const goTo=async(slug : string) => {
      nav('/products',{state:{categorySlug : slug}})
    }

  return (
    <div className='m-5 gap-10 px-5'>
        {/* head */}
        <div className='items-center justify-center flex flex-col'>
          <h1 className='font-bold text-3xl dark:text-white'>Shop By Category</h1>
          <div className="h-[3px] w-1/16 mx-auto mt-2 bg-[#d5754d]"></div>
          <p className='mt-3 font-semibold dark:text-white/80'>Find the perfect fireworks for your celebration</p>
        </div>
        {/* products */}

        <div className="m-4 mt-10">
            <ul className="grid grid-cols-6 gap-4">
                {topProducts.filter(item => item.productCount>10).slice(0,6).map((prd,index) => (
                <li key={index} className="bg-white dark:bg-gray-900 rounded-xl shadow-md dark:shadow-[#ffb684]/20 border-1 group border-[#d5754d] hover:border-[#d5754d] hover:cursor-pointer transition p-4 flex flex-col items-center hover:-translate-y-2 duration-400 hover:shadow-2xl" onClick={()=>goTo(prd.slug)}>
                    <p className="font-bold text-center text-sm group-hover:text-[#d5754d] dark:text-white">{prd.name}</p>
                    <p className="text-gray-500 text-xs font-semibold text-center mt-1 flex gap-1">{prd.productCount}
                        <span>Products</span></p>
                </li>
                ))}
            </ul>
        </div>

    </div>
  )
}

export default Category