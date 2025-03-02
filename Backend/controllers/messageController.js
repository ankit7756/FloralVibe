const Message = require('../models/messageModel');

exports.submitMessage = async (req, res) => {
    try {
        const { userName, email, message } = req.body;
        const userId = req.body.userId || 1; // Mock userId or from auth later

        if (!userName || !email || !message) {
            return res.status(400).json({ message: 'userName, email, and message are required' });
        }

        const newMessage = await Message.create({
            userId,
            userName,
            email,
            message
        });

        res.status(201).json({ message: 'Message sent successfully', newMessage });
    } catch (error) {
        res.status(500).json({ message: 'Error sending message', error: error.message });
    }
};