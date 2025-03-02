const Order = require('../models/orderModel');
const Product = require('../models/productModel');

exports.createOrder = async (req, res) => {
    try {
        const { productId, name, address, contact, paymentMethod } = req.body;
        const userId = 1; // Mock userId for now

        if (!productId || !name || !address || !contact || !paymentMethod) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.stockQuantity < 1) {
            return res.status(400).json({ message: 'Product out of stock' });
        }

        const order = await Order.create({
            userId,
            productId,
            userName,
            Productname,
            address,
            contact,
            paymentMethod
        });

        // Optional: Reduce stock (future enhancement)
        // await product.update({ stockQuantity: product.stockQuantity - 1 });

        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Error placing order', error: error.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ message: 'userId is required' });
        }

        const orders = await Order.findAll({
            where: { userId },
            include: [{ model: Product }]
        });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const userId = 1; // Mock userId

        const order = await Order.findOne({ where: { id, userId } });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (status !== 'Received') {
            return res.status(400).json({ message: 'Invalid status update' });
        }

        await order.update({ status });
        res.status(200).json({ message: 'Order status updated to Received successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating order status', error: error.message });
    }
};