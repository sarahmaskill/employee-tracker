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
    console.log("🆆🅴🅻🅲🅾🅼🅴 🆃🅾 🆃🅷🅴 🅴🅼🅿🅻🅾🆈🅴🅴 🆃🆁🅰🅲🅺🅴🆁");
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
        console.log(res.length + ' employees found!');
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
                name: 'new_role',
                type: 'input', 
                message: "What new role would you like to add?"
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of this role? (Enter a number)'
            },
            {
                name: 'Department',
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
            let department_id;
            for (let a = 0; a < res.length; a++) {
                if (res[a].name == answer.Department) {
                    department_id = res[a].id;
                }
            }
    
            db.query(
                'INSERT INTO role SET ?',
                {
                    title: answer.new_role,
                    salary: answer.salary,
                    department_id: department_id
                },
                function (err, res) {
                    if(err)throw err;
                    console.log('Your new role has been added!');
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
                    name: 'first_name',
                    type: 'input', 
                    message: "What is the employee's first name? ",
                },
                {
                    name: 'last_name',
                    type: 'input', 
                    message: "What is the employee's last name? "
                },
                {
                    name: 'manager_id',
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
                    let role_id;
                    for (let a = 0; a < res.length; a++) {
                        if (res[a].title == answer.role) {
                            role_id = res[a].id;
                            console.log(role_id)
                        }                  
                    }  
                    db.query(
                    'INSERT INTO employee SET ?',
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        manager_id: answer.manager_id,
                        role_id: role_id,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log('Your employee has been added!');
                        startApp();
                    })
                })
        })
};
function addDepartment() {
    // db.query('SELECT * FROM department', function (err, res) {
    //     if (err) throw err;
    inquirer
    .prompt([
        {
            name: 'newDepartment', 
            type: 'input', 
            message: 'Which department would you like to add?'
        }
        ]).then(function (answer) {
            db.query(
                'INSERT INTO department SET ?',
                {
                    name: answer.newDepartment
                });
            var query = 'SELECT * FROM department';
            db.query(query, function(err, res) {
            if(err)throw err;
            console.log('Your department has been added!');
            console.table('All Departments:', res);
            startApp();
            })
        
        })
    };