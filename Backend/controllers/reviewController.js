const Review = require('../models/reviewModel');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const User = require('../models/userModel');

exports.getProductForReview = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};

exports.submitReview = async (req, res) => {
    try {
        const { productId, rating, message } = req.body;
        const userId = 1; // Mock userId for now

        if (!productId || !rating || !message) {
            return res.status(400).json({ message: 'productId, rating, and message are required' });
        }

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const user = await User.findByPk(userId); // Fetch user instance
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if a review already exists for this product by this user
        const existingReview = await Review.findOne({ where: { userId, productId } });
        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this product' });
        }

        // Create the review
        const review = await Review.create({
            userId,
            productId,
            userName: user.name,
            productName: product.name,
            rating,
            message
        });

        // Update the corresponding order's reviewed status
        const order = await Order.findOne({ where: { userId, productId } });
        if (order) {
            await order.update({ reviewed: true });
        }

        res.status(201).json({ message: 'Review submitted successfully', review });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting review', error: error.message });
    }
};