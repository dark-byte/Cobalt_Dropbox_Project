// src/routes/dropboxRoutes.ts
import express from 'express';
import * as dropboxController from '../controllers/dropboxController';
import authMiddleware from '../middleware/authMiddleware';
import { body } from 'express-validator';
import csurf from 'csurf';
const csrfProtection = csurf({ cookie: true });

const router = express.Router();

// Validation rules
const folderPathValidation = body('folderPath').notEmpty().withMessage('Folder path is required');
const pathValidation = body('path').notEmpty().withMessage('Path is required');

router.get('/auth', authMiddleware, dropboxController.redirectToDropboxAuth);
router.get('/auth/callback', dropboxController.handleDropboxAuthCallback);
router.get('/checkDropboxToken', authMiddleware, dropboxController.checkDropboxToken);
router.get('/listFolders', authMiddleware, dropboxController.listFolders);
router.post('/createFolder', csrfProtection, authMiddleware, folderPathValidation, dropboxController.createFolder);
router.post('/delete', csrfProtection, authMiddleware, pathValidation, dropboxController.deleteFileOrFolder);

export default router;
