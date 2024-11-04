// src/routes/dropboxRoutes.ts
import express from 'express';
import * as dropboxController from '../controllers/dropboxController';
import authMiddleware from '../middleware/authMiddleware';
import { body } from 'express-validator';

const router = express.Router();

// Validation rules
const folderPathValidation = body('folderPath').notEmpty().withMessage('Folder path is required');
const pathValidation = body('path').notEmpty().withMessage('Path is required');

router.get('/auth', authMiddleware, dropboxController.redirectToDropboxAuth);
router.get('/auth/callback', dropboxController.handleDropboxAuthCallback);
router.get('/checkDropboxToken', authMiddleware, dropboxController.checkDropboxToken);
router.get('/getDropboxToken', authMiddleware, dropboxController.getDropboxToken);
router.get('/listFolders', authMiddleware, dropboxController.listFolders);
router.post('/createFolder', authMiddleware, folderPathValidation, dropboxController.createFolder);
router.post('/delete', authMiddleware, pathValidation, dropboxController.deleteFileOrFolder);

export default router;
