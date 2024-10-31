import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/Users';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id }) as IUser;
        if (!user) {
          console.log('Creating new user');
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0].value,
            profilePicture: profile.photos?.[0].value,
            dropboxToken: accessToken, // Store the access token
          });
          console.log('User created:', user);
        } else {
          // Update existing user if necessary
          console.log('Updating existing user');
          user.dropboxToken = accessToken; // Update with the new access token if needed
          await user.save();
          console.log('User updated:', user);
        }
        done(null, user);
      } catch (error) {
        done(error, undefined);
      }
    }
  )
);


// Generate JWT for Google-authenticated users
export const generateJWT = (user: IUser) => {
  const payload = { id: user._id, email: user.email };
  return jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
    expiresIn: '1d',
  });
};