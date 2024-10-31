// src/app.ts
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import connectDB from './config/dbConfig';
import authRoutes from './routes/authRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Database Connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Backend API is running');
});

export default app;
