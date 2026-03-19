import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-page">
        <h2 className="cart-empty-title">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-list">
          <div className="cart-header">
            <h2 className="cart-title">My Cart</h2>
            <p className="cart-subtitle">{cartItems.length} item(s)</p>
          </div>

          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img className="cart-item-image" src={item.image} alt={item.title} />
              <div className="cart-item-details">
                <h3 className="cart-item-title">{item.title}</h3>
                <p className="cart-item-price">Price: ₹ {item.price}</p>
                <p className="cart-item-quantity">Quantity: {item.quantity}</p>
              </div>
              <button className="cart-remove-btn" onClick={() => dispatch(removeFromCart(item.id))}>
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3 className="cart-summary-title">Order Summary</h3>
          <p className="cart-summary-total">Total: ₹ {totalPrice}</p>
          <button className="cart-checkout-btn" onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
