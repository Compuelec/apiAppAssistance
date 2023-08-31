# Utiliza una imagen base que tenga Node.js instalado
FROM node:18-alpine3.16

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

# Expone el puerto en el que tu aplicación escucha
EXPOSE 3000

# Comando para ejecutar la aplicación cuando se inicie el contenedor
CMD [ "node", "dist/main.js" ]
