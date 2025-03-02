const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/products/:id', reviewController.getProductForReview); 
router.post('/reviews', reviewController.submitReview);

module.exports = router;