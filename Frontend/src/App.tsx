import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Nav from './components/Navbar/Nav'
import Signup from './components/Navbar/Signup'
import Home from './components/Home/Home'
import CartPage from './components/Cart/CartPage'
import WishListPage from './components/WishList/WishListPage'
import Login from './components/Navbar/Login'
import UserProfile from './components/Users/UserProfile'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import IsLogged from './components/Auth/IsLogged'
import { AdminRoute } from './components/UserList/AdminRoute'
import UserList from './components/UserList/UserList'
import { RoleProvider } from './components/Context/UserRole.context'

function App() {

  return (
    <>
      <div className='bg-[#fff9e6]'>
      <RoleProvider>
      <BrowserRouter>
        {/* routes */}
        <Routes>
            <Route path='/' element={<Nav />}>
                <Route index element={<Home />}/>
                {/* <Route path='/signedup' element={<Signedup />}/> */}

                {/* logged in */}
                <Route element={<ProtectedRoute />}>
                  <Route path='/cart' element={<CartPage />}/>
                  <Route path='/wishlist' element={<WishListPage />}/>
                  <Route path='/user' element={<UserProfile />}/>
                  {/* admin routes */}
                  <Route element = {<AdminRoute allowedRole={['Admin','Manager']}/>}>
                      <Route path='/all-users' element={<UserList />}/>
                  </Route>
                </Route>

                <Route element={<IsLogged />}>
                  <Route path='/login' element={<Login />}/>
                  <Route path='/signup' element={<Signup />}/>
                </Route>

                {/* all other routes */}
                <Route path='*' element={<Navigate to='/' />}/>

            </Route>
        </Routes>

      </BrowserRouter>
      </RoleProvider>
      </div>
    </>
  )
}

export default App
