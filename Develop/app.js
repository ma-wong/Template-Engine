const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "./output/team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employees = [];

const managerQs = [
    {
        type: 'input',
        message: "What is your manager's name?",
        name: 'name',
    },
    {
        type: 'input',
        message: "What is your manager's id?",
        name: 'id',
    },
    {
        type: 'input',
        message: "What is your manager's email?",
        name: 'email',
    },
    {
        type: 'input',
        message: "What is your manager's office number?",
        name: 'officeNumber',
    },
    {
        type: 'list',
        message: 'Which type of team member would you like to add?',
        name: 'type',
        choices: ['Engineer', 'Intern', 'I dont want to add any more team members'],
    },
]

const engineerQs = [
    {
        type: 'input',
        message: "What is your engineer's name?",
        name: 'name',
    },
    {
        type: 'input',
        message: "What is your engineer's id?",
        name: 'id',
    },
    {
        type: 'input',
        message: "What is your engineer's email?",
        name: 'email',
    },
    {
        type: 'input',
        message: "What is your engineer's github username?",
        name: 'github',
    },
    {
        type: 'list',
        message: 'Which type of team member would you like to add?',
        name: 'type',
        choices: ['Engineer', 'Intern', 'I dont want to add any more team members'],
    },
]

const internQs = [
    {
        type: 'input',
        message: "What is your intern's name?",
        name: 'name',
    },
    {
        type: 'input',
        message: "What is your intern's id?",
        name: 'id',
    },
    {
        type: 'input',
        message: "What is your intern's email?",
        name: 'email',
    },
    {
        type: 'input',
        message: "What is your intern's school",
        name: 'school',
    },
    {
        type: 'list',
        message: 'Which type of team member would you like to add?',
        name: 'type',
        choices: ['Engineer', 'Intern', 'I dont want to add any more team members'],
    },
]

function managerPrompt() {
    inquirer.prompt(managerQs).then(function(res) {
        let manager = new Manager(res.name, res.id, res.email, res.officeNumber);
        employees.push(manager);

        if (res.type === 'Engineer') {
            engineerPrompt();
        }
        else if(res.type === 'Intern') {
            internPrompt();
        }
        else {
            return;
        }
    });
}

function engineerPrompt() {
    inquirer.prompt(engineerQs).then(function(res) {
        let engineer = new Engineer(res.name, res.id, res.email, res.github);
        employees.push(engineer);

        if (res.type === 'Intern') {
            internPrompt();
        }
        else if (res.type === "Manager") {
            managerPrompt();
        }
        else {
            return;
        }
    });
}

function internPrompt() {
    inquirer.prompt(internQs).then(function(res) {
        let intern = new Intern(res.name, res.id, res.email, res.school);
        employees.push(intern);

        if (res.type === 'Engineer') {
            engineerPrompt();
        }
        else if (res.type === "Manager") {
            managerPrompt();
        }
        else {
            return;
        }
    });
}

managerPrompt();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
render(employees)
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

fs.writeFile('./output/team.html', render(data), (err) => {
    if (err) throw err;
    console.log('Team was successfully built!');
});

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
