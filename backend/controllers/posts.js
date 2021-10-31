const connection = require('../models/connection')
const fs = require('fs'); // style system, gestion Node des fichiers

// Poster un GIF
exports.createPost = (req, res) => {
    const userId = req.body.user;
    const gifDesc = req.body.description;
    const gifUrl = req.body.url;
    // `${req.protocol}://${req.get('host')}/gif/${req.file.filename}`

    const sqlCreatePost = "INSERT INTO Gif_posts (author_id, gif_desc, gif_url)"
        + "VALUES (?, ?, ?)"; // On ne met pas les colonnes avec valeur par défaut
    const values = [userId, gifDesc, gifUrl];

    connection.query(sqlCreatePost, values, function (err, result) {
        if (err) {
            return res.status(400).json({ error: err })
        }
        res.status(201).json({ message: 'Gif publié !' })
    });
};

// Afficher un post
exports.showPost = (req, res) => {
    const postId = req.query.id;

    const sqlPost = "SELECT p.id, p.author_id, p.gif_desc, p.publication_date, p.gif_url, u.username FROM Gif_posts p LEFT JOIN Users u ON p.author_id = u.id WHERE p.id = ?";

    connection.query(sqlPost, [postId], function (err, result) {
        if (err) { // err 500
            return res.status(404).json({ error: err })
        }
        res.status(200).json(result[0]);
    });
};

// Supprimer un post
exports.deletePost = (req, res) => {
    const postId = req.params.id;

    const sqlDeleteComments = "DELETE FROM Gif_comments WHERE gif_id = ?"

    connection.query(sqlDeleteComments, [postId], function (err, result) {
        if (err) {
            return res.status(400).json({ error: err })
        }
        let sqlDeletePost = "DELETE FROM Gif_posts WHERE id = ?"

        connection.query(sqlDeletePost, [postId], function (err, result) {
            if (err) {
                return res.status(400).json({ error: err })
            }
            res.status(201).json({ message: 'Post supprimé !' })
        });
    });
};

// Afficher le fil
exports.showFeed = (req, res) => {
    const sqlFeed = "SELECT p.id, p.author_id, p.gif_desc, p.publication_date, p.gif_url, u.username FROM Gif_posts p LEFT JOIN Users u ON p.author_id = u.id ORDER BY p.id DESC";

    connection.query(sqlFeed, function (err, result) {
        if (err) {
            return res.status(500).json({ error: err })
        }
        res.status(200).json(result);
    });
};