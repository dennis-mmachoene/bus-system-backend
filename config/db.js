// /config/db.js
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,       // smart_rides_db
  process.env.DB_USER,       // root
  process.env.DB_PASSWORD,   // root
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false, // Set to true if you want SQL logs
  }
);

// Test connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
};

module.exports = { sequelize, connectDB };
