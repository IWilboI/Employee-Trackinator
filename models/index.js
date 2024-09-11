const { sequelize } = require('../config/database');  // Import the sequelize instance from your database configuration file
const { DataTypes } = require('sequelize');  // Only import DataTypes

// Define a new model named User
const User = sequelize.define('User', {
    username: {  // Defines User Name characteristics
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {  // Defines password characteristics
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = { User };  // Export the User model
