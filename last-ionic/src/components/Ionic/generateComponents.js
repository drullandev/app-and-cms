import fs from 'fs';

// Path to the JSON file containing component structure
const jsonFile = './components.json';

// Read the JSON file content
const jsonData = fs.readFileSync(jsonFile, 'utf8');

// Parse JSON into an object
const componentsJson = JSON.parse(jsonData);

// Directory where bridge components will be generated
const componentsDirectory = './v7/';

// Function to generate the bridge component name (without 'Ion' prefix)
const generateComponentName = (name) => {
    return name.replace(/^Ion/, '');
};

// Function to generate the content of the index.tsx file for a bridge component
const generateIndexFile = (componentName, interfaceName) => {
    return `// This file has been automatically generated\n` +
           `// by the component generation script.\n` +
           `import React from 'react';\n` +
           `import { Ion${componentName} } from '@ionic/react';\n` +
           `import { Ion${componentName}Props } from './types';\n` +

           `\n` +
           `/**\n` +
           ` * Component ${componentName}\n` +
           ` *\n` +
           ` * @param {${interfaceName}} props Props of the component\n` +
           ` * @returns React component wrapping Ion${componentName}\n` +
           ` */\n` +
           `const ${componentName}: React.FC<${interfaceName}> = (props: ${interfaceName}) => {\n` +
           `    return (\n` +
           `        <Ion${componentName} {...props} />\n` +
           `    );\n` +
           `};\n` +
           `\n` +
           `export default React.memo(${componentName});\n`;
};

// Function to generate the content of the types.ts file
const generateTypesFile = (componentName, interfaceName) => {
  return `// This file has been automatically generated\n` +
         `// by the component generation script.\n` +
         `import { Ion${componentName} } from '@ionic/react';\n` + // Import the specific interface
         `\n` +
         `export type ${interfaceName} = React.ComponentProps<typeof Ion${componentName}>;\n`; // Export the type alias
};


// Loop through the components in the JSON and generate the corresponding files
Object.keys(componentsJson.IonicComponents).forEach((category) => {
    componentsJson.IonicComponents[category].forEach((component) => {
        const componentName = generateComponentName(component.name);
        const interfaceName = component.interface;
        const componentDirectory = `${componentsDirectory}${componentName}`;

        // Create component directory if it doesn't exist
        if (!fs.existsSync(componentDirectory)) {
            fs.mkdirSync(componentDirectory, { recursive: true });
        }

        // Generate index.tsx file content
        const indexContent = generateIndexFile(componentName, interfaceName);
        const indexPath = `${componentDirectory}/index.tsx`;
        fs.writeFileSync(indexPath, indexContent);

        // Generate types.ts file content
        const typesContent = generateTypesFile(componentName, interfaceName);
        const typesPath = `${componentDirectory}/types.ts`;
        fs.writeFileSync(typesPath, typesContent);

        console.log(`Generated bridge component: ${componentName}`);
    });
});

console.log('Bridge component generation process completed.');
