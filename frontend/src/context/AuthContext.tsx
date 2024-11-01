import React, { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface AuthContextType {
  token: string | null;
  dropboxToken: string | null;
  setToken: (token: string | null) => void;
  setDropboxToken: (token: string | null) => void;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  dropboxToken: null,
  setToken: () => {},
  setDropboxToken: () => {},
  isAuthenticated: false,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));  
  const [dropboxToken, setDropboxToken] = useState<string | null>(localStorage.getItem('dropboxAccessToken'));
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

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, dropboxToken, setToken, setDropboxToken, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};