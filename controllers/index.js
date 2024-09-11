const { User } = require('../models');  // Importing User model
const { createUserPromt } = require('../views/prompts');  // Defines prompts shown to user
const inquirer = require('inquirer');

async function handleUserSelection ({ menuOption }) {
    switch (menuOption) {
        case 'Create User':
            await createUserPromt();
            break;
        case 'View Users':
            await viewUsers();
            break;
        case 'Exit':
            console.log('Goodbye!');
            process.exit();
            break;
        default:
            console.log("Invalid option.")
            break;
    }
}

async function createUser() {
    const { username, password } = await inquirer.prompt(createUserPrompt);
    try {
        const user = await User.create({ username, password });
        console.log(`User ${user.username} created successfully.`);
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

async function viewUsers() {
    try {
        const users = await User.findAll();
        console.log('Users:', users.map(user => user.username));
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

module.exports = { handleUserSelection };
