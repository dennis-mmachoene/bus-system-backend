const express = require('express');
const {
  getStudentDashboard,
  getNotifications
} = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router()

router.get('/dashboard', protect, getStudentDashboard);

router.get('/notifications', protect, getNotifications);

module.exports = router;
