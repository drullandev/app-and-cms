# Etapa 1: Construcción
FROM node:16.20.2-alpine as build

WORKDIR /app

# Copia package.json y yarn.lock
COPY package.json yarn.lock ./

# Eliminar package-lock.json si existe
RUN rm -f package-lock.json

# Instalar dependencias respetando yarn.lock y resolutions
RUN yarn install

# Copiar el resto del código fuente
COPY . .

# Construir Strapi
RUN yarn build

# Exponer el puerto de Strapi
EXPOSE 1337

# Comando para iniciar Strapi
CMD ["yarn", "start"]
