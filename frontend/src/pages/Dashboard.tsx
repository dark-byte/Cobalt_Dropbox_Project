import React, { useEffect, useState, useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DropboxManager from '../components/DropboxManager';
import axios from 'axios';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { token, dropboxToken, setToken, setDropboxToken, user, setUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  const API_DROPBOX_URL = process.env.REACT_APP_DROPBOX_API_URL;
  const [isLoading, setIsLoading] = useState(false);
  const hasShownConnectionToast = useRef(false);
  const isInitialMount = useRef(true);

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
      localStorage.setItem('dropboxConnected', 'true');
      if (!hasShownConnectionToast.current) {
        toast.success('Dropbox linked successfully!');
        hasShownConnectionToast.current = true;
      }
    }
  }, [location, setToken, setDropboxToken, navigate]);

  const handleDropboxLogin = async () => {
    if (token) {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_DROPBOX_URL}/auth`, {
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

  const checkDropboxToken = async () => {
    if (token) {
      setIsLoading(true);
      try {
        console.log('Checking Dropbox token status...');
        const response = await axios.get(`${API_DROPBOX_URL}/checkDropboxToken`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Token check response:', response.data);
  
        if (response.data.dropboxToken) {
          console.log('Setting Dropbox token in context');
          setDropboxToken(response.data.dropboxToken);
          localStorage.setItem('dropboxAccessToken', response.data.dropboxToken);
          localStorage.setItem('dropboxConnected', 'true');
        } else {
          console.log('Dropbox token not found in response');
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            console.log('Dropbox not connected by the user.');
            setDropboxToken(null);
            localStorage.removeItem('dropboxAccessToken');
            localStorage.setItem('dropboxConnected', 'false');
            toast.info('Dropbox not connected. Please connect to Dropbox.');
          } else if (error.response?.status === 401) {
            console.error('Dropbox token expired');
            setDropboxToken(null);
            toast.error('Dropbox connection expired. Please reconnect.');
          } else {
            console.error('Error checking Dropbox token:', error);
            toast.error('Failed to verify Dropbox connection');
          }
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      checkDropboxToken();
    }
  }, [token]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const response = await axios.get(`${API_URL}/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [token, setUser]);

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Connecting to Dropbox...</div>
      </div>
    );
  }

  const defaultProfilePicture = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Default User')}&background=ccc&color=fff&size=200`;

  return (
    <div className="dashboard-container">
      <div className="user-info">
        <img src={user?.profilePicture || defaultProfilePicture} alt="Profile" className="profile-picture" />
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
      </div>
      {!dropboxToken ? (
        <div className="dropbox-login-container">
          <button 
            className="dropbox-login-button" 
            onClick={handleDropboxLogin}
            disabled={isLoading}
          >
            Login with Dropbox
          </button>
        </div>
      ) : (
        <DropboxManager />
      )}
    </div>
  );
};

export default Dashboard;