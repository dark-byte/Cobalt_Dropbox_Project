// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Dropbox Manager</h1>
      <p>
        <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to manage your Dropbox files.
      </p>
    </div>
  );
};

export default Home;