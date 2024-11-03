import axios from 'axios';
import querystring from 'querystring';
import { IUser } from '../models/Users';

const DROPBOX_API_URL = 'https://api.dropboxapi.com/2';
const DROPBOX_OAUTH_URL = 'https://www.dropbox.com/oauth2';

interface DropboxTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

// Generate the Dropbox authorization URL
export const getDropboxAuthUrl = (state: string) => {
  const params = querystring.stringify({
    response_type: 'code',
    client_id: process.env.DROPBOX_CLIENT_ID || '',
    redirect_uri: process.env.DROPBOX_REDIRECT_URI || '',
    state,
    token_access_type: 'offline',
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

// Refresh Dropbox token
export const refreshDropboxToken = async (refreshToken: string): Promise<DropboxTokens> => {
  try {
    const response = await axios.post(
      `${DROPBOX_OAUTH_URL}/token`,
      querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: process.env.DROPBOX_CLIENT_ID,
        client_secret: process.env.DROPBOX_CLIENT_SECRET,
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error refreshing Dropbox token:', error);
    throw new Error('Failed to refresh token');
  }
};

// List folders in the user's Dropbox account
export const listDropboxFolders = async (dropboxToken: string) => {
  try {
    const response = await axios.post(
      `${DROPBOX_API_URL}/files/list_folder`,
      { path: '' }, // Empty path to list root folders
      {
        headers: {
          Authorization: `Bearer ${dropboxToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error listing folders:', error);
    throw error;
  }
};

// Create a new folder in the user's Dropbox account
export const createDropboxFolder = async (dropboxToken: string, folderPath: string) => {
  try {
    const response = await axios.post(
      `${DROPBOX_API_URL}/files/create_folder_v2`,
      { path: folderPath },
      {
        headers: {
          Authorization: `Bearer ${dropboxToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating folder:', error);
    throw error;
  }
};

// Delete a file or folder in the user's Dropbox account
export const deleteDropboxItem = async (dropboxToken: string, path: string) => {
  try {
    const response = await axios.post(
      `${DROPBOX_API_URL}/files/delete_v2`,
      { path },
      {
        headers: {
          Authorization: `Bearer ${dropboxToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};

// Verify Dropbox token
export async function verifyDropboxToken(token: string): Promise<boolean> {
  try {
    const response = await axios.post(
      'https://api.dropboxapi.com/2/check/user',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.status === 200;
  } catch (error) {
    console.error('Error verifying Dropbox token:', error);
    return false;
  }
}