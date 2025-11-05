// import Category from "../category/Category"
import CategoryList from "./Category/CategoryList"
// import DtCategory from "../category/DtCategory"
import NewArrivalList from "./New Arrival/NewArrivalList"
import Slider from "./Main/Slider"
import FeatureList from "./Featured/FeatureList"
import Banner from "./Featured/Banner"
// import Products from "./products/Products"

const Home = () => {
  return (
    <>
        {/* main */}
        <Slider/>

        {/* New Arrival */}
        <NewArrivalList />
        
        {/* Category */}
        <CategoryList />

        {/* Feat Products */}
        <FeatureList/>

        {/* banner */}
        <Banner/>
    </>
  )
}

export default Home