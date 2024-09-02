require('dotenv').config();  // This line loads environment variables from a '.env' file into 'process.env'
const inquirer = require('inquirer');  // This imports the inquirer library, which is used to create interactive command-line prompts.
const { intitializeDataBase } = require('./config/database');  // This function is responsible for setting up a connection to your database.
const { mainMenu } = require('./views/promt');  // This imports an object or an array named 'mainMenu' from the 'prompts.js' file located in the views directory. 'mainMenu' contains the questions or choices that are presented when a user start the application.
const { handleUserSelection } = require('./controllers')  // This function is responsible for handling whatever option the user selects from the mainMenu prompt.

(async function startApp(){ // This is an Immediately Invoked Function Expression (IIFE) that runs as soon as the code is executed. The async keyword indicates that the function contains asynchronous operations, which means that await can be used inside it to wait for promises to resolve.
    await intitializeDataBase();  // This line calls the initializeDatabase function and waits for it to complete before moving on to the next line
    const asnwer = await inquirer.createPromptModule(mainMenu);  // This line calls inquirer.prompt() with mainMenu as the argument, which will display the prompt(s) defined in mainMenu to the user
    await handleUserSelection(asnwer);  // This line passes the user's selection (stored in answer) to the handleUserSelection function, which will execute the appropriate logic based on what the user chose.
})();