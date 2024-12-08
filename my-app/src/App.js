import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CustomerPage from './Pages/CustomerPage';
import StaffPage from './Pages/StaffPage';
import HomePage from './Pages/HomePage';
import StaffRegisterPage from './Pages/StaffRegisterPage';
import CustomerRegisterPage from './Pages/CustomerRegisterPage';
import InventoryTable from './Pages/InventoryTable';
import ShoppingPage from './Pages/ShoppingPage';
import ShoppingCart from './Pages/ShoppingCart';
import CheckOut from './Pages/CheckOut';
import UserManagement from './Pages/UserManagement';
import OrderManagement from'./Pages/OrderManagement';

function App() {
  // 状态管理：定义购物车状态
  const [cartItems, setCartItems] = useState([]); // 初始化购物车为一个空数组
  const [orders, setOrders] = useState([]); // 动态存储订单数据
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 管理登录状态
  const handleOrderSubmit = (newOrder) => {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  };
  return (
    // 路由定义：传递购物车状态给需要的页面
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/customer" element={<CustomerPage setIsLoggedIn={setIsLoggedIn}/> } />
      <Route path="/staff" element={<StaffPage />} />
      <Route path="*" element={<Navigate to="/shoppingpage" />} />
      <Route path="/staffregister" element={<StaffRegisterPage />} />
      <Route path="/customerregister" element={<CustomerRegisterPage />} />
      <Route path="/inventorytable" element={<InventoryTable />} />
      <Route path="/shoppingpage" element={<ShoppingPage 
        cartItems={cartItems} 
        setCartItems={setCartItems}
        />} />
      <Route path="/shoppingcart" element={<ShoppingCart
        cartItems={cartItems}
        isLoggedIn={isLoggedIn}
        />} />
      <Route path="/usermanagement" element={<UserManagement />} />
      <Route path="/checkout" element={<CheckOut 
          cartItems={cartItems}
          onSubmitOrder={handleOrderSubmit}
         />}/>
      <Route path="/ordermanagement" element={<OrderManagement ordersData={orders} />} />
    </Routes>
    
  );
}

export default App;
