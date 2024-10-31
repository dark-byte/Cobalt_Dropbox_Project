import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password?: string; // Optional for Google login
  googleId?: string; // Set only if logging in with Google
  name: string;
  profilePicture?: string;
  dropboxToken?: string; // Stores Dropbox OAuth token
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Only for email/password login
  googleId: { type: String }, // Only for Google OAuth
  name: { type: String, required: true },
  profilePicture: { type: String },
  dropboxToken: { type: String },
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;