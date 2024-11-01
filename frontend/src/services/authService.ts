import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/auth';

export const register = (email: string, password: string, name: string) => {
  return axios.post(`${API_URL}/register`, { email, password, name });
};

export const login = (email: string, password: string) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

export const loginWithGoogle = () => {
  window.open(`${API_URL}/google`, "_self");
};