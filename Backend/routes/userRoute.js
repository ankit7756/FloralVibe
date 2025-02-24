const express = require('express');
const router = express.Router();
const { register, login, verifyToken } = require('../controllers/userController');
const authUser = require('../middleware/authUser');

router.post('/register', register);
router.post('/login', login);
router.get('/verify', authUser, verifyToken);

module.exports = router;