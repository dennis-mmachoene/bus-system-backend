const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Fix: Use user.user_id instead of user.id for consistency
const generateToken = (user) => {
  return jwt.sign(
    { id: user.user_id, role: user.role }, // Fix: Use `user.user_id`
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );
};

exports.registerUser = async (req, res) => {
  const { name, email, password, role, licenceNumber, adminLevel } = req.body;

  try {
    // Only admin can register users
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Only admins can register users' });
    }

    // Check if user already exists
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    // Hash the password before saving
    const hashed = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password: hashed,
      role,
      licenceNumber: role === 'driver' ? licenceNumber : null,
      adminLevel: role === 'admin' ? adminLevel : null,
    });

    // Respond with the new user's info, excluding password
    res.status(201).json({
      message: 'Registered successfully',
      user: {
        user_id: newUser.user_id,  // Fix: use `user_id`
        name: newUser.name,
        role: newUser.role,
        adminLevel: newUser.adminLevel,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate the token
    const token = generateToken(user);

    // Send the response with the token and user info
    res.status(200).json({
      token,
      user: {
        user_id: user.user_id, // Fix: use `user_id` here as well
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
