const { Sequelize } = require('sequelize');  // Import Sequelize

// Setup connection to PostgreSQL database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
});

// Asynchronous function to initialize the database
async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.log('Unable to connect to the database:', error);
    }
}

module.exports = { sequelize, initializeDatabase };  // Export the function and sequelize
