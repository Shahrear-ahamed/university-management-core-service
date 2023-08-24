/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
if (process.argv.length < 3) {
  console.error(
    'Usage: node generate-folder-structure.js <FolderName> <FileName>',
  );
  process.exit(1);
}
// Get folder and file names from command-line arguments
const folderName = process.argv[2];
const fileName = process.argv[3];
const firstFileName = fileName.charAt(0).toUpperCase() + fileName.slice(1);

// Define the target directory
const targetDirectory = path.join(
  __dirname,
  'src',
  'app',
  'modules',
  folderName,
);

// Create the target directory
fs.mkdirSync(targetDirectory, { recursive: true });
// Create and write the files in the target directory

const serviceTemplate = `// Your service code here

export const ${fileName}Service = {}
`;
fs.writeFileSync(
  path.join(targetDirectory, `${fileName}.service.ts`),
  serviceTemplate,
);

const controllerTemplate = `import {${fileName}Service} from "./${fileName}.service";
// Your controller code here

export const ${fileName}Controller = {}
`;
fs.writeFileSync(
  path.join(targetDirectory, `${fileName}.controller.ts`),
  controllerTemplate,
);

const routesTemplate = `import express from "express";
import {${fileName}Controller} from "./${fileName}.controller";

// Define your routes here
const router = express.Router();

export const ${firstFileName}Routes = router;

`;
fs.writeFileSync(
  path.join(targetDirectory, `${fileName}.routes.ts`),
  routesTemplate,
);

const interfacesTemplate = `// Define your interfaces here
`;
fs.writeFileSync(
  path.join(targetDirectory, `${fileName}.interfaces.ts`),
  interfacesTemplate,
);

const constantsTemplate = `// Define your constants here
`;
fs.writeFileSync(
  path.join(targetDirectory, `${fileName}.constants.ts`),
  constantsTemplate,
);

const validationTemplate = `// Define your validations here
`;

fs.writeFileSync(
  path.join(targetDirectory, `${fileName}.validation.ts`),
  validationTemplate,
);

console.log(
  `Folder '${folderName}' and files created successfully in src/app/modules/${folderName}.`,
);
