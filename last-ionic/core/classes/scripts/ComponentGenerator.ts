import fs from 'fs';
import path from 'path';

// Define interfaces for component structure
interface Accessibility {
    [key: string]: any;
}

interface Validation {
    requiredProps: string[];
}

interface Performance {
    shouldMemoize: boolean;
    lazyLoad: boolean;
}

interface Styling {
    [key: string]: any;
}

interface Documentation {
    description: string;
    examples: string[];
    docsUrl: string;
}

interface Component {
    name: string;
    interface: string;
    accessibility: Accessibility;
    validation: Validation;
    styling: Styling;
    performance: Performance;
    documentation: Documentation;
}

interface ComponentsJson {
    IonicComponents: {
        [category: string]: Component[];
    };
}

class ComponentGenerator {
    private componentsJson: ComponentsJson;

    constructor(private jsonFile: string, private componentsDirectory: string) {
        // Read the JSON file content
        const jsonData = fs.readFileSync(this.jsonFile, 'utf8');
        
        // Parse JSON into an object
        this.componentsJson = JSON.parse(jsonData);
    }

    // Function to generate the bridge component name (without 'Ion' prefix)
    generateComponentName(component: Component): string | undefined {
        if (!component || !component.name) {
            console.error('Component or component.name is undefined');
            return;
        }
        return component.name.replace(/^Ion/, '');
    }

    // Function to generate the content of the index.tsx file for a bridge component
    generateIndexFile(
        componentName: string,
        interfaceName: string,
        accessibility: Accessibility,
        validation: Validation,
        styling: Styling,
        performance: Performance
    ): string {
        const ariaStandar = Object.keys(accessibility).map((key) => {
            const camelCaseKey = this.toCamelCase(key);
            return `${camelCaseKey}={props.${camelCaseKey}}`;
        }).join(' ');

        const validationProps = validation.requiredProps.map(prop =>
            `const ${this.toCamelCase(prop)} = props.${this.toCamelCase(prop)};`).join('\n');

        const memoization = performance.shouldMemoize ? 'React.memo' : 'React';
        const importStatement = performance.lazyLoad 
            ? `const ${componentName} = React.lazy(() => import('@ionic/react').then(module => ({ default: module.Ion${componentName} })));`
            : `import { Ion${componentName} } from '@ionic/react';`;

        return `// This file has been automatically generated\n` +
            `// by the component generation script.\n` +
            `import React from 'react';\n` +
            `${importStatement}\n` +
            `import { Ion${componentName}Props } from './types';\n\n` +
            `/**\n` +
            ` * Component ${componentName}\n` +
            ` *\n` +
            ` * @param {${interfaceName}} props Props of the component\n` +
            ` * @returns React component wrapping Ion${componentName}\n` +
            ` */\n` +
            `const ${componentName}: React.FC<${interfaceName}> = (props: ${interfaceName}) => {\n` +
            `    ${validationProps}\n` +
            `    return (\n` +
            `        <Ion${componentName} {...props} ${ariaStandar}/>\n` +
            `    );\n` +
            `};\n\n` +
            `export default ${memoization}(${componentName});\n`;
    }

    // Function to generate the content of the types.ts file
    generateTypesFile(componentName: string, interfaceName: string): string {
        return `// This file has been automatically generated\n` +
            `// by the component generation script.\n` +
            `import { Ion${componentName} } from '@ionic/react';\n\n` +
            `export type ${interfaceName} = React.ComponentProps<typeof Ion${componentName}>;\n`;
    }

    // Function to generate the content of the documentation.md file
    generateDocumentationFile(componentName: string, documentation: Documentation): string {
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

    // Function to remove the directory and its contents
    private removeDirectory(dirPath: string): void {
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
    private toCamelCase(str: string): string {
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

    // Method to generate new components
    generateComponents(): void {
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
                const componentName = this.generateComponentName(component);
                if (!componentName) return; // Ensure componentName is defined
                const interfaceName = component.interface;
                const componentDirectory = `${this.componentsDirectory}${componentName}`;

                // Create the component directory if it does not exist
                if (!fs.existsSync(componentDirectory)) {
                    fs.mkdirSync(componentDirectory, { recursive: true });
                }

                // Generate index.tsx content
                const indexContent = this.generateIndexFile(componentName, interfaceName, component.accessibility, component.validation, component.styling, component.performance);
                const indexPath = `${componentDirectory}/index.tsx`;
                fs.writeFileSync(indexPath, indexContent);

                // Generate types.ts content
                const typesContent = this.generateTypesFile(componentName, interfaceName);
                const typesPath = `${componentDirectory}/types.ts`;
                fs.writeFileSync(typesPath, typesContent);

                // Generate documentation.md content
                const documentationContent = this.generateDocumentationFile(componentName, component.documentation);
                const documentationPath = `${componentDirectory}/documentation.md`;
                fs.writeFileSync(documentationPath, documentationContent);

                console.log(`Generated bridge component: ${componentName}`);
            });
        });

        console.log('Bridge component generation process completed.');
    }
}

export default ComponentGenerator;
