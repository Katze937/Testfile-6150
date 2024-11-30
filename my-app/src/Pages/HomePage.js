import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // 引入自訂的 CSS 檔案

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Welcome Login</h1>
      <div className="homepage-buttons">
        <button className="homepage-button" onClick={() => navigate('/staff')}>
          Staff Page
        </button>
        <button className="homepage-button" onClick={() => navigate('/customer')}>
          Customer Page
        </button>
      </div>
    </div>
  );
}

export default HomePage;
