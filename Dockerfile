# Basierend auf offiziellem Node.js LTS (Long Term Support) Docker-Image
FROM node:lts

# Setzen Sie das Arbeitsverzeichnis im Container
WORKDIR /usr/src/app

# Kopieren Sie die package.json und package-lock.json
COPY package*.json ./

# Installieren Sie die Abhängigkeiten
RUN npm install

# Kopieren Sie den Rest des Anwendungscodes in das Arbeitsverzeichnis
COPY . .

# Exponieren Sie Port 3000 für die Anwendung
EXPOSE 3000

# Starten Sie die Anwendung
CMD [ "node", "app.js" ]

