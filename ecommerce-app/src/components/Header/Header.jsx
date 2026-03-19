import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="header-container">
            <header className="header">
                <Link to="/" style={{ textDecoration: "none", color: "#ff5722" }}>
                    <h1 className="header-h1">STORE</h1>
                </Link>

                <Link to="/logout">
                    <button className="logout-btn">Log Out</button>
                </Link>
            </header>
        </div>
    );
};

export default Header;
