import React, { useEffect, useState, useContext, useCallback, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { listDropboxFolders, createDropboxFolder, deleteDropboxItem } from '../services/dropboxService';
import { toast } from 'react-toastify';
import './DropboxManager.css';

interface File {
  id: string;
  name: string;
  path: string;
}

const DropboxManager: React.FC = () => {
  const { token: jwtToken, dropboxToken } = useContext(AuthContext);
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newFolderName, setNewFolderName] = useState('');
  const isInitialMount = useRef(true);
  const hasShownError = useRef(false);
  const fetchTimeoutRef = useRef<NodeJS.Timeout>();

  const fetchFiles = useCallback(async () => {
    if (!jwtToken || !dropboxToken) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await listDropboxFolders(jwtToken, dropboxToken);
      const formattedFiles = response.entries.map((entry: any) => ({
        id: entry.id,
        name: entry.name,
        path: entry.path_lower,
      }));
      setFiles(formattedFiles);
      hasShownError.current = false;
    } catch (error) {
      console.error('Error fetching Dropbox files:', error);
      if (!hasShownError.current) {
        toast.error('Failed to load Dropbox files. Please try again.');
        hasShownError.current = true;
      }
    } finally {
      setIsLoading(false);
    }
  }, [jwtToken, dropboxToken]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      fetchFiles();
    }

    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
      setFiles([]);
    };
  }, [fetchFiles]);

  const handleCreateFolder = async () => {
    if (!jwtToken || !dropboxToken || !newFolderName.trim()) return;

    try {
      await createDropboxFolder(jwtToken, dropboxToken, `/${newFolderName.trim()}`);
      toast.success('Folder created successfully!');
      setNewFolderName('');
      fetchFiles();
    } catch (error) {
      console.error('Error creating Dropbox folder:', error);
      toast.error('Failed to create Dropbox folder. Please try again.');
    }
  };

  const handleDeleteItem = async (path: string) => {
    if (!jwtToken || !dropboxToken) return;

    const confirmDelete = window.confirm('Are you sure you want to delete this item? This action cannot be undone.');
    if (!confirmDelete) return;

    try {
      await deleteDropboxItem(jwtToken, dropboxToken, path);
      toast.success('Item deleted successfully!');
      fetchFiles();
    } catch (error) {
      console.error('Error deleting Dropbox item:', error);
      toast.error('Failed to delete Dropbox item. Please try again.');
    }
  };

  if (!jwtToken || !dropboxToken) {
    return null;
  }

  return (
    <div className="dropbox-manager">
        <h2>Your Dropbox Folders</h2>
      <div className="header">
        <input 
          type="text" 
          value={newFolderName} 
          onChange={(e) => setNewFolderName(e.target.value)} 
          placeholder="New folder name" 
        />
        <button 
          className="create-folder-button" 
          onClick={handleCreateFolder}
          disabled={isLoading}
        >
          Create Folder
        </button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : files.length > 0 ? (
        <ul>
          {files.map(file => (
            <li key={file.id}>
              <span className="file-name">{file.name}</span>
              <button 
                className="delete-button" 
                onClick={() => handleDeleteItem(file.path)}
                disabled={isLoading}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No files available.</p>
      )}
    </div>
  );
};

export default DropboxManager;