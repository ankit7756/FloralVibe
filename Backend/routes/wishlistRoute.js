const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const verifyToken = require('../middleware/authUser');

router.post('/wishlist', verifyToken, wishlistController.addToWishlist);
router.get('/wishlist', verifyToken, wishlistController.getWishlist);
router.delete('/wishlist/:id', verifyToken, wishlistController.removeFromWishlist);

module.exports = router;