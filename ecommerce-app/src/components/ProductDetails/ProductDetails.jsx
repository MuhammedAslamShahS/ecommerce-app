import "./ProductDetails.css";
import { useEffect, useState } from "react";
import { getProductId } from "../../ApiService/Api";
import { Link, useParams } from "react-router-dom";

const ProductDetails = () => {
    const { id } = useParams();

    const [productDetails, setProductDetails] = useState({});

    useEffect(() => {
        const fetchProductDetails = async () => {
            const data = await getProductId(id);
            setProductDetails(data);
        };

        fetchProductDetails();
    }, [id]);

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
                    <span>{`-50%`}</span> <span style={{color: "black"}}> ₹ {productDetails.price}</span>
                </p>

                <p style={{ fontSize: "14px", marginLeft: "8px", color: "gray" }}>
                    M.R.P: {productDetails.price * 2}
                </p>

                <button className="product-buynow">BuyNow</button>
                <Link to="/">
                    <button className="explore-more">explore more</button>
                </Link>
            </div>
        </div>
    );
};

export default ProductDetails;
