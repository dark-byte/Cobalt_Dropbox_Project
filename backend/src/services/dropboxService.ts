import axios from 'axios';
import querystring from 'querystring';
import crypto from 'crypto';
import { Document } from 'mongoose';
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

// Add the refresh token function
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

// Add the withTokenRefresh wrapper function
export const withTokenRefresh = async <T>(
  user: IUser,
  apiCall: (token: string) => Promise<T>
): Promise<T> => {
  if (!user.dropboxToken || !user.dropboxRefreshToken) {
    throw new Error('Dropbox not connected');
  }

  try {
    // Check if token is expired or will expire soon (5 minutes buffer)
    const isExpired = user.dropboxTokenExpiry && 
      new Date(user.dropboxTokenExpiry).getTime() - 5 * 60 * 1000 < Date.now();

    if (isExpired) {
      const tokens = await refreshDropboxToken(user.dropboxRefreshToken);
      user.dropboxToken = tokens.access_token;
      user.dropboxTokenExpiry = new Date(Date.now() + tokens.expires_in * 1000);
      await user.save();
    }

    return await apiCall(user.dropboxToken);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // Token might be invalid, try refreshing
      try {
        const tokens = await refreshDropboxToken(user.dropboxRefreshToken);
        user.dropboxToken = tokens.access_token;
        user.dropboxTokenExpiry = new Date(Date.now() + tokens.expires_in * 1000);
        await user.save();
        
        return await apiCall(user.dropboxToken);
      } catch (refreshError) {
        throw new Error('Failed to refresh token');
      }
    }
    throw error;
  }
};

// List folders in the user's Dropbox account
export const listDropboxFolders = async (user: IUser) => {
  return withTokenRefresh(user, async (token) => {
    const response = await axios.post(
      `${DROPBOX_API_URL}/files/list_folder`,
      { path: '' }, // Empty path to list root folders
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  });
};

// Create a new folder in the user's Dropbox account
export const createDropboxFolder = async (user: IUser, folderPath: string) => {
  return withTokenRefresh(user, async (token) => {
    const response = await axios.post(
      `${DROPBOX_API_URL}/files/create_folder_v2`,
      { path: folderPath },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  });
};

// Delete a file or folder in the user's Dropbox account
export const deleteDropboxItem = async (user: IUser, path: string) => {
  return withTokenRefresh(user, async (token) => {
    const response = await axios.post(
      `${DROPBOX_API_URL}/files/delete_v2`,
      { path },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  });
};

export async function verifyDropboxToken(token: string): Promise<boolean> {
  try {
  const response = await fetch('https://api.dropboxapi.com/2/check/user', {
    method: 'POST',
    headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });

  if (!response.ok) {
    throw new Error('Token verification failed');
  }

  const data = await response.json();
  return data.result === 'ok';
  } catch (error) {
  console.error('Error verifying Dropbox token:', error);
  return false;
  }
};