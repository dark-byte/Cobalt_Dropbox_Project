import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config({ path: '.env.test' });

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  // Uncomment these to disable specific console methods during tests
  // log: jest.fn(),
  // error: jest.fn(),
  // warn: jest.fn(),
  // info: jest.fn(),
  // debug: jest.fn(),
};

// Setup MongoDB Memory Server for testing
beforeAll(async () => {
  // Connect to MongoDB first
  await mongoose.connect(process.env.MONGO_URI || '');
  
  // Then set environment variables
  process.env.JWT_SECRET = 'test-jwt-secret';
  process.env.MONGO_URI = 'mongodb://localhost:27017/test-db';
  process.env.DROPBOX_CLIENT_ID = 'test-dropbox-client-id';
  process.env.DROPBOX_CLIENT_SECRET = 'test-dropbox-client-secret';
  process.env.DROPBOX_REDIRECT_URI = 'http://localhost:5000/api/dropbox/auth/callback';
}, 30000); // Increase timeout to 30 seconds

// Cleanup after all tests
afterAll(async () => {
  await mongoose.disconnect(); // Use disconnect() instead of connection.close()
}, 30000); // Increase timeout to 30 seconds

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
}); 