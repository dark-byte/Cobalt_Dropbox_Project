import request from 'supertest';
import app from '../app';
import User from '../models/Users';
import { jest } from '@jest/globals';
import bcrypt from 'bcryptjs';

// Mock User Model
jest.mock('../models/Users');

describe('Authentication Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    const validUser = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User'
    };

    test('should register a new user successfully', async () => {
      (User.findOne as jest.Mock<any>).mockResolvedValue(null);
      (User.prototype.save as jest.Mock<any>).mockResolvedValue(validUser);

      const response = await request(app)
        .post('/api/auth/register')
        .send(validUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'User registered successfully');
    });

    test('should return error if user already exists', async () => {
      (User.findOne as jest.Mock<any>).mockResolvedValue(validUser);

      const response = await request(app)
        .post('/api/auth/register')
        .send(validUser);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'User already exists');
    });
  });

  describe('POST /api/auth/login', () => {
    const validUser = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User'
    };

    test('should login user successfully', async () => {
      const hashedPassword = await bcrypt.hash('password123', 10);
      (User.findOne as jest.Mock<any>).mockResolvedValue({
        ...validUser,
        password: hashedPassword,
        _id: 'testid123'
      });

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: validUser.email,
          password: validUser.password
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
    });

    test('should return error for invalid credentials', async () => {
      (User.findOne as jest.Mock<any>).mockResolvedValue(null);

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: validUser.email,
          password: 'wrongpassword'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Invalid credentials');
    });
  });
}); 