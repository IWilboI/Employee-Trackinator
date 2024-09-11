const mainMenu = [
    {
        type: 'list',
        name: 'option',
        message: 'Please choose an option:',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]
    }
];

const createUserPromt = [  // This is an array containing two objects, each defining a prompt for gathering user input when creating a new use
    {
        type: 'input',
        name: 'username',
        message: 'Enter username:',
    },
    {
        type: 'password',
        name: 'password',
        message: 'Enter password:',
    },
];

module.exports = { mainMenu, createUserPromt };  // Exports code to be used elsewhere.