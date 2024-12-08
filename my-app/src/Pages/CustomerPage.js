import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerPage.css';

function CustomerPage({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/customer/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        setIsLoggedIn(true);
        navigate('/shoppingcart');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Invalid email or password.');
      }
    } catch (error) {
      setErrorMessage('Unable to connect to the server.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="customerpage-container">
      <h1 className="customerpage-title">Customer Login</h1>
      <form className="customerpage-form">
        <label className="customerpage-label">
          Email
          <input
            type="email"
            name="email"
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

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button
          type="button"
          className="customerpage-button-login"
          onClick={handleLogin}
        >
          Login
        </button>
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
