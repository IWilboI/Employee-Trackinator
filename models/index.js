const { Sequelize, DataTypes } = require('sequelize');  // This imports the Sequelize class and DataTypes from the sequelize package
const { sequelize } = require('../config/database');  // This imports the sequelize instance from your database configuration file (../config/database).

const User = sequelize.define('User', {  // This defines a new model named User
    username: {  // Defines User Name characteristics.
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {  // Defines password characteristics.
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = { User }; // Exports code to be used elsewhere.