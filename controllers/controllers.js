const { Department, Role, Employee } = require('../models');  // Import Sequelize models
const inquirer = require('inquirer');
const { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./controllers');

async function handleUserSelection(answer) {
    switch (answer.action) {
        case 'View all departments':
            await viewAllDepartments();
            break;
        case 'View all roles':
            await viewAllRoles();
            break;
        case 'View all employees':
            await viewAllEmployees();
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
            console.log('Exiting...');
            process.exit();
            break;
        default:
            console.log('Invalid option');
            break;
    }
}

async function viewAllDepartments() {
    const departments = await Department.findAll();
    console.table(departments.map(dept => ({
        'Department ID': dept.id,
        'Department Name': dept.name
    })));
}

async function viewAllRoles() {
    const roles = await Role.findAll({ include: Department });
    console.table(roles.map(role => ({
        'Role ID': role.id,
        'Title': role.title,
        'Department': role.Department.name,
        'Salary': role.salary
    })));
}

async function viewAllEmployees() {
    const employees = await Employee.findAll({ include: [Role, Department] });
    console.table(employees.map(emp => ({
        'Employee ID': emp.id,
        'First Name': emp.firstName,
        'Last Name': emp.lastName,
        'Title': emp.Role.title,
        'Department': emp.Department.name,
        'Salary': emp.Role.salary,
        'Manager': emp.managerId ? `Manager ID: ${emp.managerId}` : 'None'
    })));
}

async function addDepartment() {
    const { name } = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter the new department name:'
    });
    await Department.create({ name });
    console.log('Department added successfully.');
}

async function addRole() {
    const { title, salary, departmentId } = await inquirer.prompt([
        { type: 'input', name: 'title', message: 'Enter the role title:' },
        { type: 'input', name: 'salary', message: 'Enter the salary for this role:' },
        { type: 'input', name: 'departmentId', message: 'Enter the department ID:' }
    ]);
    await Role.create({ title, salary, departmentId });
    console.log('Role added successfully.');
}

async function addEmployee() {
    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        { type: 'input', name: 'firstName', message: 'Enter the employee\'s first name:' },
        { type: 'input', name: 'lastName', message: 'Enter the employee\'s last name:' },
        { type: 'input', name: 'roleId', message: 'Enter the role ID:' },
        { type: 'input', name: 'managerId', message: 'Enter the manager ID (if any):' }
    ]);
    await Employee.create({ firstName, lastName, roleId, managerId });
    console.log('Employee added successfully.');
}

async function updateEmployeeRole() {
    const employees = await Employee.findAll();
    const { employeeId, newRoleId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Select the employee to update:',
            choices: employees.map(emp => ({ name: `${emp.firstName} ${emp.lastName}`, value: emp.id }))
        },
        { type: 'input', name: 'newRoleId', message: 'Enter the new role ID:' }
    ]);
    await Employee.update({ roleId: newRoleId }, { where: { id: employeeId } });
    console.log('Employee role updated successfully.');
}

module.exports = { handleUserSelection };
