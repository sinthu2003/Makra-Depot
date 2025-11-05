import { Outlet } from "react-router-dom"
import Nav from "./components/Navbar/Nav"
import Footer from "./components/Footer/Footer"

const Layout = () => {
  return (
    <>
        <Nav />
        <main className="min-h-[80vh]">
            <Outlet />
        </main>
        <Footer />
    </>
  )
}

export default Layout