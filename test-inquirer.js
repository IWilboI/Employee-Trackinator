const inquirer = require('inquirer');

const questions = [
    {
        type: 'input',
        name: 'testInput',
        message: 'Enter something:',
    }
];

inquirer.prompt(questions)
    .then(answers => {
        console.log('Your input:', answers.testInput);
    })
    .catch(error => {
        console.error('Error:', error);
    });
