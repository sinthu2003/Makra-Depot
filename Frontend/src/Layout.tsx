import { Outlet } from "react-router-dom"
import Nav from "./components/Navbar/Nav"
import Footer from "./components/Footer/Footer"

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout