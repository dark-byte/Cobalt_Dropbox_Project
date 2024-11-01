// controllers/authController.ts
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/Users';
import { generateJWT } from '../services/authService'; 

// Validation rules for registration
export const registerValidation = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('name').notEmpty().withMessage('Name is required'),
];

// Validation rules for login
export const loginValidation = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Helper function to handle validation errors
const handleValidationErrors = (req: Request, res: Response): boolean => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return false; // Indicate validation failed
  }
  return true; // Validation passed
};

// Register new user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  if (!handleValidationErrors(req, res)) return;

  const { email, password, name } = req.body;
  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(400).json({ error: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email: email.toLowerCase(), password: hashedPassword, name });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

// Login user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  if (!handleValidationErrors(req, res)) return;

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email.toLowerCase() }) as IUser;
    if (!user || !user.password) {
      res.status(400).json({ error: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ error: 'Invalid credentials' });
      return;
    }

    const token = generateJWT(user);
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

// Google OAuth callback route
export const googleAuthCallback = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user as IUser; // User is populated by Passport.js

    if (!user || !user.email) {
      res.status(400).json({ error: 'User information is incomplete' });
      return;
    }

    const token = generateJWT(user); // Generate JWT

    // Redirect to frontend home page with token as query parameter
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  } catch (error: any) {
    console.error('Google OAuth callback error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};
