import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../components/Home/Home";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import LogOut from "../components/LogOut/LogOut";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import Checkout from "../components/Checkout/Checkout";
import Cart from "../components/Cart/Cart";
import Login from "../components/Login/Login";
import SignUp from "../components/SignUp/SignUp";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Products from "../pages/Products/Products";
import ScrollToTop from "../components/ScrollToTop";

const MainRoutes = ({ homeTopContent = null }) => {
    const location = useLocation();

    return (
        <div className="min-h-screen flex flex-col">
            <ScrollToTop /> {/* Scroll page to top on every route change */}
            {/* Common header */}
            <Header key={location.pathname} />
            {location.pathname === "/" ? homeTopContent : null}
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />

                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:category" element={<Products />} />
                <Route path="/signup" element={<SignUp />} />

                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/logout" element={<LogOut />} />
                </Route>
            </Routes>
            {/* Common footer */}
            <Footer />
        </div>
    );
};

export default MainRoutes;
