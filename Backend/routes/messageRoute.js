const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/messages', messageController.submitMessage);

module.exports = router;