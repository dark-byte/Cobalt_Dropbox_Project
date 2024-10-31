import React, { useContext } from 'react';
import { connectDropbox } from '../services/dropboxService';
import { AuthContext } from '../context/AuthContext';
import './DropboxManager.css'; // Optional: Create a CSS file for styling

const DropboxManager: React.FC = () => {
  const { token } = useContext(AuthContext);

  const handleConnect = () => {
    if (!token) {
      alert('Please login first.');
      return;
    }
    connectDropbox();
  };

  return (
    <div className="dropbox-manager">
      <button onClick={handleConnect} className="connect-button">Connect Dropbox</button>
    </div>
  );
};

export default DropboxManager;