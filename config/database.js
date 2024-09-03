const { sequelize } = require('sequelize');  // This line imports the Sequelize class from the sequelize package

const sequelize = new Sequelize(process.env,BD_NAME, process.env.BD_USER, process.env.DB_PASSWORD,{  // Sets up connection to PostgreSQL database
    host: process.env.DB_HOST,
    dialect: 'postgres',
});

async function intitializeDataBase() {  // This is an asynchronous function that will be used to test the connection to the database and initialize it
    try {
        await sequelize.authenticate();  // This line attempts to connect to the database using the configuration provided earlier
        console.log('Database connection has been established successfully.'); // Logs success message on connection to database.

    } catch (error) {
        console.log('Unable to connect to database');  // Logs error message if connection fails
    }
}

module.exports = { sequelize, intitializeDataBase };  // Exports code to be used elsewhere.