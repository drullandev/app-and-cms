# Etapa 1: Construcción con Node.js y Vite
FROM node:22-alpine as build

WORKDIR /app

COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente y construir la aplicación
COPY . .
RUN npm run build

# Etapa 2: Servir con Vite (desarrollo o producción)
EXPOSE ${VITE_APP_DOCKER_PORT}

# Usar el shell para ejecutar el comando en tiempo de ejecución
CMD ["sh", "-c", "npm run ${VITE_APP_NODE_ENV}"]