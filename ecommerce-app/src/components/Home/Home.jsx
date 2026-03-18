import React, { useState, useEffect } from "react";
import "./Home.css";
import { getAllProducts } from "../../ApiService/Api";

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getAllProducts();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    return (
        <div className="product-grid">
            {products.map((product) => (
                <div className="product-card" key={product.id}>
                    <img src={product.image} alt="alternative" />
                    <h3>{product.title}</h3>
                    <p>
                        <span className="price-tag">{product.price}</span>
                    </p>
                    <button>Product details</button>
                </div>
            ))}
        </div>
    );
};

export default Home;
