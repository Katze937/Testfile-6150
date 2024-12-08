import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ShoppingPage.css";

function ShoppingPage({ cartItems = [], setCartItems = () => {} }) {
  const navigate = useNavigate();

  const [inventory, setInventory] = useState([
    { id: 1, name: "Product A", quantity: 10, price: 100, image: null },
    { id: 2, name: "Product B", quantity: 5, price: 200, image: null },
    { id: 3, name: "Product C", quantity: 20, price: 300, image: null },
  ]);

  const handleAddToCart = (item) => {
    setCartItems((prevItems = []) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const handleImageUpload = (id, file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setInventory((prevInventory) =>
        prevInventory.map((item) =>
          item.id === id ? { ...item, image: reader.result } : item
        )
      );
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="shopping-container">
      <h1 className="shopping-title">Shopping Page</h1>

      <div className="buttons-container">
        {/* 购物车按钮 */}
        <div
          className="cart-icon-container"
          onClick={() => navigate("/shoppingcart")}
        >
          <span className="cart-icon">🛒</span>
          <span className="cart-count">
            {cartItems.reduce((total, item) => total + item.quantity, 0)}
          </span>
        </div>

        {/* 切换到 CustomerLogin 的按钮 */}
        <button
          className="customer-login-button"
          onClick={() => navigate("/customerlogin")}
        >
          Go to Customer Login
        </button>
      </div>

      <table className="shopping-table">
        <thead>
          <tr>
            <th>Item Number</th>
            <th>Item Name</th>
            <th>Inventory Quantity</th>
            <th>Price</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price}</td>
              <td>
                {item.image ? (
                  <img
                    src={item.image}
                    alt={`Product ${item.name}`}
                    className="item-image"
                  />
                ) : (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(item.id, e.target.files[0])}
                  />
                )}
              </td>
              <td>
                <button
                  className="add-to-cart-button"
                  onClick={() => handleAddToCart(item)}
                >
                  Add
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShoppingPage;
