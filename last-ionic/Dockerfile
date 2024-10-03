# Etapa 1: Construcción con Node.js y Vite
FROM node:22-alpine as build

WORKDIR /app

COPY package*.json ./

# Instalar dependencias
RUN npm install --legacy-peer-deps

# Copiar el código fuente y construir la aplicación
COPY . .
RUN npm run build

# Etapa 2: Servir con Vite (desarrollo o producción)
EXPOSE 3000

CMD ["npm", "run", "dev"] # Cambiar a 'preview' si quieres el modo producción.
