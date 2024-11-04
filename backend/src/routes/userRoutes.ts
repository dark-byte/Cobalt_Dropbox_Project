import express from 'express';
import * as userController from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authMiddleware, userController.getUserData);

export default router;