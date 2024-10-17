Employee Tracker
Description
Employee Tracker is a command-line application designed to help businesses manage their departments, roles, and employees. With this tool, users can view, add, and update information about employees, roles, and departments in a PostgreSQL database. This application provides a simple interface for managing employee data and maintaining organizational structure.

Table of Contents
Installation
Usage
Database Schema
Commands
Technologies
License
Questions
Installation
Clone the repository to your local machine:

bash
Copy code
git clone <repository-url>
cd employee-tracker
Install the necessary dependencies:

bash
Copy code
npm install
Make sure PostgreSQL is installed and running on your machine.

Create a PostgreSQL database:

bash
Copy code
psql -U postgres
CREATE DATABASE employee_tracker;
Set up the database schema:

bash
Copy code
psql -U postgres -d employee_tracker -f schema.sql
Seed the database with initial data:

bash
Copy code
psql -U postgres -d employee_tracker -f seeds.sql
Usage
Start the application:

bash
Copy code
node index.js
Follow the prompts to:

View all departments
View all roles
View all employees
Add a department
Add a role
Add an employee
Update an employee's role
Exit the application
Database Schema
Department: Stores information about departments.

id: Primary key
name: Name of the department
Role: Stores roles within the organization.

id: Primary key
title: Role title
salary: Salary for the role
department_id: Foreign key referencing the department
Employee: Stores employee data.

id: Primary key
first_name: Employee's first name
last_name: Employee's last name
role_id: Foreign key referencing the role
manager_id: Foreign key referencing another employee (optional manager)
Commands
Create Database Schema:

bash
Copy code
psql -U postgres -d employee_tracker -f schema.sql
Seed Database:

bash
Copy code
psql -U postgres -d employee_tracker -f seeds.sql
Run the Application:

bash
Copy code
node index.js
Technologies
Node.js
PostgreSQL
Inquirer.js
JavaScript
License
This project is licensed under the MIT License.
