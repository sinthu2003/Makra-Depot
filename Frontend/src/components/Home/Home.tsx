// import Category from "../category/Category"
import CategoryList from "./Category/CategoryList"
// import DtCategory from "../category/DtCategory"
import Footer from "../Footer/Footer"
import Main from "./Main/Main"
import ProductList from "./products/ProductList"
// import Products from "./products/Products"

const Home = () => {
  return (
    <>
        {/* main */}
        <Main />

        {/* Category */}
        <CategoryList />

        {/* All Products */}
        <ProductList />
        {/* Footer */}
        <Footer />
    </>
  )
}

export default Home