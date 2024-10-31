// src/routes/authRoutes.ts
import express from 'express';
import passport from 'passport';
import { registerUser, loginUser, registerValidation, loginValidation, googleAuthCallback } from '../controllers/authController'; // Ensure this imports googleAuthCallback

const router = express.Router();

// Standard email/password registration and login routes
router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);

// Google OAuth login route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
router.get('/google/callback', passport.authenticate('google', { session: false }), googleAuthCallback);

export default router;
