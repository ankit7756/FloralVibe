const express = require('express');
const router = express.Router();
const { register, login, verifyToken, resetPassword } = require('../controllers/userController');
const authUser = require('../middleware/authUser');

router.post('/register', register);
router.post('/login', login);
router.get('/verify', authUser, verifyToken);
router.post('/reset-password', resetPassword);

module.exports = router;