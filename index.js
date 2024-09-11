require('dotenv').config();  // Load environment variables
const inquirer = require('inquirer');  // Import inquirer for prompts
const { initializeDatabase } = require('./config/database');  // Correct import of initializeDatabase
const { mainMenu } = require('./views/prompts');  // Import main menu prompts
const { handleUserSelection } = require('./controllers');  // Import controller

(async function startApp() {  // IIFE to start the app
    await initializeDatabase();  // Initialize the database

    // Display the main menu and wait for user's selection
    const answer = await inquirer.prompt(mainMenu);  
    await handleUserSelection(answer);  // Handle the user's selection
})();
