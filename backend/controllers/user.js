const connection = require('../models/connection'); // Connexion à la base de données MySQL
const bcrypt = require('bcrypt'); // Encodage du mot de passe
const jwt = require('jsonwebtoken'); // Création du token d'authentification
dotenv = require('dotenv').config(); // Masque les informations de connection à la BDD à l'aide de variables d'environnement -> fichier .env

// Inscription
exports.signup = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    // Hachage x10 du mot de passe
    bcrypt.hash(password, 10)
        .then(hash => {
            const sqlSignup = "INSERT INTO Users (username, email, password)"
                + "VALUES (?, ?, ?)"; // On ne met pas les colonnes avec valeur par défaut
            const values = [username, email, hash];

            connection.query(sqlSignup, values, function (err, result) {
                if (err) {
                    console.error(err);
                    return res.status(400).json({ error: err })
                }
                res.status(201).json({ message: 'Utilisateur créé !' });
            });
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        });
};

// Connexion
exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const sqlEmail = "SELECT u.id, u.password FROM Users u WHERE u.email = ?";

    connection.query(sqlEmail, [email], function(err, result) {
        if (err) {
            return res.status(500).json(err.message);
        }
        // Si aucun utilisateur ne correspond à cet email
        if (result.length === 0) {
            return res.status(401).json({ error: "Utilisateur non trouvé !" });
        }
        // Récupération du mot de passe dans la BDD
        const sqlPassword = result[0].password;

        // Comparaison des deux mots de passe encodés
        bcrypt.compare(password, sqlPassword)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                res.status(200).json({
                    // Création du token d'authentification
                    token: jwt.sign(
                        { userId: result[0].id },
                        process.env.TOKEN,
                        { expiresIn: '24h' },
                    )
                });
            })
            .catch((err) => {
                res.status(500).json({ error: err })
            });
    });
};

// Afficher les infos utilisateur
exports.showProfile = (req, res) => {
    const userToken = req.headers.authorization;
    const userInfo = jwt.verify(userToken, process.env.TOKEN);
    const userId = userInfo.userId

    const sqlShowProfile = "SELECT u.id, u.username, u.email, u.creation_date, DATE_FORMAT(u.creation_date, '%d/%m/%Y') AS user_date, u.admin_rights FROM Users u WHERE u.id = ?";

    connection.query(sqlShowProfile,[userId], function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        }
        if (result.length === 0) {
            return res.status(400).json({ message: "User non trouvé !" });
        }
        res.status(200).json(result[0]);
    });
};

// Suppression du compte
exports.deleteUser = (req, res) => {
    const userId = req.params.id;

    const sqlDeleteUser = "DELETE FROM Users WHERE id = ?"

    connection.query(sqlDeleteUser, [userId], function (err, result) {
        if (err) {
            return res.status(500).json({ error: err })
        }
        res.status(201).json({ message: 'Utilisateur supprimé !' })
    });
};