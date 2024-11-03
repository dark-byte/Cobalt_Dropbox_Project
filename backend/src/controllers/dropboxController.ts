import User, { IUser } from '../models/Users';
import { asyncHandler } from '../utils/asyncHandler';
import { validationResult } from 'express-validator';
import * as dropboxService from '../services/dropboxService';
import { Request, Response } from 'express';
import crypto from 'crypto'



// Redirect to Dropbox authentication
export const redirectToDropboxAuth = asyncHandler(async (req: Request, res: Response) => {
  try {
    const userId = (req.user as IUser)._id;
    const state = `${crypto.randomBytes(16).toString('hex')}:${userId}`;
    
    // Generate auth URL with proper state parameter
    const authUrl = dropboxService.getDropboxAuthUrl(state);
    
    // Store state temporarily (optional, for additional security)
    res.cookie('dropbox_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 5 * 60 * 1000 // 5 minutes
    });

    // Return URL instead of redirecting
    return res.json({ redirectUrl: authUrl });

  } catch (error) {
    console.error('Error generating Dropbox auth URL:', error);
    return res.status(500).json({ error: 'Failed to initiate Dropbox authentication' });
  }
});

// Handle Dropbox authentication callback
export const handleDropboxAuthCallback = asyncHandler(async (req: Request, res: Response) => {
  const { code, state: returnedState } = req.query;

  if (!code || !returnedState) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    const [stateToken, userId] = (returnedState as string).split(':');
    
    if (!userId) {
      return res.status(400).json({ error: 'Invalid state parameter' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const tokenData = await dropboxService.getDropboxAccessToken(code as string);
    user.dropboxToken = tokenData.access_token;
    user.dropboxRefreshToken = tokenData.refresh_token;
    user.dropboxTokenExpiry = new Date(Date.now() + tokenData.expires_in * 1000);
    await user.save();

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    return res.redirect(`${frontendUrl}/dashboard?dropboxToken=${tokenData.access_token}`);
  } catch (error) {
    console.error('Dropbox callback error:', error);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    return res.redirect(`${frontendUrl}/dashboard?error=Failed to authenticate with Dropbox`);
  }
});

// Check if the user has a valid Dropbox access token
export const checkDropboxToken = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById((req.user as IUser)._id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (!user.dropboxToken) {
    return res.status(404).json({ error: 'Dropbox not connected' });
  }

  try {
    // Simple token verification
    await dropboxService.verifyDropboxToken(user.dropboxToken);
    
    return res.json({
      dropboxToken: user.dropboxToken
    });
  } catch (error) {
    console.error('Error verifying Dropbox token:', error);

    // Attempt to refresh the token if invalid
    if (user.dropboxRefreshToken) {
      try {
        const tokens = await dropboxService.refreshDropboxToken(user.dropboxRefreshToken);
        user.dropboxToken = tokens.access_token;
        user.dropboxTokenExpiry = new Date(Date.now() + tokens.expires_in * 1000);
        await user.save();

        return res.json({
          dropboxToken: user.dropboxToken
        });
      } catch (refreshError) {
        console.error('Error refreshing Dropbox token:', refreshError);
        return res.status(401).json({ error: 'Invalid Dropbox token and failed to refresh' });
      }
    } else {
      return res.status(401).json({ error: 'Invalid Dropbox token' });
    }
  }
});

// List folders in Dropbox
export const listFolders = asyncHandler(async (req: Request, res: Response) => {
  console.log('Listing folders, checking authorization...');
  
  const user = await User.findById((req.user as IUser)._id);
  if (!user) {
    console.log('User not found');
    return res.status(404).json({ error: 'User not found' });
  }

  const dropboxToken = req.headers['dropbox-token'] as string;
  if (!dropboxToken) {
    console.log('Dropbox token not provided');
    return res.status(403).json({ error: 'Dropbox token not provided' });
  }

  try {
    // Verify token before proceeding
    const isValidToken = await dropboxService.verifyDropboxToken(dropboxToken);
    if (!isValidToken) {
      console.log('Invalid Dropbox token, attempting refresh...');
      if (!user.dropboxRefreshToken) {
        return res.status(403).json({ error: 'Dropbox token expired and no refresh token available' });
      }

      const newTokens = await dropboxService.refreshDropboxToken(user.dropboxRefreshToken);
      user.dropboxToken = newTokens.access_token;
      user.dropboxTokenExpiry = new Date(Date.now() + (newTokens.expires_in * 1000));
      await user.save();
      console.log('Token refreshed successfully');
    }

    console.log('Fetching folders from Dropbox...');
    const folders = await dropboxService.listDropboxFolders(user.dropboxToken as string);
    return res.json(folders);
  } catch (error) {
    console.error('Error listing folders:', error);
    if ((error as any).response?.status === 401) {
      return res.status(401).json({ error: 'Invalid or expired Dropbox token' });
    }
    return res.status(500).json({ error: 'Failed to list Dropbox folders' });
  }
});

// Create a new folder in Dropbox
export const createFolder = asyncHandler(async (req: Request, res: Response) => {
  // Validate incoming request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { folderPath } = req.body;
  if (!folderPath) {
    return res.status(400).json({ error: 'Folder path is required' });
  }

  const user = await User.findById((req.user as IUser)._id);
  if (!user) {
    return res.status(403).json({ error: 'Dropbox not connected' });
  }

  const dropboxToken = req.headers['dropbox-token'] as string;
  if (!dropboxToken) {
    console.log('Dropbox token not provided');
    return res.status(403).json({ error: 'Dropbox token not provided' });
  }

  try {
    const result = await dropboxService.createDropboxFolder(dropboxToken, folderPath);
    res.json(result);
  } catch (error) {
    const typedError = error as Error;
    res.status(500).json({ error: typedError.message || 'Failed to create Dropbox folder' });
  }
});

// Delete a file or folder in Dropbox
export const deleteFileOrFolder = asyncHandler(async (req: Request, res: Response) => {
  // Validate incoming request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { path } = req.body;
  if (!path) {
    return res.status(400).json({ error: 'Path is required' });
  }

  const user = await User.findById((req.user as IUser)._id);
  if (!user) {
    return res.status(403).json({ error: 'Dropbox not connected' });
  }

  const dropboxToken = req.headers['dropbox-token'] as string;
  if (!dropboxToken) {
    console.log('Dropbox token not provided');
    return res.status(403).json({ error: 'Dropbox token not provided' });
  }

  try {
    const result = await dropboxService.deleteDropboxItem(dropboxToken, path);
    res.json(result);
  } catch (error) {
    const typedError = error as Error;
    res.status(500).json({ error: typedError.message || 'Failed to delete Dropbox item' });
  }
});
