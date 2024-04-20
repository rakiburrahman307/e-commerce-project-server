const jwt = require('jsonwebtoken');
const { User } = require('../models');
const JWT_SECRET = process.env.jWT_SECRET;
const authMiddleware = async (req, res, next) => {
  try {
    // Extract token from request cookies
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
    
    req.user = user;
    next(); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = authMiddleware;
