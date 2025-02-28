const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { name, email, contact, address, password } = req.body;

        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            contact,
            address,
            password
        });

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                contact: user.contact,
                address: user.address
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                contact: user.contact,
                address: user.address
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

const verifyToken = async (req, res) => {
    try {
        // If middleware passed, token is valid
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(401).json({ valid: false, message: 'User not found' });
        }

        res.json({
            valid: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(401).json({ valid: false, message: 'Invalid token' });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { email, newPassword, confirmPassword } = req.body;

        // Check if passwords match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Hash the new password before saving
        const bcrypt = require('bcryptjs');
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        // Save the updated user
        await user.save();

        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Error resetting password', error: error.message });
    }
};

// Update the exports
module.exports = { register, login, verifyToken, resetPassword };

// module.exports = { register, login, verifyToken };