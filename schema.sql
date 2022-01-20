DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    departmentId INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (departmentId) REFERENCES department(id) ON DELETE CASCADE 
);

CREATE TABLE employee (
        id INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    roleId INT NOT NULL,
    managerId INT,
    PRIMARY KEY (id),
    FOREIGN KEY (roleId) REFERENCES role(id) ON DELETE CASCADE,
    FOREIGN KEY (managerId) REFERENCES employee(id) ON DELETE CASCADE
);

INSERT INTO department (name)
VALUE ("CX");
INSERT INTO department (name)
VALUE ("DX");
INSERT INTO department (name)
VALUE ("Design");
INSERT INTO department (name)
VALUE ("SHS");

INSERT INTO role (title, salary, department_id)
VALUE ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Patient Experience", 35000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Visual Designer", 120000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("CX Coach", 80000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Project Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Marketing Lead", 70000, 4);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Amber", "Kosta", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jennifer", "Solas", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jessie","Thompson",null,3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Dallas", "Johnson", 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Sarah", "Maskill", 4, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jackson", "Michaels", 1, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("John", "Smith", 2, 7);


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
