import React, { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface AuthContextType {
  token: string | null;
  dropboxToken: string | null;
  setToken: (token: string | null) => void;
  setDropboxToken: (token: string | null) => void;
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface User {
  name: string;
  email: string;
  profilePicture: string;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  dropboxToken: null,
  setToken: () => {},
  setDropboxToken: () => {},
  isAuthenticated: false,
  user: null,
  setUser: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));  
  const [dropboxToken, setDropboxToken] = useState<string | null>(localStorage.getItem('dropboxAccessToken'));
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenFromURL = params.get('token');
    const dropboxTokenFromURL = params.get('dropboxToken');

    if (tokenFromURL) {
      // Save the token
      localStorage.setItem('authToken', tokenFromURL);

      // Update authentication state
      setToken(tokenFromURL);

      // Clean the URL by navigating without query parameters
      navigate('/dashboard', { replace: true });
    }

    if (dropboxTokenFromURL) {
      localStorage.setItem('dropboxAccessToken', dropboxTokenFromURL);
      setDropboxToken(dropboxTokenFromURL);
      navigate('/dashboard', { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    if (token) {
      setToken(token);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }, [token]);

  useEffect(() => {
    if (dropboxToken) {
      localStorage.setItem('dropboxAccessToken', dropboxToken);
    } else {
      localStorage.removeItem('dropboxAccessToken');
    }
  }, [dropboxToken]);

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, dropboxToken, setToken, setDropboxToken, isAuthenticated, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};