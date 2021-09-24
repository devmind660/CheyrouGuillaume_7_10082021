const connection = require('../models/connection')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Inscription
exports.signup = (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
/*
    let username = "Guillaume_Cheyrou";
    let email = "diamondsky660@gmail.com";
    let password = "Guillaume660";
*/
    // console.log(req.body);

    /* // TODO : fake response, route à débuguée
    return res.status(200).json({ success : true });
    console.log(req.body);
    */
    bcrypt.hash(password, 10)
        .then(hash => {
            let sqlSignup = "INSERT INTO Users (id, username, email, password, last_login, admin_right)"
            + "VALUES (NULL, ?, ?, ?, CURRENT_TIMESTAMP(), NULL)";
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
exports.login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    const sqlEmail = "SELECT email FROM Users WHERE email = ?";

    connection.query(sqlEmail, email, function(error, result) {
        if (error) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' })
        }

        const sqlPassword = "SELECT password FROM Users WHERE email = 'sqlEmail'"

        bcrypt.compare(password, sqlPassword)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
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