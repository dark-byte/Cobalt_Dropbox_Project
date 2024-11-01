import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/Users';

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ error: 'Access denied: Token missing' });
      return;
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await User.findById(decodedToken.id);
    if (!user) {
      res.status(401).json({ error: 'Access denied: User not found' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    const TypedError = error as Error;

    console.error('Error verifying token:', error);
    if (TypedError.name === 'JsonWebTokenError') {
      res.status(403).json({ error: 'Invalid token' });
      return;
    }
    if (TypedError.name === 'TokenExpiredError') {
      res.status(403).json({ error: 'Token expired' });
      return;
    }
    res.status(500).json({ error: 'An error occurred during token verification' });
  }
};

export default authMiddleware;