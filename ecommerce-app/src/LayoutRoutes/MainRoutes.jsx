import { Route, Routes } from "react-router-dom";
import Home from "../components/Home/Home";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import LogOut from "../components/LogOut/LogOut";
import ProductDetails from "../components/ProductDetails/ProductDetails";

const MainRoutes = () => {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/logout" element={<LogOut />} />
                <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default MainRoutes;
