import { Request, Response } from 'express';
import * as dropboxService from '../services/dropboxService';
import User, { IUser } from '../models/Users';
import { asyncHandler } from '../utils/asyncHandler';
import { validationResult } from 'express-validator';

// Redirect to Dropbox authentication
export const redirectToDropboxAuth = asyncHandler(async (req: Request, res: Response) => {
  const authUrl = dropboxService.getDropboxAuthUrl(); 
  res.redirect(authUrl);
});

// Handle Dropbox authentication callback
export const handleDropboxAuthCallback = asyncHandler(async (req: Request, res: Response) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code is missing' });
  }

  try {
    const tokenData = await dropboxService.getDropboxAccessToken(code as string);

    const user = await User.findById((req.user as IUser)._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.dropboxToken = tokenData.access_token;
    await user.save();

    res.json({ message: 'Dropbox connected successfully' });
  } catch (error) {
    const typedError = error as Error;
    res.status(500).json({ error: typedError.message || 'Failed to connect to Dropbox' });
  }
});

// List folders in Dropbox
export const listFolders = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById((req.user as IUser)._id);
  if (!user || !user.dropboxToken) {
    return res.status(403).json({ error: 'Dropbox not connected or token missing' });
  }

  try {
    const folders = await dropboxService.listDropboxFolders(user.dropboxToken);
    res.json(folders);
  } catch (error) {
    const typedError = error as Error;
    res.status(500).json({ error: typedError.message || 'Failed to list Dropbox folders' });
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
  if (!user || !user.dropboxToken) {
    return res.status(403).json({ error: 'Dropbox not connected' });
  }

  try {
    const result = await dropboxService.createDropboxFolder(user.dropboxToken, folderPath);
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
  if (!user || !user.dropboxToken) {
    return res.status(403).json({ error: 'Dropbox not connected' });
  }

  try {
    const result = await dropboxService.deleteDropboxItem(user.dropboxToken, path);
    res.json(result);
  } catch (error) {
    const typedError = error as Error;
    res.status(500).json({ error: typedError.message || 'Failed to delete Dropbox item' });
  }
});
