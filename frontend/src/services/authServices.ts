// src/services/authService.ts
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth';

// Register a new user
export const registerUser = async (email: string, password: string, name: string) => {
  const response = await axios.post(`${API_URL}/register`, { email, password, name });
  return response.data;
};

// Log in a user
export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};
