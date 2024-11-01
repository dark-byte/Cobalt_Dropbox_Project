import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/Users';

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Add debug logging
    console.log('Auth header:', req.headers.authorization);
    
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
     res.status(401).json({ error: 'No token provided' });
     return;
    }

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
      const user = await User.findById(decodedToken.id);
      if (!user) {
       res.status(404).json({ error: 'User not found' });
       return;
      }
      req.user = user;
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      res.status(401).json({ error: 'Invalid token' });
      return;
    }
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;