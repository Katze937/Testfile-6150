import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerRegisterPage.css'; // Ensure the CSS file is correct

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Call API to save data
    fetch('http://127.0.0.1:5000/customer/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    })
    
      .then((response) => response.json())
      .then((data) => {
        console.log('Registration successful:', data);
        alert('Registration successful');
        setFormData({ email: '', password: '', confirmPassword: '' }); // Reset form

        // Redirect after a brief delay
        setTimeout(() => navigate('/customerpage'), 1000); // Adjust the delay as necessary
      })
      .catch((error) => {
        console.error('Error during registration:', error);
        alert('Registration failed. Please try again.');
      });
  };

  return (
    <div className="registerpage-container">
      <h1 className="registerpage-title">Customer Register</h1>
      <form className="registerpage-form" onSubmit={handleSubmit}>
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
            onClick={() => navigate('/customer')} // Navigate to customer page on return
          >
            Return
          </button>
          <button type="submit" className="registerpage-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CustomerRegisterPage;
