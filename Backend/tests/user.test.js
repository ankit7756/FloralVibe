const request = require('supertest');
const express = require('express'); // Import express directly
const userRoutes = require('../routes/userRoute'); // Load only user routes
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Mock the User model methods
jest.mock('../models/userModel');

const app = express();
app.use(express.json());
app.use('/api/user', userRoutes); // Mount only user routes for testing

describe('User Controller API Tests', () => {
    let server;

    // Start the server before all tests
    beforeAll((done) => {
        server = app.listen(4000, () => {
            console.log('Test server running on port 4000');
            done();
        });
    });

    // Close the server after all tests
    afterAll((done) => {
        server.close(done);
    });

    // Clear mocks after each test
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Mock data
    const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        contact: '1234567890',
        address: '123 Test St',
        password: '$2b$10$...hashedpassword...',
        comparePassword: jest.fn().mockResolvedValue(true),
        save: jest.fn().mockResolvedValue(true)
    };

    // Mock JWT secret
    process.env.JWT_SECRET = 'ankit';

    describe('POST /register', () => {
        it('should register a new user successfully', async () => {
            User.findOne.mockResolvedValue(null);
            User.create.mockResolvedValue(mockUser);

            const response = await request(app)
                .post('/api/user/register')
                .send({
                    name: 'Test User',
                    email: 'test@example.com',
                    contact: '1234567890',
                    address: '123 Test St',
                    password: 'password123'
                });

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('User registered successfully');
            expect(response.body.token).toBeDefined();
            expect(response.body.user).toMatchObject({
                id: 1,
                name: 'Test User',
                email: 'test@example.com',
                contact: '1234567890',
                address: '123 Test St'
            });
            expect(User.create).toHaveBeenCalledWith({
                name: 'Test User',
                email: 'test@example.com',
                contact: '1234567890',
                address: '123 Test St',
                password: expect.any(String)
            });
        });

        // ... (keep other register tests as in the previous version)
    });

    describe('POST /login', () => {
        it('should login a user successfully', async () => {
            User.findOne.mockResolvedValue(mockUser);

            const response = await request(app)
                .post('/api/user/login')
                .send({
                    email: 'test@example.com',
                    password: 'password123'
                });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Login successful');
            expect(response.body.token).toBeDefined();
            expect(response.body.user).toMatchObject({
                id: 1,
                name: 'Test User',
                email: 'test@example.com',
                contact: '1234567890',
                address: '123 Test St'
            });
            expect(mockUser.comparePassword).toHaveBeenCalledWith('password123');
        });

        // ... (keep other login tests as in the previous version)
    });

    describe('GET /verify', () => {
        it('should verify a valid token', async () => {
            const token = jwt.sign({ id: mockUser.id }, process.env.JWT_SECRET);
            User.findByPk.mockResolvedValue(mockUser);

            const response = await request(app)
                .get('/api/user/verify')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body.valid).toBe(true);
            expect(response.body.user).toMatchObject({
                id: 1,
                name: 'Test User',
                email: 'test@example.com'
            });
        });

        // ... (keep other verify tests as in the previous version)
    });

    describe('POST /reset-password', () => {
        it('should reset password successfully', async () => {
            User.findOne.mockResolvedValue(mockUser);

            const response = await request(app)
                .post('/api/user/reset-password')
                .send({
                    email: 'test@example.com',
                    newPassword: 'newpassword123',
                    confirmPassword: 'newpassword123'
                });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Password reset successfully');
            expect(mockUser.save).toHaveBeenCalled();
        });

        // ... (keep other reset-password tests as in the previous version)
    });
});