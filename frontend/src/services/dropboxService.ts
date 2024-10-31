import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/dropbox';

export const connectDropbox = () => {
  window.location.href = `${API_URL}/connect`;
};

export const getDropboxFiles = async (token: string) => {
  return axios.get(`${API_URL}/files`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};