# Utiliza una imagen base que tenga Node.js instalado
FROM node:18-alpine3.16 as BUILDER

ENV NODE_ENV development

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json package-lock*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de los archivos de la aplicación al directorio de trabajo
COPY . .

# Compila la aplicación (esto puede variar dependiendo de cómo tengas configurada tu aplicación)
RUN npm run build

#--------------------------------
FROM node:18-alpine3.16 as PRODUCTION

ENV NODE_ENV production

WORKDIR /app

COPY --from=BUILDER /app/package.json /app/package-lock.json ./
COPY --from=BUILDER /app/dist ./dist
COPY --from=BUILDER /app/node_modules ./node_modules

# Expone el puerto en el que tu aplicación escucha
EXPOSE 3000

# Comando para ejecutar la aplicación cuando se inicie el contenedor
CMD [ "node", "dist/main.js" ]
