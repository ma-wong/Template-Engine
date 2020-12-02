const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "/team.html");

const render = require("./lib/htmlRenderer");

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
        choices: ['Manager','Engineer', 'Intern', 'I dont want to add any more team members'],
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
        choices: ['Manager', 'Engineer', 'Intern', 'I dont want to add any more team members'],
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
        choices: ['Manager', 'Engineer', 'Intern', 'I dont want to add any more team members'],
    },
]

function managerPrompt() {
    inquirer.prompt(managerQs).then(function(res) {
        let manager = new Manager(res.name, res.id, res.email, res.officeNumber);
        employees.push(manager);

        if (res.type === 'Manager') {
            managerPrompt();
        }
        else if (res.type === 'Engineer') {
            engineerPrompt();
        }
        else if(res.type === 'Intern') {
            internPrompt();
        }
        else if (res.type === 'I dont want to add any more team members') {
            const teamHtml = render(employees);
            fs.writeFile(outputPath, teamHtml, (err) => {
                if (err) throw err;
                console.log('Team was successfully built!');
            });
        }
    });
}

function engineerPrompt() {
    inquirer.prompt(engineerQs).then(function(res) {
        let engineer = new Engineer(res.name, res.id, res.email, res.github);
        employees.push(engineer);

        if (res.type === 'Manager') {
            managerPrompt();
        }
        else if (res.type === 'Engineer') {
            engineerPrompt();
        }
        else if(res.type === 'Intern') {
            internPrompt();
        }
        else if (res.type === 'I dont want to add any more team members') {
            const teamHtml = render(employees);
            fs.writeFile(outputPath, teamHtml, (err) => {
                if (err) throw err;
                console.log('Team was successfully built!');
            });
        }
    });
}

function internPrompt() {
    inquirer.prompt(internQs).then(function(res) {
        let intern = new Intern(res.name, res.id, res.email, res.school);
        employees.push(intern);

        if (res.type === 'Manager') {
            managerPrompt();
        }
        else if (res.type === 'Engineer') {
            engineerPrompt();
        }
        else if(res.type === 'Intern') {
            internPrompt();
        }
        else if (res.type === 'I dont want to add any more team members') {
            const teamHtml = render(employees);
            fs.writeFile(outputPath, teamHtml, (err) => {
                if (err) throw err;
                console.log('Team was successfully built!');
            });
        }
    });
}

managerPrompt();
