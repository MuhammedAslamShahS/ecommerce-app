import { Route, Routes } from "react-router-dom";
import Home from "../components/Home/Home";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import LogOut from "../components/LogOut/LogOut";

const MainRoutes = () => {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/logout" element={<LogOut />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default MainRoutes;
