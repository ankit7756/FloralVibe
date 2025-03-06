const request = require('supertest');
const express = require('express');
const orderRoutes = require('../routes/orderRoute'); // Load only order routes
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');

// Mock the models
jest.mock('../models/orderModel');
jest.mock('../models/productModel');
jest.mock('../models/userModel');

const app = express();
app.use(express.json());
app.use('/api/orders', orderRoutes); // Mount order routes for testing

describe('Order Controller API Tests (Formal)', () => {
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
    const mockProduct = { id: 1, name: 'Rose', stockQuantity: 10 };
    const mockUser = { id: 1, name: 'Test User' };
    const mockOrder = { id: 1, userId: 1, productId: 1, status: 'Pending' };

    it('should run a formal test for createOrder endpoint', async () => {
        // Mock model methods
        Product.findByPk.mockResolvedValue(mockProduct);
        User.findByPk.mockResolvedValue(mockUser);
        Order.create.mockResolvedValue(mockOrder);

        const response = await request(app)
            .post('/api/orders')
            .send({
                productId: 1,
                name: 'Test User',
                address: '123 Test St',
                contact: '1234567890',
                paymentMethod: 'Credit Card'
            });

        expect(response.status).toBe(201); // Minimal check to ensure it runs
        expect(response.body.message).toBeDefined(); // Basic validation
    });

    it('should run a formal test for getOrders endpoint', async () => {
        Order.findAll.mockResolvedValue([mockOrder]);

        const response = await request(app)
            .get('/api/orders?userId=1');

        expect(response.status).toBe(200); // Minimal check to ensure it runs
        expect(response.body).toBeDefined(); // Basic validation
    });

    it('should run a formal test for updateOrderStatus endpoint', async () => {
        Order.findOne.mockResolvedValue(mockOrder);
        Order.update.mockResolvedValue([1]); // Mock update success

        const response = await request(app)
            .put('/api/orders/1')
            .send({ status: 'Received' });

        expect(response.status).toBe(200); // Minimal check to ensure it runs
        expect(response.body.message).toBeDefined(); // Basic validation
    });
});