import request from 'supertest';
import express, { Application } from 'express';
import { UserController } from './user.controller';
import { UserService } from '../services/user.service';

const app: Application = express();
app.use(express.json());
app.post('/users', UserController.createUser);
app.post('/auth', UserController.authenticateUser);
app.post('/logout', UserController.logoutUser);

// Mock UserService
jest.mock('../services/user.service');
const mockUserService = UserService as jest.Mocked<typeof UserService>;

describe('UserController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should return 400 if any required fields are missing', async () => {
      const response = await request(app)
        .post('/users')
        .send({ firstName: 'John' }); // Missing fields

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('All fields are required.');
    });

    it('should return 201 and create the user', async () => {
      const mockAccount = { id: '123', user: 'mockUserId', accessToken: 'mockToken' };
      mockUserService.prototype.createUser.mockResolvedValue(mockAccount);

      const response = await request(app)
        .post('/users')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          username: 'johndoe',
          password: 'password123',
        });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockAccount);
      expect(mockUserService.prototype.createUser).toHaveBeenCalledWith(
        'John',
        'Doe',
        'john.doe@example.com',
        'johndoe',
        'password123'
      );
    });

    it('should return the appropriate error if CustomError is thrown', async () => {
      mockUserService.prototype.createUser.mockRejectedValue(
        new CustomError(409, 'User with same email already exists.')
      );

      const response = await request(app)
        .post('/users')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          username: 'johndoe',
          password: 'password123',
        });

      expect(response.status).toBe(409);
      expect(response.body).toEqual({
        message: 'User with same email already exists.',
        error: undefined,
      });
    });
  });

  describe('authenticateUser', () => {
    it('should return 400 if username or password is missing', async () => {
      const response = await request(app)
        .post('/auth')
        .send({ username: 'johndoe' }); // Missing password

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Username and password are required.');
    });

    it('should return 200 and authenticate the user', async () => {
      const mockAccount = { id: '123', user: 'mockUserId', accessToken: 'mockToken' };
      mockUserService.prototype.authenticateUser.mockResolvedValue(mockAccount);

      const response = await request(app)
        .post('/auth')
        .send({
          username: 'johndoe',
          password: 'password123',
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockAccount);
    });

    it('should return 401 if authentication fails', async () => {
      mockUserService.prototype.authenticateUser.mockResolvedValue('Invalid credentials');

      const response = await request(app)
        .post('/auth')
        .send({
          username: 'johndoe',
          password: 'wrongpassword',
        });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Invalid credentials');
    });
  });

  describe('logoutUser', () => {
    it('should return 400 if username is missing', async () => {
      const response = await request(app)
        .post('/logout')
        .send({}); // Missing username

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Username is required.');
    });

    it('should return 200 and log out the user', async () => {
      mockUserService.prototype.logoutUser.mockResolvedValue({ message: 'Logout successful' });

      const response = await request(app)
        .post('/logout')
        .send({ username: 'johndoe' });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Logout successful');
    });
  });
});
