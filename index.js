const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const pg = require('pg');

const pool = new pg.Pool({
    user: 'postgres', // replace with your username
    host: 'localhost',
    database: 'Employee-Trackinator', // replace with your database name
    password: 'Awesome1!', // replace with your password
    port: 5432,
});

const query = util.promisify(pool.query).bind(pool);

async function viewDepartments() {
    const res = await query('SELECT * FROM department');
    console.table(res.rows);
}

async function viewRoles() {
    const res = await query('SELECT * FROM role');
    console.table(res.rows);
}

async function viewEmployees() {
    const res = await query(`
        SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    `);
    console.table(res.rows);
}

async function addDepartment() {
    const { name } = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'What is the name of the department?',
    });
    await query('INSERT INTO department (name) VALUES ($1)', [name]);
    console.log(`Department ${name} added.`);
}

async function addRole() {
    const { title, salary, department_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for the role?',
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What is the department ID for the role?',
        },
    ]);
    await query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
    console.log(`Role ${title} added.`);
}

async function addEmployee() {
    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employee’s first name?',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employee’s last name?',
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the employee’s role ID?',
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'What is the employee’s manager ID (or leave blank if none)?',
        },
    ]);
    await query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id || null]);
    console.log(`Employee ${first_name} ${last_name} added.`);
}

async function updateEmployeeRole() {
    const { id, role_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter the employee ID to update:',
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the new role ID for this employee:',
        },
    ]);
    await query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, id]);
    console.log(`Employee ID ${id} updated with role ID ${role_id}.`);
}

async function mainMenu() {
    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit',
        ],
    });

    switch (action) {
        case 'View all departments':
            await viewDepartments();
            break;
        case 'View all roles':
            await viewRoles();
            break;
        case 'View all employees':
            await viewEmployees();
            break;
        case 'Add a department':
            await addDepartment();
            break;
        case 'Add a role':
            await addRole();
            break;
        case 'Add an employee':
            await addEmployee();
            break;
        case 'Update an employee role':
            await updateEmployeeRole();
            break;
        case 'Exit':
            await pool.end();
            console.log('Goodbye!');
            return;
    }
    mainMenu();
}

mainMenu().catch(err => {
    console.error(err);
    pool.end();
});
