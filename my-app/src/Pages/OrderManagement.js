import React, { useState } from "react";
import "./OrderManagement.css";

function OrderManagement({ ordersData }) {
  const [searchTerm, setSearchTerm] = useState(""); // 搜索关键字
  const [searchField, setSearchField] = useState("name"); // 搜索字段：name 或 phone

  // 过滤订单数据
  const filteredOrders = ordersData.filter((order) =>
    order[searchField]?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="order-management-container">
      <h1 className="order-management-title">Order Management</h1>

      {/* 搜索栏 */}
      <div className="search-container">
        <select
          className="search-select"
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
        >
          <option value="name">Search by Name</option>
          <option value="phone">Search by Phone</option>
        </select>
        <input
          type="text"
          placeholder={`Enter ${searchField}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button
          className="search-button"
          onClick={() => setSearchTerm("")} // 清除搜索
        >
          Clear Search
        </button>
      </div>

      {/* 订单表格 */}
      <table className="order-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Products</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.name}</td>
                <td>{order.address}</td>
                <td>{order.phone}</td>
                <td>{order.products}</td>
                <td>${order.total}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-results">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OrderManagement;
