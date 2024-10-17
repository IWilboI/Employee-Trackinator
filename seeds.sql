-- Seed departments
INSERT INTO department (name) VALUES ('Engineering'), ('Marketing'), ('Sales');

-- Seed roles
INSERT INTO role (title, salary, department_id) VALUES 
('Software Engineer', 80000, 1),
('Product Manager', 90000, 1),
('Marketing Specialist', 60000, 2),
('Sales Associate', 50000, 3);

-- Seed employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Sam', 'Brown', 3, 1),
('Sara', 'Jones', 4, 2);
