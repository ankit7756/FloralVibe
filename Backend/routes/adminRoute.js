const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/stats', adminController.getDashboardStats);
router.get('/orders', adminController.getRecentOrders);
router.get('/products', adminController.getRecentProducts);
router.put('/products/:id', adminController.updateProduct);
router.delete('/products/:id', adminController.deleteProduct);
router.get('/messages', adminController.getMessages);
router.get('/reviews', adminController.getReviews);

module.exports = router;