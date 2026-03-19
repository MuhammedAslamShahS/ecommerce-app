import { Route, Routes } from "react-router-dom";
import Home from "../components/Home/Home";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import LogOut from "../components/LogOut/LogOut";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import Checkout from "../components/Checkout/Checkout";
import Cart from "../components/Cart/Cart";

const MainRoutes = () => {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/logout" element={<LogOut />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default MainRoutes;
