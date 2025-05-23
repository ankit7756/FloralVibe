const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController'); //

router.post('/orders', orderController.createOrder);
router.get('/orders', orderController.getOrders);
router.put('/orders/:id', orderController.updateOrderStatus);

module.exports = router;