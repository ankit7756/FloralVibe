// const express = require('express');
// const router = express.Router();
// const adminController = require('../controllers/adminController');

// router.post('/products', adminController.addProduct);
// router.get('/products', adminController.getProducts);

// module.exports = router;

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/products', adminController.addProduct);
router.get('/products', adminController.getProducts);
router.get('/products/:id', adminController.getProductById);

module.exports = router;