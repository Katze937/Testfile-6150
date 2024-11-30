import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerRegisterPage.css'; // 引入樣式

function CustomerRegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // 呼叫 API 儲存資料
    fetch('https://your-api-endpoint.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTg5YjZlY2FhNWVjNzQ5NDQxMThiMiIsInVzZXJuYW1lIjoiY2hlbi55dXBlQG5vcnRoZWFzdGVybi5lZHUiLCJpYXQiOjE3MzI1OTY2NjYsImV4cCI6MTczNDc1NjY2Nn0.SPsKlke_-mhLVLii_08PAz6AabVOGq_8fv4VTYm5Jgc',
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Registration successful:', data);
        alert('Successful Submit');
        setTimeout(() => navigate('/customerpage'), 10000); // 停留10秒後跳轉
      })
      .catch((error) => {
        console.error('Error during registration:', error);
        alert('Registration failed. Please try again.');
      });
  };

  return (
    <div className="registerpage-container">
      <h1 className="registerpage-title">Customer Register</h1>
      <form className="registerpage-form">
        <label className="registerpage-label">
          Email
          <input
            type="email"
            name="email"
            placeholder="Please Enter your Email"
            className="registerpage-input"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label className="registerpage-label">
          Password
            <div className="password-container">
            <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Please Enter your Password"
                className="registerpage-input"
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
        <label className="registerpage-label">
          Confirm Password
          <div className="password-container">
          <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Please Confirm your Password"
                className="registerpage-input"
                value={formData.confirmPassword}
                onChange={handleChange}
          />
          <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
                👁️
                </button>
          </div>
        </label>
        <div className="registerpage-buttons">
          <button
            type="button"
            className="registerpage-button"
            onClick={() => navigate('/customer')}
          >
            Return
          </button>
          <button type="button" className="registerpage-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CustomerRegisterPage;
