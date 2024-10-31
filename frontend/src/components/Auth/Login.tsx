// src/components/Auth/Login.tsx
import React, { useState, useContext } from 'react';
import { login } from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      const { token } = response.data;
      setToken(token);
      localStorage.setItem('token', token);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error: any) { // Type 'any' to access error.response
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(`Login failed: ${error.response.data.error}`);
      } else {
        toast.error('Login failed. Please try again.');
      }
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email" 
        required 
      />
      <input 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password" 
        required 
      />
      <button type="submit">Login</button>
      <button type="button" onClick={handleGoogleLogin}>Login with Google</button>
    </form>
  );
};

export default Login;