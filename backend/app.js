// Dépendances
const express = require('express');
const helmet = require("helmet");
const bodyParser = require("body-parser");
const path = require('path');

// Routes
const commentsRoutes = require('./routes/comments');
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

// Framework Express
const app = express();

// Configuration du header des requêtes pour la communication cross-serveur (empêche l\'erreur CORS)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Module de sécurité helmet
app.use(helmet());

// Transforme le corps des requêtes en objet JSON
app.use(bodyParser.json());

// Accès au dossier gif
app.use('/gif', express.static(path.join(__dirname, 'gif')));

// Routes
app.use('/api/comments', commentsRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
