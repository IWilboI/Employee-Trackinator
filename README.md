## Employee Tracker ##
Description
Employee Tracker is a command-line application designed to help businesses manage their departments, roles, and employees. With this tool, users can view, add, and update information about employees, roles, and departments in a PostgreSQL database. This application provides a simple interface for managing employee data and maintaining organizational structure.

#Table of Contents#

Installation

Usage

Database Schema

Commands

Technologies

License

Questions

Installation





#Clone the repository to your local machine:#

git clone <repository-url>
cd employee-tracker





#Install the necessary dependencies:#

npm install
Make sure PostgreSQL is installed and running on your machine.





#Create a PostgreSQL database:#

psql -U postgres
CREATE DATABASE employee_tracker;





#Set up the database schema:#

psql -U postgres -d employee_tracker -f schema.sql




#Seed the database with initial data:#

psql -U postgres -d employee_tracker -f seeds.sql




##Usage##
#Start the application:#

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





##Commands##
#Create Database Schema:#

psql -U postgres -d employee_tracker -f schema.sql

#Seed Database:#

psql -U postgres -d employee_tracker -f seeds.sql

#Run the Application:#

node index.js
Technologies
Node.js
PostgreSQL
Inquirer.js
JavaScript
License
This project is licensed under the MIT License.
