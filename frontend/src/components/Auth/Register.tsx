import React, { useState } from 'react';
import { register } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Register.css'; 

const Register: React.FC = () => {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic client-side validation
    if (!name || !email || !password) {
      toast.error('All fields are required.');
      return;
    }

    try {
      await register(email, password, name); 
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(`Registration failed: ${error.response.data.error}`);
      } else if (error.response && error.response.data && error.response.data.errors) {
        // Handle validation errors from express-validator
        const errorMessages = error.response.data.errors.map((err: any) => err.msg).join(', ');
        toast.error(`Registration failed: ${errorMessages}`);
      } else {
        toast.error('Registration failed. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2>Register</h2>
      <input 
        type="text" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name" 
        required 
      />
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
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;