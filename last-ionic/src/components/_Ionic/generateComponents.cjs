const fs = require('fs');
const path = require('path');

// Define the class for component generation
class ComponentGenerator {

    constructor(jsonFile, componentsDirectory) {
        this.jsonFile = jsonFile;
        this.componentsDirectory = componentsDirectory;

        // Read the JSON file content
        const jsonData = fs.readFileSync(this.jsonFile, 'utf8');
        
        // Parse JSON into an object
        this.componentsJson = JSON.parse(jsonData);
    }

    // Function to generate the bridge component name (without 'Ion' prefix)
    generateComponentName(component) {
        if (!component || !component.name) {
            console.error('Component or component.name is undefined');
            return;
        }
        return component.name.replace(/^Ion/, '');
    }

    // Function to generate the content of the index.tsx file for a bridge component
    generateIndexFile(
        componentName,
        interfaceName,
        accessibility,
        validation,
        styling,
        performance,
        events
    ) {

        const memoization = performance.shouldMemoize 
            ? `React.memo(${componentName})`
            : `${componentName}`;

        const importStatement = performance.lazyLoad 
            ? `const ${componentName} = React.lazy(() => 
                    import('@ionic/react').then(module => ({ default: module.Ion${componentName} }))
                );`
            : `import { Ion${componentName} } from '@ionic/react';`;

        const component = 
            `// This file has been automatically generated from a script\n` +
            `// by the component generation script.\n` +
            `import React from 'react';\n` +
            `${importStatement}\n` +
            `import { Ion${componentName}Props } from './types';\n\n` +
            `/**\n` +
            ` * Component ${componentName}\n` +
            ` * @author David Rullán Díaz`+
            ` * @href http://github.com/drullandev\n` +
            ` * @date \n` +
            ` *\n` +
            ` * @param {${interfaceName}} props Props of the component\n` +
            ` * @returns React component wrapping Ion${componentName}\n` +
            ` */\n` +
            `const ${componentName}: React.FC<${interfaceName}> = (props: ${interfaceName}) => {\n` +
            `    return <Ion${componentName} {...props} />\n\n` +
            `};\n\n` +
            `export default ${memoization};\n`;

        return component;
    }

    // Function to generate the content of the types.ts file
    generateTypesFile(componentName, interfaceName, accessibility, events) {
        // Map accessibility properties to types
        const accessibilityProps = Object.keys(accessibility).map(key => {
            const type = typeof accessibility[key].acceptedValues === 'string' ? accessibility[key].acceptedValues : 'string';
            const camelCaseKey = this.toCamelCase(key);
            // Add '?' if the property is not required
            return `    ${camelCaseKey}${accessibility[key].required ? '' : '?'}: any;`;
        }).join('\n');

        // Map events to type
        const eventHandlers = events.map(event => `    on${this.toCamelCase(event)}?: (e: any) => void;`).join('\n');

        return `// This file has been automatically generated\n` +
            `// by the component generation script.\n` +
            `import { Ion${componentName} } from '@ionic/react';\n\n` +
            `export type ${interfaceName} = React.ComponentProps<typeof Ion${componentName}> & {\n` +
            `${accessibilityProps}\n` +
            `${eventHandlers}\n` +
            `};\n`;
    }

    // Helper function to generate camelCase event handler name
    getEventHandlerName(event) {
        return `handle${this.toCamelCase(event)}`;
    }

    // Function to generate the content of the documentation.md file
    generateDocumentationFile(componentName, documentation) {
        return `# ${componentName}\n\n` +
            `## Description\n` +
            `${documentation.description}\n\n` +
            `## API\n` +
            `- **Props**: ${documentation.examples.join(', ')}\n\n` +
            `## Example\n` +
            `${documentation.examples[0]}\n\n` +
            `## Documentation URL\n` +
            `${documentation.docsUrl}\n`;
    }

    // Method to generate new components
    generateComponents() {
        // Remove existing components directory
        this.removeDirectory(this.componentsDirectory);

        // Create the new components directory
        if (!fs.existsSync(this.componentsDirectory)) {
            fs.mkdirSync(this.componentsDirectory, { recursive: true });
        }

        // Generate new components
        Object.keys(this.componentsJson.IonicComponents).forEach((category) => {
            const components = this.componentsJson.IonicComponents[category];

            // Check if `components` is an array
            if (!Array.isArray(components)) {
                console.error(`Expected an array for category ${category}, but got ${typeof components}`);
                return;
            }

            components.forEach((component) => {
                if (!component.avoid){
                    const componentName = this.generateComponentName(component);
                    if (!componentName) return; // Ensure componentName is defined
                    const interfaceName = component.interface;
                    const componentDirectory = path.join(this.componentsDirectory, componentName);
    
                    // Create the component directory if it does not exist
                    if (!fs.existsSync(componentDirectory)) {
                        fs.mkdirSync(componentDirectory, { recursive: true });
                    }
    
                    // Generate index.tsx content
                    const indexContent = this.generateIndexFile(componentName, interfaceName, component.accessibility, component.validation, component.styling, component.performance, component.behavior.events);
                    const indexPath = path.join(componentDirectory, 'index.tsx');
                    fs.writeFileSync(indexPath, indexContent);
    
                    // Generate types.ts content
                    const typesContent = this.generateTypesFile(componentName, interfaceName, component.accessibility, component.behavior.events);
                    const typesPath = path.join(componentDirectory, 'types.ts');
                    fs.writeFileSync(typesPath, typesContent);
    
                    // Generate documentation.md content
                    const documentationContent = this.generateDocumentationFile(componentName, component.documentation);
                    const documentationPath = path.join(componentDirectory, 'documentation.md');
                    fs.writeFileSync(documentationPath, documentationContent);
    
                    console.log(` • Generated bridge component: ${componentName}`);
                }
            });
        });

        console.log('Bridge component generation process completed.');
    }

    // Function to remove the directory and its contents
    removeDirectory(dirPath) {
        if (fs.existsSync(dirPath)) {
            fs.readdirSync(dirPath).forEach((file) => {
                const filePath = path.join(dirPath, file);
                if (fs.statSync(filePath).isDirectory()) {
                    this.removeDirectory(filePath);
                } else {
                    fs.unlinkSync(filePath);
                }
            });
            fs.rmdirSync(dirPath);
        }
    }

    // Function to convert a hyphenated string to camelCase
    toCamelCase(str) {
        return str
            .toLowerCase()
            .split('-')
            .map((word, index) =>
                index === 0
                    ? word
                    : word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join('');
    }

}

// Example usage
const jsonFile = './src/components/_Ionic/components.json';
const componentsDirectory = './src/components/_Ionic/v8/';
const generator = new ComponentGenerator(jsonFile, componentsDirectory);
generator.generateComponents();
console.log('OK');
