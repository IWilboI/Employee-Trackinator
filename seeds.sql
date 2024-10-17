INSERT INTO department (name) VALUES 
('Engineering'), 
('Sales'), 
('Marketing');

INSERT INTO role (title, salary, department_id) VALUES 
('Software Engineer', 90000, 1), 
('Sales Manager', 85000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('Alice', 'Johnson', 1, NULL), 
('Bob', 'Smith', 2, 1);
