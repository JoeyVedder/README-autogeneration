// Function to return a license badge based on the license passed in
export function renderLicenseBadge(license) {
  if (!license) return '';
  return `![License](https://img.shields.io/badge/License-${license}-blue.svg)`;
}

// Function to return the license link
export function renderLicenseLink(license) {
  if (!license) return '';
  switch (license) {
      case 'MIT':
          return `[MIT License](https://opensource.org/licenses/MIT)`;
      case 'ISC':
          return `[ISC License](https://opensource.org/licenses/ISC)`;
      case 'NCSA':
          return `[NCSA License](https://opensource.org/licenses/NCSA)`;
      case 'LGPL':
          return `[LGPL License](https://opensource.org/licenses/LGPL-3.0)`;
      case 'GPL':
          return `[GPL License](https://www.gnu.org/licenses/gpl-3.0)`;
      default:
          return '';
  }
}

// Function to return the license section of README
export function renderLicenseSection(license) {
  if (!license) return '';
  return `## License\nThis project is licensed under the ${license}.\n`;
}

// Function to generate the table of contents
export function genTableOfContents(sections) {
  let tableOfContents = '## Table of Contents\n\n';
  for (let section of sections) {
      tableOfContents += `- [${section.charAt(0).toUpperCase() + section.slice(1)}](#${section.toLowerCase()})\n`;
  }
  return tableOfContents;
}

// Function to generate all other sections
export function generateSections(questions, responses) {
  let allSections = '';
  for (const question of questions) {
      if (question.name === 'project' || question.name === 'description' || question.name === 'license') {
          continue;
      }
      allSections += `## ${question.name.charAt(0).toUpperCase() + question.name.slice(1)}\n\n`;
      allSections += responses[question.name] + '\n\n';
  }
  return allSections;
}

//Function to generate the Questions  section
// Function to generate the Questions section
export function generateQuestionsSection(data) {
  if (!data.addContact) return '';
  return `
## Questions
If you have any questions, reach out to me here:
- Email: ${data.email}
- GitHub: [${data.github}](https://github.com/${data.github})
  `;
}

// Function to generate the full markdown for README
export function generateMarkdown(data) {
  return `# ${data.title}

## Description
${data.description}

${genTableOfContents(data.sections)}

${generateSections(data.questions, data.responses)}

${renderLicenseSection(data.license)}
${renderLicenseBadge(data.license)}

${generateQuestionsSection(data)}
`;
}
