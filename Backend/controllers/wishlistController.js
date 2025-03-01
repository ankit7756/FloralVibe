const Wishlist = require('../models/wishlistModel');
const Product = require('../models/productModel');

exports.addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = 1; // Mock userId for now

        if (!productId) {
            return res.status(400).json({ message: 'productId is required' });
        }

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const existingWishlistItem = await Wishlist.findOne({ where: { userId, productId } });
        if (existingWishlistItem) {
            return res.status(400).json({ message: 'Product already in wishlist' });
        }

        const wishlistItem = await Wishlist.create({
            userId,
            productId
        });

        res.status(201).json({ message: 'Product added to wishlist', wishlistItem });
    } catch (error) {
        res.status(500).json({ message: 'Error adding to wishlist', error: error.message });
    }
};

exports.getWishlist = async (req, res) => {
    try {
        const userId = 1; // Mock userId for now
        const wishlistItems = await Wishlist.findAll({
            where: { userId },
            include: [{ model: Product }]
        });
        res.status(200).json(wishlistItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching wishlist', error: error.message });
    }
};

exports.removeFromWishlist = async (req, res) => {
    try {
        const { id } = req.params; // Wishlist item ID
        const userId = 1; // Mock userId

        const wishlistItem = await Wishlist.findOne({ where: { id, userId } });
        if (!wishlistItem) {
            return res.status(404).json({ message: 'Wishlist item not found' });
        }

        await wishlistItem.destroy();
        res.status(200).json({ message: 'Product removed from wishlist' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing from wishlist', error: error.message });
    }
};