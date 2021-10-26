const connection = require('../models/connection')

// Poster un commentaire
exports.createComment = (req, res) => {
    // const userId = res.locals.userId;
    const userId = 2;
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
            console.error(err)
            return res.status(400).json({ error: err })
        }
        res.status(201).json({ message: 'Commentaire supprimé !' })
    });
};

// Afficher les commentaires
exports.showComments = (req, res) => {
    const postId = req.query.id;

    const sqlComments = "SELECT c.id, c.gif_comment, c.publication_date, u.username FROM Gif_comments c LEFT JOIN Users u ON c.author_id = u.id WHERE c.gif_id = ? ORDER BY c.id DESC";

    connection.query(sqlComments, [postId],  function (err, result) {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: err })
        }
        res.status(200).json(result);
    });
};