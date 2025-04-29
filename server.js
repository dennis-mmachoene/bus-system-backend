const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize, connectDB } = require('./config/db');
const User = require('./models/User');
const Notification = require('./models/Notifications');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes'); 
const studentRoutes = require('./routes/studentRoutes');
app.use('/api/auth', authRoutes);                  
app.use('/api/student', studentRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Smart Rides API is running');
});

// Start server
const startServer = async () => {
  try {
    await connectDB();
    await sequelize.sync({ alter: true }); // Safely sync models

    // OPTIONAL: Create a notification for user_id = 1
    const user = await User.findByPk(1);
    if (user) {
      await Notification.create({
        user_id: user.user_id, // make sure user_id is the correct PK
        message: 'Your next ride is scheduled!',
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours later
      });
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error('❌ Failed to start server:', err);
  }
};

startServer();
