import fs from 'fs';
import path from 'path';

// Directorio que contiene los archivos .tsx
const componentsDir = './'; // Cambia esto por tu carpeta

// Leer todos los archivos del directorio
fs.readdir(componentsDir, (err, files) => {
  if (err) {
    return console.error('Error reading directory:', err);
  }

  // Filtrar solo los archivos .tsx
  const tsxFiles = files.filter(file => file.endsWith('.tsx'));

  tsxFiles.forEach(file => {
    const componentName = path.basename(file, '.tsx'); // Obtener el nombre del componente (sin extensión)
    const componentDir = path.join(componentsDir, componentName); // Crear la ruta de la nueva carpeta

    // Crear la nueva carpeta si no existe
    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir);
    }

    // Leer el contenido del archivo .tsx
    const filePath = path.join(componentsDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Escribir el contenido en un archivo index.tsx dentro de la nueva carpeta
    const newIndexPath = path.join(componentDir, 'index.tsx');
    fs.writeFileSync(newIndexPath, fileContent);

    // Opcional: Eliminar el archivo original después de moverlo
    fs.unlinkSync(filePath);

    console.log(`Component ${componentName} moved to ${componentDir}`);
  });
});
