# CheyrouGuillaume_7_10082021
Lancement de l'app Groupomania

1. Clonez le repository en installant les dépendances du projet listées ici :
```
Groupomania/backend/package.json
Groupomania/frontend/package.json
```
2. Créez le fichier .env dans le dossier backend
```
Groupomania/backend/.env
```
3. Collez-y les variables d'environnement suivantes :
```
HOST=localhost,
DBPORT=8889,
DBUSER=root,
PASSWORD=root,
DATABASE=groupomania
TOKEN='RANDOM_TOKEN_SECRET'
```
4. Pour faire tourner le serveur en local, vous pouvez utiliser MAMP :
```
https://www.mamp.info/fr/mamp/windows/
https://www.mamp.info/fr/mamp/mac/
```
5. Lancez MAMP et cliquez sur Start/Stop the servers

6. Lancez le serveur et le client dans le terminal

Terminal 1 :
```
  Groupomania % cd backend
      backend % nodemon serve
``` 
Terminal 2 :
```
  Groupomania % cd frontend
     frontend % npm run serve
```
7. L'application tourne à l'adresse suivante :
```
http://localhost:8080/
```
