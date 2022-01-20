const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require('console.table');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        port: 3306,
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
    console.log("🆆 🅴 🅻 🅲 🅾 🅼 🅴   🆃 🅾   🆃 🅷 🅴   🅴 🅼 🅿 🅻 🅾 🆈 🅴 🅴   🆃 🆁 🅰 🅲 🅺 🅴 🆁");
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

            }
        })
}

function viewAllRoles() {
    let query = 'SELECT * FROM role';
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table('All Roles:', res);
        startApp();
    })
};

function viewAllEmployees() {
    let query = 'SELECT * FROM employee';
    db.query(query, function (err, res) {
        if (err) throw err;
        console.log(res.length + ' employees found');
        console.table('All Employees:', res);
        startApp();
    })
};

function viewAllDepartments() {
    let query = 'SELECT * FROM department';
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table('All departments:', res);
        startApp();
    })
};
function addRole() {
    db.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
    
        inquirer 
        .prompt([
            {
                name: 'newRole',
                type: 'input', 
                message: "What new role would you like to add?"
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of this role? Please enter an interger with no decimals'
            },
            {
                name: 'department',
                type: 'list',
                choices: function() {
                    var deptArry = [];
                    for (let i = 0; i < res.length; i++) {
                    deptArry.push(res[i].name);
                    }
                    return deptArry;
                },
            }
        ]).then(function (answer) {
            let departmentId;
            for (let a = 0; a < res.length; a++) {
                if (res[a].name == answer.department) {
                    departmentId = res[a].id;
                }
            }
    
            db.query(
                'INSERT INTO role SET ?',
                {
                    title: answer.newRole,
                    salary: answer.salary,
                    departmentId: departmentId
                },
                function (err, res) {
                    if(err)throw err;
                    console.log('Your new role has been added');
                    console.table('All Roles:', res);
                    startApp();
                })
        })
    })
};

function addEmployee() {
    db.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'firstName',
                    type: 'input', 
                    message: "What is the employee's first name? ",
                },
                {
                    name: 'lastName',
                    type: 'input', 
                    message: "What is the employee's last name? "
                },
                {
                    name: 'managerId',
                    type: 'input', 
                    message: "What is the employee's manager's ID? "
                },
                {
                    name: 'role', 
                    type: 'list',
                    choices: function() {
                    var roleArray = [];
                    for (let i = 0; i < res.length; i++) {
                        roleArray.push(res[i].title);
                    }
                    return roleArray;
                    },
                    message: "What is this employee's role? "
                }
                ]).then(function (answer) {
                    let roleId;
                    for (let a = 0; a < res.length; a++) {
                        if (res[a].title == answer.role) {
                            roleId = res[a].id;
                            console.log(role_id)
                        }                  
                    }  
                    db.query(
                    'INSERT INTO employee SET ?',
                    {
                        firstName: answer.firstName,
                        lastName: answer.lastName,
                        managerId: answer.managerId,
                        roleId: roleId,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log('Your employee has been added');
                        startApp();
                    })
                })
        })
};
function addDepartment() {
    db.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
    inquirer
    .prompt([
        {
            name: 'department', 
            type: 'input', 
            message: 'Which department would you like to add?'
        }
        ]).then
            db.query(
                'INSERT INTO department SET ?',
                {
                    name: answer.department
                },
            function (err) {
                if (err) throw err;
            console.log('Your department has been added');
            console.table('All Departments:', res);
            startApp();
            })
        
        })
    };