import React, { useEffect, useState, useContext } from 'react';
import { getDropboxFiles } from '../services/dropboxService';
import { AuthContext } from '../context/AuthContext';
import DropboxManager from '../components/DropboxManager';
import { toast } from 'react-toastify';

interface File {
  id: string;
  name: string;
  path: string;
}

const Dashboard: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchFiles = async () => {
      if (!token) {
        toast.error('You need to login first.');
        return;
      }
      try {
        const response = await getDropboxFiles(token);
        setFiles(response.data.files);
      } catch (error) {
        toast.error('Failed to fetch Dropbox files.');
      }
    };

    fetchFiles();
  }, [token]);

  return (
    <div>
      <h2>Your Dropbox Files</h2>
      <DropboxManager />
      <ul>
        {files.map(file => (
          <li key={file.id}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;