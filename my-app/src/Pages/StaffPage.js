import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StaffPage.css'; // 引入自訂樣式


function StaffPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);  // 控制密碼顯示
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    staffId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="staffpage-container">
      <h1 className="staffpage-title">Staff Login</h1>
      <form className="staffpage-form">
        <label className="staffpage-label">
          Email
          <input
             type="email"
             name="email"
             placeholder="Please Enter your Email"
             className="staffpage-input"
             value={formData.email}
             onChange={handleChange}
          />
        </label>
        <label className="staffpage-label">
          Password
          <div className="password-container">
            <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Please Enter your Password"
                className="staffpage-input"
                value={formData.password}
                onChange={handleChange}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              👁️
            </button>
          </div>
        </label>
        <label className="staffpage-label">
          Staff ID
          <input
            type="text"
            name="staffId"
            placeholder="Please Enter your Staff ID"
            className="staffpage-input"
            value={formData.staffId}
            onChange={handleChange}
          />
        </label>

        {/* Login 按鈕 */}
        <button type="button" className="staffpage-button-login">
          Login
        </button>

        {/* Return HomePage 和 Register 按鈕並排顯示 */}
        <div className="staffpage-button-other">
          <button
            type="button"
            className="staffpage-button"
            onClick={() => navigate('/')}
          >
            Return HomePage
          </button>
          <button 
            type="button" 
            className="staffpage-button"
            onClick={() => navigate('/staffregister')}
            >
            Register
          </button>
          {/* Inventory 按鈕 後續會改到登入後才能查詢*/}
          <button
            type="button"
            className="staffpage-button"
            onClick={() => navigate('/inventorytable')}
          >
            Inventory
          </button>
        </div>
      </form>
    </div>
  );
}

export default StaffPage;
