import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId,
  email: string;
  password?: string;
  name: string;
  googleId?: string;
  profilePicture?: string;
  dropboxToken?: string;
  dropboxRefreshToken?: string;
  dropboxTokenExpiry?: Date;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: String,
  name: {
    type: String,
    required: true,
    trim: true,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  profilePicture: String,
  dropboxToken: String,
  dropboxRefreshToken: String,
  dropboxTokenExpiry: Date,
}, {
  timestamps: true,
});

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ googleId: 1 }, { unique: true, sparse: true });

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;