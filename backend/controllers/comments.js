const connection = require('../models/connection'); // Connexion à la base de données MySQL

// Poster un commentaire
exports.createComment = (req, res) => {
    const userId = req.body.user;
    const postId = req.body.id;
    const gifComment = req.body.comment;

    const sqlCreateComment = "INSERT INTO Gif_comments (author_id, gif_id, gif_comment)"
        + "VALUES (?, ?, ?)"; // On ne met pas les colonnes avec valeur par défaut
    const values = [userId, postId, gifComment];

    connection.query(sqlCreateComment, values, function (err, result) {
        if (err) {
            return res.status(400).json({ error: err })
        }
        res.status(201).json({ message: 'Commentaire publié !' })
    });
};

// Supprimer un commentaire
exports.deleteComment = (req, res) => {
    const postId = req.params.id;

    const sqlDeleteComment = "DELETE FROM Gif_comments WHERE id = ?"

    connection.query(sqlDeleteComment, [postId], function (err, result) {
        if (err) {
            return res.status(500).json({ error: err })
        }
        res.status(201).json({ message: 'Commentaire supprimé !' })
    });
};

// Afficher les commentaires
exports.showComments = (req, res) => {
    const postId = req.query.id;

    const sqlComments =
        // Données du commentaire de la table Gif_comments
        "SELECT c.id, c.author_id, c.gif_comment, " +
        // Formatage de la date JJ/MM/AAAA et de l'heure 00:00
        "c.publication_date, DATE_FORMAT(c.publication_date, 'Le %d/%m/%Y à %H:%i') AS comment_date, " +
        // Données de l'utilisateur de la table Users
        "u.username " +
        // Jointure en utilisant la clé étrangère author_id de la table Gif_comments liée à l'index id de la table Users
        "FROM Gif_comments c LEFT JOIN Users u ON c.author_id = u.id " +
        // Recherche de l'id unique auto-incrémenté de la table Gif_comments
        "WHERE c.gif_id = ? " +
        // Classement décroissant des données par l'id unique auto-incrémenté de la table Gif_comments
        "ORDER BY c.id DESC";

    connection.query(sqlComments, [postId],  function (err, result) {
        if (err) {
            return res.status(500).json({ error: err })
        }
        res.status(200).json(result);
    });
};