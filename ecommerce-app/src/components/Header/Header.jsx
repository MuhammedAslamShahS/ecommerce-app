import "./Header.css";
import logo from "../../assets/logo.png";
import { IoIosSearch } from "react-icons/io";
import { CiDeliveryTruck } from "react-icons/ci";

import HeaderTopBar from "./HeaderTopBar";


const Header = () => {
    return (
        <>
            <HeaderTopBar />

            <div className="navbar">
                {/* Logo */}
                <img src={logo} alt="" className="logo" />

                {/* Navlinks */}
                <ul>
                    <li>NEW IN</li>
                    <li>SALES</li>
                    <li>PRODUCTS</li>
                    <li>COLLECTIONS</li>
                    <li>WEDDING</li>
                    <li>DEALS</li>
                </ul>

                {/* Search Bar */}
                <div className="search-box">
                    <input type="text" placeholder="Search" />
                    <IoIosSearch className="search-icon" />
                </div>

                <div className="Express-delivery-container">
                  <CiDeliveryTruck className="Experss-truck" />
                  <div className="express-text-container">
                    <p className="express-text-1">EXPRESS DELIVERY</p>
                    <p className="express-text-2">Upgrade Your Delivery Method</p>
                  </div>
                </div>
            </div>
        </>
    );
};

export default Header;
