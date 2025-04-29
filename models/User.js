const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Notification = require('./Notifications');

const User = sequelize.define('User', {
  user_id: {                             // 👈 Define user_id explicitly
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('student', 'driver', 'admin'),
    defaultValue: 'student',
  },
  licenceNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isRequiredForDrivers(value) {
        if (this.role === 'driver' && !value) {
          throw new Error('Licence number is required for drivers');
        }
      }
    }
  },
  adminLevel: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    validate: {
      min: 1,
      max: 3,
      isRequiredForAdmins(value) {
        if (this.role === 'admin' && !value) {
          throw new Error('Admin level is required for admins');
        }
      }
    }
  }
}, {
  tableName: 'users',
  timestamps: false
});

// Associations
User.hasMany(Notification, { foreignKey: 'user_id', as: 'notifications' });
Notification.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = User;
