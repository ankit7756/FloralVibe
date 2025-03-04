const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Message = require('../models/messageModel');
const Review = require('../models/reviewModel');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { Readable } = require('stream');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadFromBuffer = (buffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'flower-shop' },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );

        const readableStream = new Readable({
            read() {
                this.push(buffer);
                this.push(null);
            }
        });

        readableStream.pipe(uploadStream);
    });
};

exports.addProduct = [
    upload.single('productImage'),
    async (req, res) => {
        try {
            const { name, description, price, category, stockQuantity } = req.body;

            if (!req.file) {
                return res.status(400).json({ message: 'No image file provided' });
            }

            const result = await uploadFromBuffer(req.file.buffer);
            const imageUrl = result.secure_url;

            const product = await Product.create({
                name,
                description,
                price: parseFloat(price),
                image: imageUrl,
                category,
                stockQuantity: parseInt(stockQuantity)
            });

            res.status(201).json({ message: 'Product added successfully', product });
        } catch (error) {
            console.error('Error adding product:', error);
            res.status(500).json({ message: 'Error adding product', error: error.message });
        }
    }
];

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

exports.getProductById = async (req, res) => {
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

exports.getDashboardStats = async (req, res) => {
    try {
        const { Op } = require('sequelize'); // Ensure Op is available
        // Total Sales: Sum of product prices from all orders
        const totalSales = await Order.findAll({
            include: [{ model: Product, attributes: ['price'] }]
        });
        const sales = totalSales.reduce((sum, order) => sum + parseFloat(order.Product.price || 0), 0);

        // Total Orders: Count of orders
        const totalOrders = await Order.count();

        // Active Users: Count of users (assuming all registered users are active)
        const activeUsers = await User.count();

        // Total Products: Count of products
        const totalProducts = await Product.count();

        res.status(200).json({
            totalSales: sales.toFixed(2),
            totalOrders,
            activeUsers,
            totalProducts
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
    }
};

exports.getRecentOrders = async (req, res) => {
    try {
        const recentOrders = await Order.findAll({
            include: [{
                model: Product,
                attributes: ['image', 'price']
            }],
            attributes: ['id', 'status', 'userName', 'orderDate'],
            order: [['orderDate', 'DESC']],
            limit: 4
        });

        res.status(200).json(recentOrders);
    } catch (error) {
        console.error('Error fetching recent orders:', error);
        res.status(500).json({ message: 'Error fetching recent orders', error: error.message });
    }
};

exports.getRecentProducts = async (req, res) => {
    try {
        const recentProducts = await Product.findAll({
            order: [['createdAt', 'DESC']],
            limit: 4
        });
        res.status(200).json(recentProducts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recent products', error: error.message });
    }
};

exports.updateProduct = [
    upload.single('newProductImage'),
    async (req, res) => {
        try {
            const { id } = req.params;
            const { name, price, stockQuantity, category } = req.body;

            const product = await Product.findByPk(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            product.name = name || product.name;
            product.price = parseFloat(price) || product.price;
            product.stockQuantity = parseInt(stockQuantity) || product.stockQuantity;
            product.category = category || product.category;

            if (req.file) {
                const result = await uploadFromBuffer(req.file.buffer);
                product.image = result.secure_url;
            }

            await product.save();
            res.status(200).json({ message: 'Product updated successfully', product });
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).json({ message: 'Error updating product', error: error.message });
        }
    }
];

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const relatedOrders = await Order.count({ where: { productId: id } });
        if (relatedOrders > 0) {
            return res.status(400).json({ message: 'Cannot delete product with existing orders' });
        }

        await product.destroy();
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.findAll({
            order: [['createdAt', 'DESC']],
            limit: 4
        });
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Error fetching messages', error: error.message });
    }
};

exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll({
            include: [{ model: Product, attributes: ['image', 'name'] }],
            attributes: ['userName', 'rating', 'message', 'createdAt'],
            order: [['createdAt', 'DESC']],
            limit: 4
        });
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
};