import { useState } from "react";
import { useSelector } from "react-redux";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const cartItems = useSelector((state) => state.cart?.items ?? []);
    const { isAuthenticated = false, user = null } = useSelector((state) => state.auth ?? {});

    const totalCartCount = cartItems.reduce((total, item) => {
        return total + (Number(item?.quantity) || 0);
    }, 0);

    const userInitial = user?.email?.charAt(0)?.toUpperCase() || "U";

    const closeMenus = () => {
        setIsMenuOpen(false);
        setIsProfileOpen(false);
    };

    const handleMenuToggle = () => {
        setIsMenuOpen((currentValue) => !currentValue);
        setIsProfileOpen(false);
    };

    const handleProfileToggle = () => {
        setIsProfileOpen((currentValue) => !currentValue);
    };

    return (
        <div className="header-container">
            <header className="header">
                <div className="header-brand-row">
                    <Link to="/" className="header-brand-link" onClick={closeMenus}>
                        <h1 className="header-h1">STORE</h1>
                    </Link>

                    <button
                        type="button"
                        className="header-menu-toggle"
                        onClick={handleMenuToggle}
                        aria-label="Toggle navigation menu"
                        aria-expanded={isMenuOpen}
                    >
                        <span className="header-menu-line"></span>
                        <span className="header-menu-line"></span>
                        <span className="header-menu-line"></span>
                    </button>
                </div>

                <div className={`header-actions ${isMenuOpen ? "header-actions-open" : ""}`}>
                    <Link to="/cart" className="header-cart-link" onClick={closeMenus}>
                        <span>Cart</span>
                        <span className="header-cart-count">{totalCartCount}</span>
                    </Link>

                    {isAuthenticated ? (
                        <div className="header-profile">
                            <button
                                type="button"
                                className="header-profile-trigger"
                                onClick={handleProfileToggle}
                                aria-label="Open profile menu"
                                aria-expanded={isProfileOpen}
                            >
                                <span className="header-profile-avatar">{userInitial}</span>
                            </button>

                            {isProfileOpen ? (
                                <div className="header-profile-menu">
                                    <p className="header-profile-email">{user?.email || "Signed in user"}</p>
                                    <Link to="/logout" className="header-profile-link" onClick={closeMenus}>
                                        Log Out
                                    </Link>
                                </div>
                            ) : null}
                        </div>
                    ) : (
                        <Link to="/login" className="header-login-btn" onClick={closeMenus}>
                            Log In
                        </Link>
                    )}
                </div>
            </header>
        </div>
    );
};

export default Header;
