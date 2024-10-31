import axios from 'axios';
import querystring from 'querystring';

const DROPBOX_API_URL = 'https://api.dropboxapi.com/2';
const DROPBOX_OAUTH_URL = 'https://www.dropbox.com/oauth2';

// Generate the Dropbox authorization URL
export const getDropboxAuthUrl = () => {
  const params = querystring.stringify({
    response_type: 'code',
    client_id: process.env.DROPBOX_CLIENT_ID || '',
    redirect_uri: process.env.DROPBOX_REDIRECT_URI || '',
  });
  return `${DROPBOX_OAUTH_URL}/authorize?${params}`;
};

// Exchange authorization code for an access token
export const getDropboxAccessToken = async (code: string) => {
  try {
    const response = await axios.post(
      `${DROPBOX_OAUTH_URL}/token`,
      querystring.stringify({
        code,
        grant_type: 'authorization_code',
        client_id: process.env.DROPBOX_CLIENT_ID || '',
        client_secret: process.env.DROPBOX_CLIENT_SECRET || '',
        redirect_uri: process.env.DROPBOX_REDIRECT_URI || '',
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );
    return response.data; // Includes access token
  } catch (error) {
    console.error('Error exchanging authorization code for access token:', error);
    throw new Error('Failed to retrieve Dropbox access token');
  }
};

// List folders in the user's Dropbox account
export const listDropboxFolders = async (accessToken: string) => {
  try {
    const response = await axios.post(
      `${DROPBOX_API_URL}/files/list_folder`,
      { path: '' }, // Empty path to list root folders
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error listing Dropbox folders:', error);
    throw new Error('Failed to list Dropbox folders');
  }
};

// Create a new folder in the user's Dropbox account
export const createDropboxFolder = async (accessToken: string, folderPath: string) => {
  try {
    const response = await axios.post(
      `${DROPBOX_API_URL}/files/create_folder_v2`,
      { path: folderPath },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating Dropbox folder:', error);
    throw new Error('Failed to create Dropbox folder');
  }
};

// Delete a file or folder in the user's Dropbox account
export const deleteDropboxItem = async (accessToken: string, path: string) => {
  try {
    const response = await axios.post(
      `${DROPBOX_API_URL}/files/delete_v2`,
      { path },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting Dropbox item:', error);
    throw new Error('Failed to delete Dropbox item');
  }
};
