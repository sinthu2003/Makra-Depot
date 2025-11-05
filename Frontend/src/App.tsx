import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import CartPage from './components/Cart/CartPage'
import WishListPage from './components/WishList/WishListPage'
import Login from './components/Navbar/Login'
import UserProfile from './components/Users/UserProfile'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import IsLogged from './components/Auth/IsLogged'
import 'react-toastify/dist/ReactToastify.css';
import { RoleProvider } from './Context/UserRole.context'
import ProductList from './components/Home/products/ProductList'
// import ItemList from './components/Home/products/Item/ItemList'
import Details from './components/Home/products/Item/details'
import ScrollToTop from './components/ScrollTop'
import CategoryList from './components/Home/Category/CategoryList'
import BrandList from './components/Brands/BrandList'
import QuickList from './components/QuickBuy/QuickList'
import Checkout from './components/Cart/Checkout'
import OrderConfirm from './components/Order/OrderConfirm'
import MyOrders from './components/Order/MyOrders'
import SeasonEnd from './components/SeasonEnd'
import Layout from './Layout'
import Contact from './components/Footer/Contact'
import { CountProvider } from './components/Navbar/CountContext'
import Dashboard from './components/Dashboard/Dashboard'

function App() {

  // season end
  const seasonEnd = new Date > new Date('2025-12-01')

  return (
    <>
      <div className='bg-[#fff9e6] dark:bg-gray-900'>
      <RoleProvider><CountProvider>
      <BrowserRouter>
        {/* routes */}
        <ScrollToTop />
        <Routes>
          {seasonEnd ?
            <> 
            <Route path='/season-end' element={<SeasonEnd/>}/>
            <Route path='*' element={<Navigate to="/season-end"/>} />
            </>
          :
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />}/>
                <Route path="/products" element={<ProductList/>}/>
                <Route path="/categories" element={<CategoryList/>}/>
                <Route path="/brands" element={<BrandList/>}/>
                <Route path="/quickbuy" element={<QuickList/>}/>
                <Route path="/products/:slug" element={<Details/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>

                {/* protected routes  */}
                <Route element={<ProtectedRoute />}>
                  <Route path='/cart' element={<CartPage />}/>
                  <Route path='/wishlist' element={<WishListPage />}/>
                  <Route path='/checkout' element={<Checkout />}/>
                  <Route path='/order-confirmation/:id' element={<OrderConfirm />}/>
                  <Route path='/orders' element={<MyOrders />}/>
                  <Route path='/user' element={<UserProfile />}/>
                </Route>

                <Route element={<IsLogged />}>
                  <Route path='/login' element={<Login />}/>
                </Route>

                {/* all other routes */}
                <Route path='*' element={<Navigate to='/' replace />}/>
                {/* use replace to avoid storing browsing history of unwanted routes */}

            </Route>
          }
        </Routes>
      </BrowserRouter></CountProvider>
      </RoleProvider>
      </div>
    </>
  )
}

export default App
