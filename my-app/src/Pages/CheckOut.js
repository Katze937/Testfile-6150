import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CheckOut.css";

function CheckOut({ cartItems, onSubmitOrder }) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contactNumber: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const validateContactNumber = (number) => {
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/; // 格式: 123-456-1234
    return phoneRegex.test(number);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // 清除错误提示
  };

  const handleConfirmOrder = () => {
    const { name, address, contactNumber } = formData;

    // 验证字段
    if (!name || !address || !validateContactNumber(contactNumber)) {
      setError("Please fill in all fields correctly. Ensure phone format is 123-456-1234.");
      return;
    }

    // 提交订单
    const orderData = {
      id: Date.now(),
      name,
      address,
      phone: contactNumber,
      products: cartItems.map((item) => `${item.name} (${item.quantity})`).join(", "),
      total: calculateTotal(),
    };

    onSubmitOrder(orderData); // 将订单信息传递给父组件
    alert("Order submitted successfully!");

    // 跳转回购物页面
    navigate("/ShoppingPage");
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">CheckOut</h1>

      {/* 订单摘要 */}
      <div className="order-summary">
        <h2>Order Summary</h2>
        <table className="order-table">
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
        <p className="order-total">Total: ${calculateTotal()}</p>
      </div>

      {/* 用户信息 */}
      <div className="user-info">
        <h2>Shipping Information</h2>
        <form className="shipping-form">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              required
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter your address"
              required
            />
          </label>
          <label>
            Contact Number:
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              placeholder="123-456-1234"
              required
            />
          </label>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>

      {/* 确认按钮 */}
      <button className="confirm-button" onClick={handleConfirmOrder}>
        Confirm Order
      </button>
    </div>
  );
}

export default CheckOut;
