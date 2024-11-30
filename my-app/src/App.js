import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CustomerPage from './Pages/CustomerPage';
import StaffPage from './Pages/StaffPage';
import HomePage from './Pages/HomePage';
import StaffRegisterPage from './Pages/StaffRegisterPage';
import CustomerRegisterPage from './Pages/CustomerRegisterPage';
import InventoryTable from './Pages/InventoryTable';


function App() {
  return (
    
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/customer" element={<CustomerPage />} />
      <Route path="/staff" element={<StaffPage />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/staffregister" element={<StaffRegisterPage />} />
      <Route path="/customerregister" element={<CustomerRegisterPage />} />
      <Route path="/inventorytable" element={<InventoryTable />} />
    </Routes>
  
  );
}

export default App;
