import { useContext, useEffect, useState } from 'react'
import { HiMinus, HiOutlineHeart, HiPlus, HiShoppingCart } from 'react-icons/hi'
import { MdOutlineDelete } from 'react-icons/md';
import { brandCatFilter, brandFilter, catFilter, newCart, updateWishList} from '../../../api';
import { HiMiniHeart } from 'react-icons/hi2';
import { BiLoaderCircle } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';
import { CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa';
import { IoMdCart } from 'react-icons/io';
import { CountContext } from '../../Navbar/CountContext';

const Products = ({ products,cart,wish,cat,brands,isProductLoading}) => {
  const [localProducts, setLocalProducts] = useState(products);
  const [localCart,setLocalCart] = useState([])
  const [localWish,setLocalWish] = useState(wish)
  const [categories,setCategories] = useState(cat)
  const [localBrands,setLocalBrands] = useState(brands)
  const [loadingIds, setLoadingIds] = useState([]); //loads until api fetches data
  const [isLogged,setIsLogged] = useState(false)
  const [defaultOption,setDefaultOption] = useState("featured")
  const [defaultCat,setDefaultCat] = useState("")
  const [defaultBrand,setDefaultBrand] = useState("")

  // nav
  const nav = useNavigate()
  const loc = useLocation()
  const categorySlug = loc.state?.categorySlug
  const brandName = loc.state?.brandName
  const newArrival = loc.state?.newArrival
  const { setCartCount,setWishCount } = useContext(CountContext);

  const isLikelyImageUrl = (str) =>
  /^https?:\/\//.test(str) || str.startsWith("/") || str.startsWith("data:");

  // render after await prd fetched
  useEffect(() => {
    setLocalProducts(products);
    setLocalCart(loadCart)
    setLocalWish(loadWish) 
    setLocalBrands(brands)
    setCategories(cat)
    setIsLogged(!!localStorage.getItem('webtoken'))
    setDefaultOption("featured")
    if(categorySlug){
      showCat(categorySlug)
      setDefaultCat(categorySlug)
    }
    if(brandName){
      showBrand(brandName)
      setDefaultBrand(brandName)
    }

    if(newArrival){
      setDefaultOption('new')
    }
  }, [products,cart,wish,categorySlug,brandName,newArrival,isProductLoading]);

  const isLoading = (id : string) => {
    return loadingIds.includes(id);
  }

  const loadCart = () => {
    try {
      return JSON.parse(localStorage.getItem('cart') || '[]')
    } catch {
      return []
    }
  }

  const loadWish = () => {
          try {
            return JSON.parse(localStorage.getItem('wish') || '[]')
          } catch {
            return []
          }
        }

  const saveCart = (cartData) => {
    localStorage.setItem('cart', JSON.stringify(cartData))
    setLocalCart([...cartData])
    setCartCount(cartData.length)
    newCart()
  }

  const saveWish = (wishData) => {
          localStorage.setItem('wish', JSON.stringify(wishData))
          setLocalWish([...wishData])
          setWishCount(wishData.length)
          updateWishList()
        }
  
  // --- Add product for the first time ---
  const addToCart = (prd) => {
    const existing = loadCart()
    const found = existing.find(item => item.product.slug === prd.slug)
    if (found) {
      found.quantity += 1
    } else {
      existing.push({ product: prd, quantity: 1 })
    
      saveCart(existing)
    }
  }

  const addWish = async(prd :any) => {
          const existing = loadWish()
          const foundIndex = existing.findIndex((item) => item.product.slug === prd.slug);
          if (foundIndex !== -1) {
            // If found, remove it (toggle off)
            existing.splice(foundIndex, 1);
          } else {
            // If not found, add it (toggle on)
            existing.push({ product: prd, quantity: 1 });
          }
          saveWish(existing)
        }

  // --- Increase quantity ---
  const addOne = (prd) => {
    const existing = loadCart()
    const updated = existing.map(item =>
      item.product.slug === prd.slug
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
    saveCart(updated)
  }
  // --- Decrease quantity ---
  const minusOne = (prd) => {
    const existing = loadCart()
    const updated = existing
      .map(item =>
        item.product.slug === prd.slug
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0) // remove if quantity hits
    saveCart(updated)
    }
  // --- Remove product entirely ---
  const removeFromCart = (prd) => {
    const existing = loadCart().filter(item => item.product.slug !== prd.slug)
    saveCart(existing)
  }

  // --- Quantity helper for rendering ---
  const quantity = (prd) => {
    const existing = localCart.find(item => item.product.slug === prd.slug)
    return existing?.quantity || 0
  }


  // sort new to old
  const newPrd = () => {
    const updated =  [...localProducts].sort((a:any,b:any) => new Date(b.createdAt) - new Date(a.createdAt))
    setLocalProducts(updated)
    setCurrentPage(1)
  }

  // sort new to old
  const oldPrd = () => {
    const updated = [...localProducts].sort((a: any, b: any) => Number(b.salesCount) - Number(a.salesCount))
    setLocalProducts(updated);
    setCurrentPage(1)
  };


  // sort high to low
  const highPrice = () => {
    const updated =  [...localProducts].sort((a:any,b:any) => b.price - a.price)
    setLocalProducts(updated)
    setCurrentPage(1)
  }

  // sort low to high
  const lowPrice = () => {
    const updated =  [...localProducts].sort((a:any,b:any) => a.price - b.price)
    setLocalProducts(updated)
    setCurrentPage(1)
  }

  // item
  const item=(slug:any) => {
    nav(`/products/${slug}`,{state:{details:slug}})
  }

  // category filter
  const showCat=async(slug:string)=> {
    try{
      if(defaultBrand){
        const res = await brandCatFilter(slug,defaultBrand)
        setLocalProducts(res)
        setCurrentPage(1)

      }
      else{
        const res = await catFilter(slug)
        setLocalProducts(res)
        setCurrentPage(1)

      }
    }
    catch(e){
      console.log(e)
    }
  }

  // brand filter
  const showBrand=async(slug:string)=> {
    try{
      if(defaultCat){
        const res = await brandCatFilter(defaultCat,slug)
        setLocalProducts(res)
        setCurrentPage(1)
      }
      else{
        const res = await brandFilter(slug)
        setLocalProducts(res)
        setCurrentPage(1)
      }
    }
    catch(e){
      console.log(e)
    }
  }

  const clearFilters = () => {
    setDefaultBrand("")
    setDefaultCat("")
    setLocalProducts(products)
  }

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  // ✅ Calculate current products
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = localProducts?.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(localProducts?.length / productsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // optional: scroll up on page change
    }
  };

  const getPaginationNumbers = () => {
      const pages = [];

      if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else {
        // Always show 1st and 2nd page
        pages.push(1);
        if (currentPage > 3) pages.push("...");

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) pages.push(i);

        if (currentPage < totalPages - 2) pages.push("...");

        // Always show last page
        pages.push(totalPages);
      }

      return pages;
    };


  return (
    <div className='m-4 sm:m-6 lg:m-10 mt-4 sm:mt-6 p-4 sm:p-5 flex flex-col gap-6 sm:gap-8 lg:gap-10'>
  <div className='items-center justify-center flex flex-col gap-1 sm:gap-2 text-center'>
    <h1 className='font-bold text-xl sm:text-2xl lg:text-3xl dark:text-white'>All Products</h1>
    <div className="h-[2px] sm:h-[3px] w-12 sm:w-16 mx-auto bg-[#d5754d]"></div>
  </div>

  <div className='flex flex-col gap-4'>
    {/* sort */}
    <div className='flex justify-end'>
      <select value={defaultOption} className='pl-2 pr-10 sm:pr-14 py-2 border border-gray-300 bg-white rounded-md text-xs sm:text-sm font-semibold focus:outline-none cursor-pointer w-full sm:w-auto' 
      onChange={
        (e) => {
          setDefaultOption(e.target.value)
        if(e.target.value==='new') newPrd();
        if(e.target.value==='old') oldPrd();
        if(e.target.value==='high') highPrice();
        if(e.target.value==='low') lowPrice();
        }}>
        <option value="featured" className='hidden'>Sort By: Featured</option>
        <option value="new" className=''>Newest First</option>
        <option value="low" className=''>Price: Low to High</option>
        <option value="high" className=''>Price: High to Low</option>
      </select>
    </div>
    
    {/* main */}
    <div className='flex flex-col lg:flex-row gap-4'>
      {/* filter */}
      <div className='flex flex-col gap-4 dark:text-white w-full lg:w-auto'>
        <div className='border border-[#d5754d] p-3 sm:p-4 rounded-lg'>
          <div className='flex justify-between items-center'>
            <p className='font-bold text-[#d5754d] text-sm sm:text-base'>Filters</p>
            {(defaultCat || defaultBrand) && 
            <p className='font-semibold text-blue-600 text-xs hover:underline cursor-pointer' onClick={()=>clearFilters()}>Clear all</p> }
          </div>
          
          <div className='flex lg:flex-col md:flex-row gap-4'>
  {/* categories */}
  <div className='lg:text-sm sm:mx-auto lg:mx-0 text-xs'>
    <p className='font-bold my-2 dark:text-[#ffb684] text-xs sm:text-sm'>Categories</p>
    <ul className='flex flex-col gap-2 max-h-40 sm:max-h-50 overflow-y-auto'>
      {categories.map((item) => (
        <li key={item.slug} className="flex gap-2 cursor-pointer items-center" onClick={()=>showCat(item.slug)}>
          <label className="flex gap-2 items-center cursor-pointer w-full text-xs sm:text-sm">
            <input type="radio" name="category" value={defaultCat} checked={defaultCat === item.slug} onChange={() => setDefaultCat(item.slug)} className="cursor-pointer"/>
            <p className="truncate sm:max-w-[50%] max-w-[60px]">{item.name}</p>
            <p className="text-gray-500 text-xs">({item.productCount})</p>
          </label>
        </li>
      ))}
    </ul>
  </div>
  
  {/* brands */}
  <div className='lg:text-sm sm:mx-auto lg:mx-0 text-xs'>
    <p className='font-bold my-2 dark:text-[#ffb684] text-xs sm:text-sm'>Brands</p>
    <ul className='flex flex-col gap-2 max-h-40 sm:max-h-50 overflow-y-auto'>
      {localBrands.map((item) => (
        <li key={item.slug} className="flex gap-2 cursor-pointer items-center" onClick={()=>showBrand(item.name)}>
          <label className="flex gap-2 items-center cursor-pointer w-full text-xs sm:text-sm">
            <input type="radio" name="brand" value={defaultBrand} checked={defaultBrand === item.name} onChange={() => setDefaultBrand(item.name)} className="cursor-pointer"/>
            <p className="truncate sm:max-w-[50%] max-w-[60px]">{item.name}</p>
            <p className="text-gray-500 text-xs">({item.productCount})</p>
          </label>
        </li>
      ))}
    </ul>
  </div>
</div>

        </div>
      </div>
      
      {/* cards */}
      <div className='flex flex-col gap-6 sm:gap-10 flex-1'>
        <ul className="grid grid-cols-1 mx-10 sm:mx-0 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {currentProducts.map((prd : any) => (
            <li key={prd.slug} onClick={()=>item(prd.slug)} className="group bg-white hover:shadow-2xl rounded-xl border-1 border-[#d5754d] hover:cursor-pointer p-3 sm:p-4 flex flex-col items-center hover:translate-x hover:-translate-y-2 sm:hover:-translate-y-4 transition-all duration-400 gap-2 dark:bg-gray-900 dark:text-white dark:hover:shadow-[#d5754d]/30">
              {/* cart or wish */}
              <div className='text-base sm:text-lg transition duration-300 group-hover:blur-sm w-full flex justify-end'>
                {localWish.some((wish : any) => wish.product.slug === prd.slug) ? 
                  (<HiMiniHeart className='text-red-500' onClick={(e) => {e.stopPropagation(); addWish(prd)}} />) :
                  <HiOutlineHeart onClick={(e) => {e.stopPropagation(); addWish(prd)} }/>
                }
              </div>

              {/* prd img */}
              <div className="relative flex mt-2 w-full justify-center">
                {prd?.image && isLikelyImageUrl(prd.image) ? (
                  <img src={prd.image} className="w-full h-60 sm:h-50 rounded-lg transition duration-300 group-hover:blur-sm" />
                ) : (
                  <img src={'/assets/Product/Product.webp'} className="w-full h-40 sm:h-50 rounded-lg transition duration-300 group-hover:blur-sm" />
                )}

                {/* on hover icons */}
                <div className='text-base sm:text-lg absolute inset-0 flex justify-center items-center hidden group-hover:flex transition duration-500 gap-2'>
                  {/* wish */}
                  <div className='p-1 sm:p-2 rounded-full bg-white hover:bg-[#ffb684] hover:border-[#ffb684] hover:scale-110 border border-gray-200 transition duration-300'>
                    {localWish.some((wish : any) => wish.product.slug === prd.slug) ? 
                      (<HiMiniHeart className='text-red-500' onClick={(e) => {e.stopPropagation();addWish(prd)}} />) :
                      <HiOutlineHeart className='dark:text-black' onClick={(e) => {e.stopPropagation();addWish(prd)}}/>
                    }
                  </div>
                  {/* cart */}
                  <div className='p-1 sm:p-2 rounded-full bg-white hover:bg-[#ffb684] hover:border-[#ffb684] hover:scale-110 border border-gray-200 transition duration-200'>
                    {!localCart.some((cart : any) => cart.product.slug === prd.slug) ?
                      <HiShoppingCart className='dark:text-black' onClick={(e) => {e.stopPropagation(); addToCart(prd)}}/> :
                      <HiShoppingCart className="text-green-400" onClick={(e)=>{e.stopPropagation(); removeFromCart(prd)}}/>
                    }
                  </div>
                </div>
              </div>
              
              {/* name */}
              <div className='flex flex-col w-full h-full gap-1 sm:gap-2 mt-1 sm:mt-2'>
                <div className='flex gap-1 sm:gap-2 flex-wrap'>
                  <p className="text-xs text-[#d5754d] font-semibold">{prd.category}</p>
                  <p className="text-xs font-semibold">{prd.brand}</p>
                </div>
                <p className="font-bold text-xs sm:text-sm break-words line-clamp-2">{prd.name}</p>
              </div>
              
              {/* rating */}
              <div className='flex items-center gap-1 w-full'>
                <div className='flex'>
                  {Array.from({length: 4},(_, i) => (
                    <FaStar key={i} className='size-2 sm:size-3 text-yellow-400' />
                  ))}
                  <CiStar className='size-2 sm:size-3' />
                </div>
                <p className='text-xs'>{prd.defaultRating}</p>
              </div>

              {/* desc */}
              <div className="flex justify-between w-full items-center">
                <p className="text-gray-900 font-bold text-lg sm:text-xl whitespace-nowrap dark:text-white">₹{prd.price}</p>
                <p className="text-gray-500 font-semibold text-xs whitespace-nowrap">PER PCS</p>
              </div>

              <div className="flex flex-col gap-1 sm:gap-2 p-1 sm:p-2 w-full">
                {/* action button  */}
                {
                isLoading(prd.slug) ? (
                  <button className="font-bold m-1 sm:m-2 p-2 bg-gray-400 rounded-full cursor-not-allowed" disabled>
                    <BiLoaderCircle className='mx-auto size-4 sm:size-5' />
                  </button>
                ) : !localCart.some((cart : any) => cart.product.slug === prd.slug) ? (
                  <button
                    className="font-bold m-1 sm:m-2 p-2 bg-[#ffb684] hover:bg-[#d5754d] rounded-xl cursor-pointer hover:shadow-xl text-xs sm:text-sm flex items-center gap-1 justify-center dark:text-black"
                    onClick={(e) => {e.stopPropagation();addToCart(prd)}}
                  ><IoMdCart className='size-3 sm:size-4'/>
                    Add to Cart
                  </button>
                ) : (
                  <button
                    className="font-bold m-1 sm:m-2 px-3 sm:px-4 py-1 sm:py-2 border-2 border-[#d5754d] rounded-xl cursor-pointer flex justify-between items-center hover:shadow-xl text-sm"
                  >
                    {quantity(prd) > 1 ? (
                      <HiMinus className='text-base sm:text-lg' onClick={(e) => {e.stopPropagation(); minusOne(prd)}} />
                    ) : (
                      <MdOutlineDelete className='text-base sm:text-lg' onClick={(e) => {e.stopPropagation(); removeFromCart(prd)}} />
                    )}
                    <span className='text-base sm:text-lg'>{quantity(prd)}</span>
                    <HiPlus className='text-base sm:text-lg' onClick={(e) => {e.stopPropagation(); addOne(prd)}} />
                  </button>
                )
                }
              </div>
            </li>
          ))}
        </ul>
        
        {/* pagination */}
        {( localProducts.length > 0) && (
          <div className="flex justify-center items-center gap-2 mt-4 sm:mt-6 text-xs">
            {/* Prev Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`px-3 sm:px-4 py-1 rounded-md border border-[#d5754d] text-xs sm:text-sm dark:text-white ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#ffb684] cursor-pointer"
              }`}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {/* Page numbers with ellipsis */}
            {getPaginationNumbers().map((page, idx) => (
              <button
                key={idx}
                onClick={() => typeof page === "number" && handlePageChange(page)}
                disabled={page === "..."}
                className={`px-3 sm:px-4 py-1 rounded-md border border-[#d5754d] text-xs sm:text-sm dark:text-white ${
                  page === "..."
                    ? "cursor-default border-none"
                    : currentPage === page
                    ? "bg-[#d5754d]"
                    : "hover:bg-[#ffb684] cursor-pointer"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={`px-3 sm:px-4 py-1 rounded-md border border-[#d5754d] dark:text-white text-xs sm:text-sm ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#ffb684] cursor-pointer"
              }`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}

        {/* loading */}
        {localProducts.length == 0 &&
          <div className='flex justify-center items-center w-full'>
            <p className='font-bold dark:text-white text-sm sm:text-base'>{isProductLoading ? 'Loading':'No Products Available'}</p>
          </div>
        }
      </div>
    </div>
  </div>
</div>
  );
};

export default Products;
