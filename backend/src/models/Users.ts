import mongoose, { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId,
  email: string;
  password?: string;
  name: string;
  googleId?: string;
  profilePicture?: string;
  dropboxToken?: string;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email uniqueness
    lowercase: true, // Normalize email to lowercase
    trim: true,
  },
  password: {
    type: String,
    // Password is optional because OAuth users may not have a password
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  googleId: {
    type: String,
    unique: true, // Optional: ensures unique Google IDs
    sparse: true, // Allows multiple documents without a googleId
  },
  profilePicture: {
    type: String,
  },
  dropboxToken: {
    type: String,
  },
}, {
  timestamps: true, // Optional: adds createdAt and updatedAt fields
});

// Create indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ googleId: 1 }, { unique: true, sparse: true });

const User = model<IUser>('User', userSchema);

export default User;