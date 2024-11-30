import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerPage.css'; // 引入自訂樣式

function CustomerPage() {
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
    <div className="customerpage-container">
      <h1 className="customerpage-title">Customer Login</h1>
      <form className="customerpage-form">
        <label className="customerpage-label">
          Email
          <input
            type="email"
            placeholder="Please Enter your Email"
            className="customerpage-input"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label className="customerpage-label">
          Password
          <div className="password-container">
            <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Please Enter your Password"
                className="customerpage-input"
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

        {/* Login 按鈕 */}
        <button type="button" className="customerpage-button-login">
          Login
        </button>

        {/* Return HomePage 和 Register 按鈕並排顯示 */}
        <div className="customerpage-button-other">
          <button
            type="button"
            className="customerpage-button"
            onClick={() => navigate('/')}
          >
            Return HomePage
          </button>
          <button 
            type="button" 
            className="customerpage-button"
            onClick={() => navigate('/customerregister')}
            >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default CustomerPage;
