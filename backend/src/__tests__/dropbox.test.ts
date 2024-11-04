import request from 'supertest';
import app from '../app';
import User from '../models/Users';
import { jest } from '@jest/globals';
import * as dropboxService from '../services/dropboxService';

// Mock User Model and Dropbox Service
jest.mock('../models/Users');
jest.mock('../services/dropboxService');

// Mock Authentication Middleware
jest.mock('../middleware/authMiddleware', () => {
  return (req: any, res: any, next: any) => {
    req.user = {
      _id: 'testUserId',
      email: 'test@example.com',
      name: 'Test User',
      dropboxToken: 'mock-dropbox-token'
    };
    next();
  };
});

describe('Dropbox Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (User.findById as jest.Mock<any>).mockResolvedValue({
      _id: 'testUserId',
      email: 'test@example.com',
      name: 'Test User',
      dropboxToken: 'mock-dropbox-token'
    });
  });

  describe('GET /api/dropbox/auth', () => {
    test('should return Dropbox auth URL', async () => {
      const mockAuthUrl = 'https://dropbox.com/oauth2/authorize?mock=true';
      (dropboxService.getDropboxAuthUrl as jest.Mock).mockReturnValue(mockAuthUrl);

      const response = await request(app)
        .get('/api/dropbox/auth');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('redirectUrl', mockAuthUrl);
    });
  });

  describe('GET /api/dropbox/listFolders', () => {
    const mockFolders = {
      entries: [
        { id: '1', name: 'Folder1', path_lower: '/folder1' },
        { id: '2', name: 'Folder2', path_lower: '/folder2' }
      ]
    };

    test('should list Dropbox folders successfully', async () => {
      (dropboxService.listDropboxFolders as jest.Mock<any>).mockResolvedValue(mockFolders);
      (dropboxService.verifyDropboxToken as jest.Mock<any>).mockResolvedValue(true);

      const response = await request(app)
        .get('/api/dropbox/listFolders')
        .set('dropbox-token', 'valid-token');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockFolders);
    });

    test('should return error when Dropbox token is missing', async () => {
      const response = await request(app)
        .get('/api/dropbox/listFolders');

      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty('error', 'Dropbox token not provided');
    });
  });

  describe('POST /api/dropbox/createFolder', () => {
    test('should create folder successfully', async () => {
      (dropboxService.createDropboxFolder as jest.Mock<any>).mockResolvedValue({ success: true });

      const response = await request(app)
        .post('/api/dropbox/createFolder')
        .set('dropbox-token', 'valid-token')
        .send({ folderPath: '/newFolder' });

      expect(response.status).toBe(200);
      expect(dropboxService.createDropboxFolder).toHaveBeenCalledWith('valid-token', '/newFolder');
    });

    test('should return error when folder path is missing', async () => {
      const response = await request(app)
        .post('/api/dropbox/createFolder')
        .set('dropbox-token', 'valid-token')
        .send({});

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/dropbox/delete', () => {
    test('should delete item successfully', async () => {
      (dropboxService.deleteDropboxItem as jest.Mock<any>).mockResolvedValue({ success: true });
      (dropboxService.verifyDropboxToken as jest.Mock<any>).mockResolvedValue(true);

      const response = await request(app)
        .post('/api/dropbox/delete')
        .set('dropbox-token', 'valid-token')
        .send({ path: '/fileToDelete' });
      
      expect(response.status).toBe(200);
      expect(dropboxService.deleteDropboxItem).toHaveBeenCalledWith('valid-token', '/fileToDelete');
    });

    test('should return error when path is missing', async () => {
      const response = await request(app)
        .post('/api/dropbox/delete')
        .set('dropbox-token', 'valid-token')
        .send({});

      expect(response.status).toBe(400);
    });
  });
}); 