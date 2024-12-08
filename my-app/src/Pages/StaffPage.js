import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StaffPage.css'; // 引入自訂樣式

function StaffPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // 控制密碼顯示
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState(''); // 错误消息状态

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = () => {
    
    if (formData.email && formData.password) {
      // 確保用戶輸入了 email 和 password
      navigate('/inventorytable'); // 登錄成功跳轉到 InventoryTable 頁面
    } else {
      alert('Please enter valid email and password');
    }
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

        {/* 顯示錯誤消息 */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Login 按鈕 */}
        <button
          type="button"
          className="staffpage-button-login"
          onClick={handleLogin}
        >
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
        </div>
      </form>
    </div>
  );
}

export default StaffPage;
