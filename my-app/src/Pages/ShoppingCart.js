import React from "react";
import { useNavigate } from "react-router-dom";
import "./ShoppingCart.css";

function ShoppingCart({ cartItems, isLoggedIn }) {
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckOut = () => {
    if (!isLoggedIn) {
      alert("Please log in to proceed to checkout.");
      navigate("/customer"); // 跳转到登录页面
    } else {
      navigate("/checkout"); // 已登录，跳转到结账页面
    }
  };

  return (
    <div className="shopping-cart-container">
      <h1 className="shopping-cart-title">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty!</p>
      ) : (
        <>
          <table className="shopping-cart-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                  <td>${item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-total">
            <p>Total: ${calculateTotal()}</p>
          </div>

          <div className="checkout-button-container">
            <button className="checkout-button" onClick={handleCheckOut}>
              CheckOut
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ShoppingCart;
