import "./ProductDetails.css";
import { useEffect, useState } from "react";
import { getProductId } from "../../ApiService/Api";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setOrderData } from "../../orderSlice";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // fetched product details temperley store before add/show to component
    const [productDetails, setProductDetails] = useState({});

    // quantity managing
    const [quantity, setQuantity] = useState(1);

    // fetching product details based each id
    useEffect(() => {
        const fetchProductDetails = async () => {
            const data = await getProductId(id);
            setProductDetails(data);
        };

        fetchProductDetails();
    }, [id]);

    
    const handleBuyNow = () => {
        dispatch(
            setOrderData({
                product: productDetails,
                quantity: quantity,
            }),
        );

        // all data going to checkout page
        navigate("/checkout");
    };

    //quantity managing
    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        // main wrapper
        <div className="product-container-wrapper">
            {/* left section */}
            <img src={productDetails.image} alt="alternative" className="left-section-img" />

            {/* right section */}
            <div className="right-section" style={{ fontFamily: "sans-serif" }}>
                <h2 className="product-title">{productDetails.title}</h2>
                <p className="product-discription">{productDetails.descriptio}</p>
                <p className="product-price" style={{ fontSize: "32px" }}>
                    <span>{`-50%`}</span> <span style={{ color: "black" }}> ₹ {productDetails.price}</span>
                </p>

                <p style={{ fontSize: "14px", marginLeft: "8px", color: "gray" }}>M.R.P: {productDetails.price * 2}</p>

                {/* Quantity managing */}
                <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <button
                        onClick={handleDecrement}
                        style={{
                            padding: "8px 15px",
                            fontSize: "16px",
                            cursor: "pointer",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                        }}
                    >
                        -
                    </button>
                    <span
                        style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            minWidth: "30px",
                            textAlign: "center",
                        }}
                    >
                        {quantity}
                    </span>
                    <button
                        onClick={handleIncrement}
                        style={{
                            padding: "8px 15px",
                            fontSize: "16px",
                            cursor: "pointer",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                        }}
                    >
                        +
                    </button>
                </div>

                <button className="product-buynow" onClick={handleBuyNow} style={{ border: "none" }}>
                    BuyNow
                </button>
                <Link to="/">
                    <button className="explore-more">explore more</button>
                </Link>
            </div>
        </div>
    );
};

export default ProductDetails;
