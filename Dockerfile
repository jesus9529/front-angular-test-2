# Etapa de construcción
FROM node:20 AS build

# Definir el directorio de trabajo
WORKDIR /app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto en el que Angular corre
EXPOSE 4200

# Instalar Angular CLI si no está en el package.json
RUN npm install -g @angular/cli

# Comando para correr server local de angular con hot reload
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll=2000", "--port", "4200", "--disable-host-check"]
