const jwt= require('jsonwebtoken');
// check if token is blacklisted or not
const tokenBlacklist = require('../models/blacklist.models.js');
 async function authMiddleware(req, res, next) {
    // Get the token from cookies
    const token = req.cookies.token;
// If no token is found, return an error
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Check if token is blacklisted
    const blacklistedToken = await tokenBlacklist.findOne({ token });
    if (blacklistedToken) {
        return res.status(401).json({ message: 'Token is invalid' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // we create a new property on the request object to store the decoded user information
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports =authMiddleware;