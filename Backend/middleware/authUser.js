const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers.authorization;

    if (!bearerHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use process.env.JWT_SECRET in production
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = verifyToken;