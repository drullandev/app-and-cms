# Etapa 1: Construcción
FROM node:16-alpine as build

WORKDIR /app

COPY package*.json ./

# Instalar dependencias
RUN npm install --legacy-peer-deps

# Copiar el código fuente y construir la aplicación
COPY . .
RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:alpine

# Copiar los archivos de construcción de la primera etapa
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto en el que corre Nginx
EXPOSE 80

# Comando para correr Nginx
CMD ["nginx", "-g", "daemon off;"]
