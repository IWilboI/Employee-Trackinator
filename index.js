const inquirer = require('inquirer');
const db = require('./db/connection');

const mainMenu = async () => {
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
      'Exit'
    ]
  });

  switch (action) {
    case 'View all departments':
      viewDepartments();
      break;
    case 'View all roles':
      viewRoles();
      break;
    case 'View all employees':
      viewEmployees();
      break;
    case 'Add a department':
      addDepartment();
      break;
    case 'Add a role':
      addRole();
      break;
    case 'Add an employee':
      addEmployee();
      break;
    case 'Update an employee role':
      updateEmployeeRole();
      break;
    case 'Exit':
      db.end();
      break;
  }
};

const viewDepartments = async () => {
  const res = await db.query('SELECT * FROM department');
  console.table(res.rows);
  mainMenu();
};

const viewRoles = async () => {
  const res = await db.query(`
    SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    JOIN department ON role.department_id = department.id
  `);
  console.table(res.rows);
  mainMenu();
};

const viewEmployees = async () => {
  const res = await db.query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title, 
           department.name AS department, role.salary, employee.manager_id
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
  `);
  console.table(res.rows);
  mainMenu();
};

const addDepartment = async () => {
  const { name } = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'What is the name of the department?'
  });
  await db.query('INSERT INTO department (name) VALUES ($1)', [name]);
  console.log(`Added department: ${name}`);
  mainMenu();
};

const addRole = async () => {
  const departments = await db.query('SELECT * FROM department');
  const { title, salary, departmentId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of the role?'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary of the role?'
    },
    {
      type: 'list',
      name: 'departmentId',
      message: 'Which department does this role belong to?',
      choices: departments.rows.map(dept => ({ name: dept.name, value: dept.id }))
    }
  ]);
  
  await db.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
  console.log(`Added role: ${title}`);
  mainMenu();
};

const addEmployee = async () => {
  const roles = await db.query('SELECT * FROM role');
  const employees = await db.query('SELECT * FROM employee');
  
  const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'What is the employee’s first name?'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'What is the employee’s last name?'
    },
    {
      type: 'list',
      name: 'roleId',
      message: 'What is the employee’s role?',
      choices: roles.rows.map(role => ({ name: role.title, value: role.id }))
    },
    {
      type: 'list',
      name: 'managerId',
      message: 'Who is the employee’s manager?',
      choices: [
        ...employees.rows.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id })),
        { name: 'None', value: null }
      ]
    }
  ]);
  
  await db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerId]);
  console.log(`Added employee: ${firstName} ${lastName}`);
  mainMenu();
};

const updateEmployeeRole = async () => {
  const employees = await db.query('SELECT * FROM employee');
  const roles = await db.query('SELECT * FROM role');
  
  const { employeeId, roleId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'Which employee’s role do you want to update?',
      choices: employees.rows.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
    },
    {
      type: 'list',
      name: 'roleId',
      message: 'Which role do you want to assign the selected employee?',
      choices: roles.rows.map(role => ({ name: role.title, value: role.id }))
    }
  ]);

  await db.query('UPDATE employee SET role_id = $1 WHERE id = $2', [roleId, employeeId]);
  console.log(`Updated employee’s role`);
  mainMenu();
};

// Start the application
mainMenu();
