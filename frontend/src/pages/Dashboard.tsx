import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DropboxManager from '../components/DropboxManager';
import axios, { AxiosError } from 'axios';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { token, dropboxToken, setToken, setDropboxToken } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_DROPBOX_API_URL;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlToken = params.get('token');
    const urlDropboxToken = params.get('dropboxToken');

    if (urlToken) {
      setToken(urlToken);
      toast.success('Login successful!');
      navigate('/dashboard', { replace: true });
    }

    if (urlDropboxToken) {
      setDropboxToken(urlDropboxToken);
      toast.success('Dropbox linked successfully!');
    }
  }, [location, setToken, setDropboxToken, navigate]);

  const handleDropboxLogin = async () => {
    if (token) {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URL}/auth`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Dropbox auth response:', response.data);
        window.location.href = response.data.redirectUrl;
      } catch (error) {
        console.error('Error initiating Dropbox login:', error);
        toast.error('Failed to initiate Dropbox login');
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error('You must be logged in to link your Dropbox account.');
    }
  };

  const handleTokenCheckError = (error: AxiosError) => {
    if (error.response?.status === 404) {
      console.log('No Dropbox token found');
      setDropboxToken(null);
    } else if (error.response?.status === 401) {
      console.error('Dropbox token expired');
      setDropboxToken(null);
      toast.error('Dropbox connection expired. Please reconnect.');
    } else {
      console.error('Unexpected error:', error);
      toast.error('Failed to verify Dropbox connection');
    }
  };

  const checkDropboxToken = async () => {
    if (token) {
      setIsLoading(true);
      try {
        console.log('Checking Dropbox token status...');
        const response = await axios.get(`${API_URL}/checkDropboxToken`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Token check response:', response.data);
        
        if (response.data.dropboxToken) {
          console.log('Setting Dropbox token in context');
          setDropboxToken(response.data.dropboxToken);
          toast.success('Dropbox connection verified');
        }
      } catch (error) {
        console.error('Token check failed:', error);
        if (axios.isAxiosError(error)) {
          handleTokenCheckError(error);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    checkDropboxToken();
  }, [token]);

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Connecting to Dropbox...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {!dropboxToken ? (
        <div className="dropbox-login-container">
          <button 
            className="dropbox-login-button" 
            onClick={handleDropboxLogin}
            disabled={isLoading}
          >
            {isLoading ? 'Connecting...' : 'Login with Dropbox'}
          </button>
        </div>
      ) : (
        <DropboxManager />
      )}
    </div>
  );
};

export default Dashboard;