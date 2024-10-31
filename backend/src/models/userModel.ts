// src/models/userModel.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  profilePicture: string;
  googleId?: string;
  adobeToken?: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePicture: { type: String },
  googleId: { type: String },
  adobeToken: { type: String },
});

export default mongoose.model<IUser>('User', userSchema);
