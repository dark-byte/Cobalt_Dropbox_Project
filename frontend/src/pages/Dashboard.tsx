import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DropboxManager from '../components/DropboxManager';

interface File {
  id: string;
  name: string;
  path: string;
}

const Dashboard: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const { token, setToken } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Extract token from URL if present
    const params = new URLSearchParams(location.search);
    const urlToken = params.get('token');

    if (urlToken) {
      setToken(urlToken);
      localStorage.setItem('authToken', urlToken);
      toast.success('Login successful!');
      // Clean the URL by removing the token query parameter
      navigate('/dashboard', { replace: true });
    }

    // Fetch Dropbox files if token is available
    if (token) {
      const fetchDropboxFiles = async (authToken: string) => {
        try {
          // Replace with your actual API endpoint and fetch logic
          const response = await fetch('http://localhost:8000/api/dropbox/files', {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch Dropbox files');
          }

          const data: File[] = await response.json();
          setFiles(data);
        } catch (error: any) {
          console.error('Error fetching Dropbox files:', error);
          toast.error('Failed to load Dropbox files. Please try again.');
        }
      };

      fetchDropboxFiles(token);
    }
  }, [location, setToken, navigate, token]);

  return (
    <div>
      <h2>Your Dropbox Files</h2>
      <DropboxManager />
      {files.length > 0 ? (
        <ul>
          {files.map(file => (
            <li key={file.id}>{file.name}</li>
          ))}
        </ul>
      ) : (
        <p>No files available.</p>
      )}
    </div>
  );
};

export default Dashboard;