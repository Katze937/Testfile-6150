import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StaffRegisterPage.css'; // 引入樣式

// Reusable Password Input Component
function PasswordInput({ label, name, value, onChange, showPassword, toggleVisibility }) {
  return (
    <label className="registerpage-label">
      {label}
      <div className="password-container">
        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          placeholder={`Please Enter your ${label}`}
          className="registerpage-input"
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          className="password-toggle"
          onClick={toggleVisibility}
        >
          👁️
        </button>
      </div>
    </label>
  );
}

function StaffRegisterPage() {
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
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      alert('Invalid email format');
      return;
    }

    // Password length and strength check
    if (formData.password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!strongPasswordRegex.test(formData.password)) {
      alert('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Call the API to save the data
    fetch('http://127.0.0.1:5000/staff/register', {
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
        setTimeout(() => navigate('/staffpage'), 10000); // Redirect after 10 seconds
      })
      .catch((error) => {
        console.error('Error during registration:', error);
        alert('Registration failed. Please try again.');
      });
  };

  return (
    <div className="registerpage-container">
      <h1 className="registerpage-title">Staff Register</h1>
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
            required
          />
        </label>
        
        <PasswordInput
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          showPassword={showPassword}
          toggleVisibility={() => setShowPassword(!showPassword)}
        />
        
        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          showPassword={showConfirmPassword}
          toggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
        />
        
        <div className="registerpage-buttons">
          <button
            type="button"
            className="registerpage-button"
            onClick={() => navigate('/staff')}
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

export default StaffRegisterPage;
