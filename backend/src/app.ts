// src/app.ts
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import connectDB from './config/dbConfig';
import authRoutes from './routes/authRoutes';
import dropboxRoutes from './routes/dropboxRoutes'
import userRoutes from './routes/userRoutes';

const app = express();

// Middleware
app.use(cors({
  origin: 'https://cobalt-dropbox-project.vercel.app',
  credentials: true,
}));
app.use(express.json());
app.use(passport.initialize());

// Database Connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dropbox', dropboxRoutes)
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Backend API is running');
});

export default app;
