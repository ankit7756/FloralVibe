const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/products/:id', reviewController.getProductForReview); // Reuse for review page
router.post('/reviews', reviewController.submitReview);

module.exports = router;