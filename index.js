// TODO: Include packages needed for this application
import inquirer from "inquirer";
// TODO: Create an array of questions for user input
const questions = [
    {
        type: `input`,
        name: `project`,
        message: "What is the name of your project?"
    },
    {
        type: `input`,
        name: `description`,
        message: `Can you provide a description of your project?`
    },
    {
        type: `input`,
        name: `installation`,
        message: `What are the Installation instructions?`
    },
    {
        type: `input`,
        name: `guidelines`,
        message: `What are the contribution guidelines?`
    },
    {
        type: `input`,
        name: `test`,
        message: `Please provide test instructions.`
    },
    {
        type: `input`,
        name: `github`,
        message: `What is your Github username?`
    },
    {
        type: `input`,
        name: `email`,
        message: `What is your Email?`
    },
    {
        type: `list`,
        name: `license`,
        message: `What license would you like to use?`,
        choices: [`MIT`, `ISC`, `NCSA`, `LGPL`, `GPL`]
    }
]
inquirer.prompt(questions).then((answers) => {
    console.log("Users Answers:",answers);
})

// TODO: Create a function to write README file


// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
