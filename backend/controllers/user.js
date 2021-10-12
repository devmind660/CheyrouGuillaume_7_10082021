const connection = require('../models/connection')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
dotenv = require('dotenv').config();

// Inscription
exports.signup = (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    bcrypt.hash(password, 10)
        .then(hash => {
            let sqlSignup = "INSERT INTO Users (username, email, password)"
                + "VALUES (?, ?, ?)"; // On ne met pas les colonnes avec valeur par défaut
            let values = [username, email, hash];

            // TODO : Empêcher le double email

            connection.query(sqlSignup, values, function (err, result) {
                if (err) {
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
    let email = req.body.email;
    let password = req.body.password;

    const sqlEmail = "SELECT password FROM Users WHERE email = ?";

    connection.query(sqlEmail, [email], function(err, result) {
        if (err) {
            return res.status(500).json(err.message);
        }
        // Si aucun utilisateur ne correspond à cet email
        if (result.length === 0) {
            return res.status(401).json({ error: "Utilisateur non trouvé !" });
        }
        const sqlPassword = result[0].password;

        // TODO : Vérifier que le booléen isAdmin fonctionne
        bcrypt.compare(password, sqlPassword)
            .then(valid => {
                if (!valid /* TODO : && req.user && req.user */) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                res.status(200).json({
                    token: jwt.sign(
                        {
                            userId: result[0].id,
                            username: result[0].username,
                            email: result[0].email,
                            creationDate: result[0].creation_date,
                            adminRights: result[0].admin_rights
                        },
                        'RANDOM_TOKEN_SECRET',
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
    const userToken = req.headers.authorization.split(' ')[1];

    const sqlUser = "SELECT * FROM Users WHERE id = ?";

    connection.query(sqlUser, [userToken], function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        }
        // Si aucun utilisateur ne correspond à ce token
        if (result.length === 0) {
            return res.status(401).json({ message: "Utilisateur non-authentifié !" });
        }
        res.status(200).json(result);
    });
};

/* // Modification du profil
exports.modifyAccount = (req, res) => {

}; */

/* // Suppression du compte
exports.deleteAccount = (req, res) => {

}; */