import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

const Category = ({ topProducts }: any) => {

    const nav = useNavigate()
    // 1. New State for item limit
    const [itemLimit, setItemLimit] = useState(6);

    const goTo = async (slug: string) => {
        nav('/products', { state: { categorySlug: slug } })
    }

    // --- Start of Screen Size Logic ---
    useEffect(() => {
        const updateItemLimit = () => {
            const width = window.innerWidth;
            // md breakpoint starts at 768px in default Tailwind config
            // We want 4 on md, and 6 on lg (1024px) and up.
            if (width < 1024) { // Below lg (including md, sm, xs)
                setItemLimit(4); // Show 4 items
            } else { // lg and up
                setItemLimit(6); // Show 6 items
            }
        };

        // Initial check
        updateItemLimit();

        // Add event listener for window resize
        window.addEventListener('resize', updateItemLimit);

        // Cleanup listener on component unmount
        return () => window.removeEventListener('resize', updateItemLimit);
    }, []); // Run only once on mount
    // --- End of Screen Size Logic ---


    return (
        <div className='m-2 sm:m-4 lg:m-5 gap-6 sm:gap-8 lg:gap-10 px-3 sm:px-4 lg:px-5'>
            {/* head */}
            <div className='items-center justify-center flex flex-col text-center'>
                <h1 className='font-bold text-xl sm:text-2xl lg:text-3xl dark:text-white'>Shop By Category</h1>
                <div className="h-[2px] sm:h-[3px] w-12 sm:w-16 mx-auto mt-1 sm:mt-2 bg-[#d5754d]"></div>
                <p className='mt-2 sm:mt-3 font-semibold dark:text-white/80 text-sm sm:text-base px-2'>Find the perfect fireworks for your celebration</p>
            </div>

            {/* products */}
            <div className="m-2 sm:m-4 mt-6 sm:mt-8 lg:mt-10">
                <ul className="mx-10 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                    {/* 2. Used itemLimit in the slice */}
                    {topProducts
                        .filter(item => item.productCount > 10)
                        .slice(0, itemLimit)
                        .map((prd, index) => (
                            <li key={index} className="bg-white dark:bg-gray-900 rounded-xl shadow-md dark:shadow-[#ffb684]/20 border-1 group border-[#d5754d] hover:border-[#d5754d] hover:cursor-pointer transition p-3 sm:p-4 flex flex-col items-center hover:-translate-y-1 sm:hover:-translate-y-2 duration-400 hover:shadow-2xl" onClick={() => goTo(prd.slug)}>
                                <p className="font-bold text-center text-xs sm:text-sm group-hover:text-[#d5754d] dark:text-white line-clamp-2">{prd.name}</p>
                                <p className="text-gray-500 text-xs font-semibold text-center mt-1 flex gap-1 whitespace-nowrap">
                                    {prd.productCount}
                                    <span>Products</span>
                                </p>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    )
}

export default Category