import React, { useEffect, useState, useContext } from 'react';
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
  const { dropboxToken } = useContext(AuthContext);
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      if (!dropboxToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await listDropboxFolders(dropboxToken);
        const files = response.entries.map((entry: any) => ({
          id: entry.id,
          name: entry.name,
          path: entry.path_lower,
        }));
        setFiles(files);
      } catch (error) {
        console.error('Error fetching Dropbox files:', error);
        toast.error('Failed to load Dropbox files. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFiles();
  }, [dropboxToken]);

  const handleCreateFolder = async (folderPath: string) => {
    if (dropboxToken) {
      try {
        await createDropboxFolder(dropboxToken, folderPath);
        toast.success('Folder created successfully!');
        // Refresh the folder list
        const response = await listDropboxFolders(dropboxToken);
        const files = response.entries.map((entry: any) => ({
          id: entry.id,
          name: entry.name,
          path: entry.path_lower,
        }));
        setFiles(files);
      } catch (error) {
        console.error('Error creating Dropbox folder:', error);
        toast.error('Failed to create Dropbox folder. Please try again.');
      }
    }
  };

  const handleDeleteItem = async (path: string) => {
    if (dropboxToken) {
      try {
        await deleteDropboxItem(dropboxToken, path);
        toast.success('Item deleted successfully!');
        // Refresh the folder list
        const response = await listDropboxFolders(dropboxToken);
        const files = response.entries.map((entry: any) => ({
          id: entry.id,
          name: entry.name,
          path: entry.path_lower,
        }));
        setFiles(files);
      } catch (error) {
        console.error('Error deleting Dropbox item:', error);
        toast.error('Failed to delete Dropbox item. Please try again.');
      }
    }
  };

  return (
    <div className="dropbox-manager">
      <div className="header">
        <h2>Your Dropbox Folders</h2>
        <button className="create-folder-button" onClick={() => handleCreateFolder('/new-folder')}>
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
              <button className="delete-button" onClick={() => handleDeleteItem(file.path)}>
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