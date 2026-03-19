import "./ProductDetails.css";
import { useEffect, useState } from "react";
import { getProductId } from "../../ApiService/Api";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setOrderData } from "../../orderSlice";
import { addToCart } from "../../cartSlice";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Fetched product details temporarily stored
    const [productDetails, setProductDetails] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [showCartPrompt, setShowCartPrompt] = useState(false);

    // Fetching product details based on id
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                const data = await getProductId(id);
                setProductDetails(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    // Send the selected product directly to checkout
    const startCheckout = () => {
        dispatch(
            setOrderData({
                product: productDetails,
                quantity: quantity,
            }),
        );
        navigate("/checkout");
    };

    // Handle Buy Now - Dispatch to Redux and Navigate
    const handleBuyNow = () => {
        setShowCartPrompt(false);
        startCheckout();
    };

    // Quantity management
    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                product: productDetails,
                quantity,
            }),
        );
        setShowCartPrompt(true);
    };

    const handleGoToCart = () => {
        setShowCartPrompt(false);
        navigate("/cart");
    };

    // Loading state
    if (loading) {
        return <div className="product-loading">Loading product details...</div>;
    }

    // Calculate discount and savings
    const originalPrice = productDetails.price * 2;
    const discountAmount = originalPrice - productDetails.price;
    const discountPercentage = Math.round((discountAmount / originalPrice) * 100);

    return (
        <div className="product-page-container">
            {/* BREADCRUMB / BACK BUTTON */}
            <div className="breadcrumb-section">
                <Link to="/" className="back-link">
                    ← Back to Products
                </Link>
            </div>

            {/* MAIN PRODUCT CONTAINER */}
            <div className="product-container-wrapper">
                {/* LEFT SECTION - PRODUCT IMAGE */}
                <div className="product-image-section">
                    <div className="image-container">
                        <img src={productDetails.image} alt={productDetails.title} className="product-image" />
                        {discountPercentage > 0 && <div className="discount-badge">-{discountPercentage}%</div>}
                    </div>
                </div>

                {/* RIGHT SECTION - PRODUCT DETAILS */}
                <div className="product-details-section">
                    {/* PRODUCT HEADER */}
                    <div className="product-header">
                        <h1 className="product-title">{productDetails.title}</h1>

                        {/* RATING SECTION */}
                        <div className="rating-section">
                            <div className="stars">⭐⭐⭐⭐⭐</div>
                            <span className="rating-text">4.5/5 (324 Reviews)</span>
                        </div>
                    </div>

                    {/* PRICE SECTION */}
                    <div className="price-section">
                        <div className="price-display">
                            <span className="current-price">₹ {productDetails.price}</span>
                            <span className="original-price">₹ {originalPrice}</span>
                        </div>
                        <div className="savings-info">You save ₹ {discountAmount}</div>
                    </div>

                    {/* QUANTITY SELECTOR */}
                    <div className="quantity-section">
                        <label className="quantity-label">Select Quantity:</label>
                        <div className="quantity-selector">
                            <button
                                className="quantity-btn decrement-btn"
                                onClick={handleDecrement}
                                disabled={quantity === 1}
                            >
                                −
                            </button>
                            <input type="text" className="quantity-input" value={quantity} readOnly />
                            <button className="quantity-btn increment-btn" onClick={handleIncrement}>
                                +
                            </button>
                        </div>
                        <span className="stock-available">Stock Available: 50</span>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="action-buttons">
                        <button className="btn btn-add-to-cart" onClick={handleAddToCart}>
                            🛒 ADD TO CART
                        </button>

                        <button className="btn btn-buy-now" onClick={handleBuyNow}>
                            ⚡ BUY NOW
                        </button>
                    </div>
                </div>
            </div>

            {showCartPrompt && (
                <div className="cart-action-popup-overlay" onClick={() => setShowCartPrompt(false)}>
                    <div className="cart-action-popup" onClick={(event) => event.stopPropagation()}>
                        <h3 className="cart-action-popup-title">Item added to cart</h3>
                        <p className="cart-action-popup-text">Choose what you want to do next.</p>
                        <div className="cart-action-popup-actions">
                            <button className="cart-action-btn cart-action-btn-primary" onClick={handleBuyNow}>
                                Proceed to Buy
                            </button>
                            <button className="cart-action-btn cart-action-btn-secondary" onClick={handleGoToCart}>
                                Go to Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
