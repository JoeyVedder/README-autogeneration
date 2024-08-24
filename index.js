import inquirer from "inquirer";
import * as fs from 'fs';

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
    },
    // {
    //     type: `list`,
    //     name: `fonts`,
    //     message: `What font would you like the README to be?`,
    //     choices: [`Hind`, `Futura`, `Helvetica`, `Arial`]
    // },
]

// TODO: Create a function to write README file
/**
 * Table of contents followss special format, so we create the table of contents format here
*/
const genTableOfContents = (sections) => {
    let tableOfContents = '## Table of Contents\n\n';
    for(let section of sections) {
        // \n Are line breaks
        // .charAt(0).toUpperCase() takes the first character from the string and converts it to uppercase
        // slice(1) takes all of the string, converts it to an array, and returns the array starting from index 1
        tableOfContents += (`- [${section.charAt(0).toUpperCase() + section.slice(1)}](#${section.toLowerCase()})\n`);
    }
    return tableOfContents;
}

/**
 * Each section follows a standard format, so we can automate all the sections here
 * @param {array} questions 
 * @param {object} response 
 * @returns 
 */
const generateSections = (questions, response) => {
    // starting string
    let allSections = '';
    // Loop over each of the questions
    for(const question of questions) {
        // Project follows special format, and description goes before the table of contents, so we generate that soemwhere else
        if(question.name === 'project' || question.name === 'description' || question.name === 'license') {
            // Continue means 'Skip this part of the loop)'
            continue;
        }

        // Create first part of section (## Description)
        // \n Are line breaks
        // .charAt(0).toUpperCase() takes the first character from the string and converts it to uppercase
        // slice(1) takes all of the string, converts it to an array, and returns the array starting from index 1
        allSections += `## ${question.name.charAt(0).toUpperCase() + question.name.slice(1)}\n\n`;
        allSections += response[question.name];
        allSections += '\n\n';
    }
    
    return allSections;
}

const generateLicense = (response) => {
    let license = '';
    // TODO: Add license section title
    // TODO: Add processing to license add badge and link
    let licenseResponse = response.license;
    // Find the license text for each license, and add that to the license string
    switch(licenseResponse) {
        case 'MIT':
            console.log('hi')
            //break;

        case 'other license idk':
            console.log('hi2')
            break;
    
    }
    //TODO; Add the badges section
    // ## Badges
    //![badmath](https://img.shields.io/github/languages/top/lernantino/badmath)

    return license;
}

 // Inquirer is asynchonus, so we put await here so the code doesnt progres without getting response value first
const response = await(inquirer.prompt(questions));
// Function call to initialize app

const project = `# ${response.project}`
const description = `## Description\n\n ${response.description}`;
const tableOfContents = genTableOfContents(questions.map(question => question.name));
const allOtherSections = generateSections(questions, response);
const license = generateLicense(response);

// We take all of the sections needed for readme and put them in an array
// join('\n\n') converts the array to a string, and puts the two linebreaks inbetween each item
const readMe = [project, description, tableOfContents, allOtherSections, license].join('\n\n')

var wstream = fs.createWriteStream('README.md');
wstream.write(readMe);
wstream.end();
