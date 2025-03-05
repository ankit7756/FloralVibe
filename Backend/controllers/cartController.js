const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');

exports.addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id; // Get userId from the authenticated user


        // Check if product exists
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check stock
        if (product.stockQuantity < 1) {
            return res.status(400).json({ message: 'Product out of stock' });
        }

        const user = await User.findByPk(userId); // Fetch user instance
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if already in cart
        const existingCartItem = await Cart.findOne({ where: { userId, productId } });
        if (existingCartItem) {
            return res.status(400).json({ message: 'Product already in cart' });
        }

        // Add to cart
        const cartItem = await Cart.create({
            userId,
            productId,
            userName: user.name, // Fetch user's name
            productName: product.name,
            quantity: 1
        });

        res.status(201).json({ message: 'Product added to cart', cartItem });
    } catch (error) {
        res.status(500).json({ message: 'Error adding to cart', error: error.message });
    }
};

exports.getCart = async (req, res) => {
    try {
        // // const userId = req.query.userId || 1; // Get from query params or default to 1
        // const { userId } = req.query; // Get userId from query parameter
        // if (!userId) {
        //     return res.status(400).json({ message: 'userId is required' });
        // }
        const userId = req.user.id; // Get from authenticated user

        const cartItems = await Cart.findAll({
            where: { userId },
            include: [{ model: Product }]
        });

        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart', error: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        // const { id } = req.params; // Cart item ID
        // const userId = 1; // Mock userId
        const { id } = req.params; // Cart item ID
        const userId = req.user.id; // Get from authenticated user


        const cartItem = await Cart.findOne({ where: { id, userId } });
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        await cartItem.destroy();
        res.status(200).json({ message: 'Product removed from cart' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing from cart', error: error.message });
    }
};