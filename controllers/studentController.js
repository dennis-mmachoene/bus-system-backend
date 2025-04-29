const Notification = require('../models/Notifications');


// Get student dashboard
exports.getStudentDashboard = async (req, res) => {
  try {
    const user = req.user;

    if (user.role !== 'student') {
      return res.status(403).json({ message: 'Access denied: not a student' });
    }

    res.status(200).json({
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      dashboard: {
        message: `Welcome to your dashboard, ${user.name}!`,
        tips: [
          'You can check notifications, reservations, and live location.',
          'Stay updated with real-time ride information!',
        ]
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get notifications for the student
exports.getNotifications = async (req, res) => {
  try {
    const user = req.user;

    // Fetch notifications for the student
    const notifications = await Notification.findAll({
      where: { user_id: user.user_id },
      order: [['sent_at', 'DESC']]  // Sort by sent date
    });

    if (!notifications.length) {
      return res.status(404).json({ message: 'No notifications found' });
    }

    res.status(200).json({ notifications });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};