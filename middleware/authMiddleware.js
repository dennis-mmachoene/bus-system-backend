const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust path if needed

// Middleware to protect routes and attach full user to req.user
exports.protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Fetch full user from DB using decoded.id
    const user = await User.findByPk(decoded.id); // Make sure decoded.id === user_id
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user; // Now has user_id, email, role, etc.
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Middleware to restrict access based on roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Access denied for ${req.user.role}` });
    }
    next();
  };
};
