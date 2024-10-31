// src/routes/authRoutes.ts
import { Router } from 'express';
import passport from 'passport';
import { generateJWT } from '../services/authService';

const router = Router();

// Initiate Google Login
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google Callback
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req: any, res) => {
    // Generate JWT and send to client
    const token = generateJWT(req.user);
    res.json({ token });
  }
);

export default router;
