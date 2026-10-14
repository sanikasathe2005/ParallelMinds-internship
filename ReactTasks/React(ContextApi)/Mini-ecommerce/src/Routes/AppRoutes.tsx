import {Routes,Route} from "react-router-dom";
import Home from "../Pages/Home";
import About from "../Pages/About";
import NotFound from "../Pages/NotFound";
import ProductDetails from "../Pages/ProductDetails";
import Products from "../Pages/Products";
import Cart from "../Pages/Cart";

function AppRoutes()
{
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/products/:id" element={<ProductDetails/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound/>}/>

        </Routes>
    )
}
export default AppRoutes;