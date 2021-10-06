const connection = require('../models/connection')
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
dotenv = require('dotenv').config();

// Inscription
exports.signup = (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    console.log(req.body);

    bcrypt.hash(password, 10)
        .then(hash => {
            let sqlSignup = "INSERT INTO Users (username, email, password)"
            + "VALUES (?, ?, ?)"; // On ne met pas les colonnes avec valeur par défaut
            let values = [username, email, hash];

            // TODO : Empêcher le double email

            connection.query(sqlSignup, values, function (error, result) {
                if (error) {
                    return res.status(400).json({ error: error })
                }
                res.status(201).json({ message: 'Utilisateur créé !' });
            });
        })
        .catch((error) => {
            res.status(500).json({ error: error })
        });
};

// Connexion
/*
exports.login = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    const sqlFindUser = "SELECT id, password FROM user WHERE email = ?";

    connection.query(sqlFindUser, [email], function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        }
        if (result.length === 0) {
            return res.status(401).json({ error: "Utilisateur non trouvé !" });
        }
        bcrypt.compare(password, result[0].password)
            .then(valid => {
                if (!valid && req.user && req.user ) {   //@todo verifier si le code isAdmin fonctionne?
                    return res.status(401).json({ error: "Mot de passe incorrect !" });
                }
                // Si true, on renvoie un statut 200 et un objet JSON avec un userID + un token
                res.status(200).json({
                    userId: result[0].id,
                    token: jwt.sign(
                        { userId: result[0].id },
                        process.env.TOKEN, // Clé d'encodage du token
                        { expiresIn: '24h' },
                        console.log("utilisateur connecté ")
                    )
                });
            })
            .catch(e => res.status(500).json(e));
    });
};
*/

exports.login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    console.log(req.body);

    const sqlEmail = "SELECT password FROM Users WHERE email = ?";

    console.log(sqlEmail);

    connection.query(sqlEmail, [email], function(error, result) {
        if (error) {
            console.log(error);
            return res.status(401).json({ error: 'Utilisateur non trouvé !' })
        }
        // Si aucun utilisateur correspond à cet email
        if (result.length === 0) {
            return res.status(401).json({ error: "Utilisateur non trouvé !" });
        }
        console.log(result);
        const sqlPassword = result[0].password;

        console.log(sqlPassword);

        bcrypt.compare(password, sqlPassword)
            .then(valid => {
                if (!valid) {
                    console.log(password, sqlPassword);
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                res.status(200).json({
                    userId: result[0].id,
                    token: jwt.sign( // Mettre les userInfos complètes dans le token
                        { userId: result[0].id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' },
                    )
                });
            })
            .catch((error) => {
                res.status(500).json({ error: error })
            });
    });
};

// Afficher les infos utilisateur
exports.showProfile = (req, res) => {
    const userId = req.body.id;

    const sqlUser = "SELECT * FROM Users WHERE id = ?";

    connection.query(sqlUser, [userId], function (error, result) {
        if (error) {
            return res.status(404).json({ error: error })
        }
        res.status(200).json({ message: 'Affichage du profil…' });
    });
};

/* // Modification du profil
exports.modifyAccount = (req, res) => {

}; */

/* // Suppression du compte
exports.deleteAccount = (req, res) => {

}; */