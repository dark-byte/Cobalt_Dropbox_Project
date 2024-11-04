import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import User, { IUser } from '../models/Users';

// Get user data
export const getUserData = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById((req.user as IUser)._id);
  console.log('User:', user);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const userData = {
    name: user.name,
    email: user.email,
    profilePicture: user.profilePicture,
  };

  return res.json(userData);
});