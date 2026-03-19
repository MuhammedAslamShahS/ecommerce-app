import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPaymentMethod, clearOrder } from "../../orderSlice";
import "./Checkout.css";

const Checkout = () => {
    // Get order data from Redux through from ProductDetails page
    const order = useSelector((state) => state.order);

    // initialise hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Local state for selected payment method user selection based
    const [selectedPayment, setSelectedPayment] = useState(null);

    // Handle payment method selection based from user side
    const handlePaymentSelect = (method) => {
        setSelectedPayment(method);
        dispatch(setPaymentMethod(method));
    };

    // hanlde place order
    const handlePlaceOrder = () => {
        if (!selectedPayment) {
            alert("Please select a payment method");
            return;
        }

        // Here you would send data to backend API
        alert(`Order placed successfully with ${selectedPayment}!`);

        // Clear order from Redux
        dispatch(clearOrder());

        // Redirect to home
        navigate("/");
    };

    // If no order data, redirect to home
    if (!order.product) {
        return (
            <div className="checkout-container">
                <p>No items in cart, Redirecting...</p>
            </div>
        );
    }
    return (
        <div className="checkout-container">
            {/* LEFT section - Order Summary */}
            <div className="checkout-summary">
                <h2>Order Summary</h2>

                {/* Product Image */}
                <div className="summary-product-image">
                    <img src={order.product.image} alt={order.product.title} />
                </div>

                {/* Product Details */}
                <div className="summary-details">
                    <h2 className="summary-title">{order.product.title}</h2>
                    <p className="summary-price">Price: $ {order.product.price}</p>
                    <p className="sumamry-quantity">Quantity: {order.quantity}</p>
                    <hr />
                    <p>
                        <strong>Total: ${order.totalPrice}</strong>
                    </p>
                </div>
            </div>

            {/* RIGHT section - payment methods section */}
            <div className="checkout-payment">
                <h2>Select Payment Method</h2>

                {/* COD - Cash on delivery */}
                <div
                    className={`payment-option ${selectedPayment === "cod" ? "selected" : ""}`}
                    onClick={() => handlePaymentSelect("cod")}
                >
                    <input
                        type="radio"
                        name="payment"
                        id="cod"
                        checked={selectedPayment === "cod"}
                        onChange={() => handlePaymentSelect("cod")}
                    />
                    <div className="payment-content">
                        <h4>Cash on Delivery</h4>
                        <p>Pay when your order arrives</p>
                    </div>
                </div>

                {/* UPI - payment methods section */}
                <div
                    className={`payment-option ${selectedPayment === "upi" ? "selected" : ""}`}
                    onClick={() => handlePaymentSelect("upi")}
                >
                    <input
                        type="text"
                        name="payment"
                        value="upi"
                        checked={selectedPayment === "upi"}
                        onChange={() => handlePaymentSelect("upi")}
                    />
                    <div className="payment-content">
                        <h4>UPI</h4>
                        <p>pay instantly using UPI apps</p>
                    </div>
                </div>

                {/* CARD - Credit/Debit Card */}
                <div
                    className={`payment-option ${selectedPayment === "card" ? "selected" : ""}`}
                    onClick={() => handlePaymentSelect("card")}
                >
                    <input
                        type="text"
                        name="payment"
                        value="card"
                        checked={selectedPayment === "card"}
                        onChange={() => handlePaymentSelect("card")}
                    />

                    <div className="payment-content">
                        <h4>Credit / Debit Card</h4>
                        <p>Pay using your card securely</p>
                    </div>
                </div>

                {/* Place Order Business */}
                <button className="place-order-btn" onClick={handlePlaceOrder}>
                    Place Order
                </button>

                {/* Back Button */}
                <button className="back-btn" onClick={() => navigate(-1)}>
                    Back
                </button>
            </div>
        </div>
    );
};
export default Checkout;
