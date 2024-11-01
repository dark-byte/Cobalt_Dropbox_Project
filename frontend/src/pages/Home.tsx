// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Dropbox Manager</h1>
        <div className="button-container">
          <Link to="/login" className="home-button">Login</Link>
          <Link to="/register" className="home-button">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;