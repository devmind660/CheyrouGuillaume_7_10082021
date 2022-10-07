# CheyrouGuillaume_7_10082021
Lancement de l'app Groupomania

1. Clonez le repository en installant les dépendances du projet listées ici :
```
Groupomania/backend/package.json
Groupomania/frontend/package.json
```
2. Créez le fichier ".env" dans le dossier backend.
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
TOKEN='gdci6ks37ndk9bv'
```
4. Pour faire tourner le serveur en local, vous pouvez utiliser MAMP, téléchargez-le ici :
```
https://www.mamp.info/fr/mamp/windows/
https://www.mamp.info/fr/mamp/mac/
```
5. Ouvrez MAMP puis accédez à PhpMyAdmin.
```
MAMP : WebStart > Tools > PhpMyAdmin
```
6. Créez une nouvelle base de données nommée Groupomania.
```
PhpMyAdmin : Nouvelle base de données > Nom de base de données : "Groupomania" > Créer
```
7. Sélectionnez-la et importez le fichier "Groupomania.sql".
```
PhpMyAdmin : Groupomania > Importer > Choisir un fichier : "Groupomania/Groupomania.sql" > Exécuter
```
8. Lancez le serveur local avec MAMP.
```
MAMP : Start (Start/Stop the servers)
```
9. Lancez le serveur et le client dans le terminal

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
10. L'application tourne à l'adresse suivante :
```
http://localhost:8080/
```
