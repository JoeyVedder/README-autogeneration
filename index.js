import inquirer from "inquirer";
import * as fs from 'fs';
import { renderLicenseBadge, renderLicenseLink, renderLicenseSection, generateMarkdown } from './utils/generateMarkdown.js';

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
        message: `What are the installation instructions?`
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
        message: `What is your GitHub username?`
    },
    {
        type: `input`,
        name: `email`,
        message: `What is your email?`
    },
    {
        type: `list`,
        name: `license`,
        message: `What license would you like to use?`,
        choices: [`MIT`, `ISC`, `NCSA`, `LGPL`, `GPL`]
    },
    {
        type: `confirm`,
        name: `addContact`,
        message: `Would you like to include a "Questions" section with your contact information?`,
        default: true
    }
];

const writeToFile = (fileName, data) => {
    fs.writeFileSync(fileName, data);
};

const response = await inquirer.prompt(questions);
const readMeContent = generateMarkdown({
    title: response.project,
    description: response.description,
    sections: questions.map(question => question.name),
    questions: questions,
    responses: response,
    license: response.license,
    addContact: response.addContact,
    github: response.github,
    email: response.email,
});

const fileName = `README.md`;
writeToFile(fileName, readMeContent);

console.log('README file generated successfully!');
