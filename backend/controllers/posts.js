const connection = require('../models/connection'); // Connexion à la base de données MySQL

// Poster un GIF
exports.createPost = (req, res) => {
    const userId = req.body.user;
    const gifDesc = req.body.description;
    const gifUrl = req.body.url;

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

    const sqlPost =
        // Données du post de la table Gif_posts
        "SELECT p.id, p.author_id, p.gif_desc, p.gif_url, " +
        // Formatage de la date JJ/MM/AAAA et de l'heure 00:00
        "p.publication_date, DATE_FORMAT(p.publication_date, 'Le %d/%m/%Y à %H:%i') AS gif_date, " +
        // Données de l'utilisateur de la table Users
        "u.username " +
        // Jointure en utilisant la clé étrangère author_id de la table Gif_posts liée à l'index id de la table Users
        "FROM Gif_posts p LEFT JOIN Users u ON p.author_id = u.id " +
        // Recherche de l'id unique auto-incrémenté de la table Gif_posts
        "WHERE p.id = ?";

    connection.query(sqlPost, [postId], function (err, result) {
        if (err) {
            return res.status(404).json({ error: err })
        }
        res.status(200).json(result[0]);
    });
};

// Supprimer un post
exports.deletePost = (req, res) => {
    const postId = req.params.id;

    const sqlDeletePost = "DELETE FROM Gif_posts WHERE id = ?"

    // Les commentaires liés seront supprimés en cascade avec le post (grâce aux contraintes de clés étrangères)
    connection.query(sqlDeletePost, [postId], function (err, result) {
        if (err) {
            return res.status(500).json({ error: err })
        }
        res.status(201).json({ message: 'Post supprimé !' })
    });
};

// Afficher le fil
exports.showFeed = (req, res) => {
    const sqlFeed =
        // Données du post de la table Gif_posts
        "SELECT p.id, p.author_id, p.gif_desc, p.gif_url, " +
        // Formatage de la date JJ/MM/AAAA et de l'heure 00:00
        "p.publication_date, DATE_FORMAT(p.publication_date, 'Le %d/%m/%Y à %H:%i') AS gif_date, " +
        // Données de l'utilisateur de la table Users
        "u.username " +
        // Jointure en utilisant la clé étrangère author_id de la table Gif_posts liée à l'index id de la table Users
        "FROM Gif_posts p LEFT JOIN Users u ON p.author_id = u.id " +
        // Classement décroissant des données par l'id unique auto-incrémenté de la table Gif_posts
        "ORDER BY p.id DESC";

    connection.query(sqlFeed, function (err, result) {
        if (err) {
            return res.status(500).json({ error: err })
        }
        res.status(200).json(result);
    });
};