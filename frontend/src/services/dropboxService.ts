import axios from 'axios';

const API_URL = process.env.REACT_APP_DROPBOX_API_URL || 'http://localhost:8000/api/dropbox';

export const getDropboxFiles = async (token: string) => {
  return axios.get(`${API_URL}/files`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const loginWithDropbox = async (authToken: string) => {
  try {
    const response = await axios.get(`${API_URL}/auth`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error initiating Dropbox login:', error);
    throw new Error('Failed to initiate Dropbox login');
  }
};

export const listDropboxFolders = async (jwtToken: string, dropboxToken: string) => {
  try {
    const response = await axios.get(`${API_URL}/listFolders`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Dropbox-Token': dropboxToken,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error listing folders:', error);
    throw error;
  }
};

export const createDropboxFolder = async (jwtToken: string, dropboxToken: string, folderPath: string) => {
  const response = await axios.post(
    `${API_URL}/createFolder`,
    { folderPath },
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Dropbox-Token': dropboxToken,
        'Content-Type': 'application/json'
      }
    }
  );
  return response.data;
};

export const deleteDropboxItem = async (jwtToken: string, dropboxToken: string, path: string) => {
  const response = await axios.post(
    `${API_URL}/delete`,
    { path },
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Dropbox-Token': dropboxToken,
        'Content-Type': 'application/json'
      }
    }
  );
  return response.data;
};