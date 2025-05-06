const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// ✅ Only admins can register new users
router.post('/admin/register', protect, authorizeRoles('admin'), registerUser);

// ✅ Public login route for all users
router.post('/login', loginUser);

module.exports = router;
