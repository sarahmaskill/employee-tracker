const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require('console.table');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: '',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);
// Start the application 
db.connect((err) => {
    if (err) throw err;
    console.log("Welcome to the Employee Tracker");
    startApp()
});
//main menu
function startApp() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "Select an action below",
        choices: [
            "View All Roles",
            "View All Employees",
            "View All Departments",
            "Add a Role",
            "Add an Employee",
            "Add a Department",
            "Update an Employee Role"
        ]
    })
        .then((response) => {
            switch (response.action) {
                case "View All Roles":
                    viewAllRoles();
                    break;
                case "View All Employees":
                    viewAllEmployees();
                    break;
                case "View All Departments":
                    viewAllDepartments();
                    break;
                case "Add a Role":
                    addRole();
                    break;
                case "Add an Employee":
                    addEmployee();
                    break;
                case "Add a Deparment":
                    addDepartment();
                    break;
                case "Update an Employee Role":
                    updateEmployeeRole();
                    break;

            }
        })
}

function viewAllRoles() {
    var query = 'SELECT * FROM role';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table('All Roles:', res);
        startApp();
    })
};

function viewAllEmployees() {
    var query = 'SELECT * FROM employee';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table('All Employees:', res);
        startApp();
    })
};

function viewAllDepartments() {
    var query = 'SELECT * FROM department';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table('All departments:', res);
        startApp();
    })
};
function addRole() {
    startApp();
};
function addEmployee() {
    startApp();
};
function addDepartment() {
    startApp();
};
function updateEmployeeRole() {
    startApp();
};