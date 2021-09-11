const connection = require('../models/connection')
const fs = require('fs'); // style system, gestion Node des fichiers

// Poster un GIF
exports.createPost = (req, res) => {
    const userId = res.locals.userId;
    const gifTitle = req.body.gifTitle;
    const gifUrl = `${req.protocol}://${req.get('host')}/gif/${req.file.filename}`;

    let sqlCreatePost = "INSERT INTO Gif_posts (id, author_id, gif_desc, publication_date, gif_url)"
        + "VALUES (NULL, ?, ?, CURRENT_TIMESTAMP(), ?)";
    let values = [userId, gifTitle, gifUrl];

    connection.query(sqlCreatePost, values, function (error, result) {
        if (error) {
            return res.status(400).json({ error: error })
        }
        res.status(201).json({ message: 'Gif publié !' })
    });
};

// Afficher un post
exports.showPost = (req, res) => {
    const postId = req.body.id;

    const sqlPost = "SELECT * FROM Gif_posts WHERE id = ?";

    connection.query(sqlPost, [postId], function (error, result) {
        if (error) {
            return res.status(404).json({ error: error })
        }
        res.status(200).json({ message: 'Affichage du post…' });
    });
};

/* // Commenter un post
exports.commentPost = (req, res) => {

}; */

/* // Supprimer un post
exports.deletePost = (req, res) => {
    Sauce.findOne({
        _id: req.params.id
    })
        .then((sauce) => {
            const filename = sauce.imageUrl.split('/gif/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => {
                        res.status(200).json({
                            message: 'Sauce supprimée !'
                        })
                    })
                    .catch((error) => {
                        res.status(400).json({
                            error: error
                        })
                    });
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            })
        });
}; */

// Afficher le fil
exports.showFeed = (req, res) => {
    const sqlFeed = "SELECT * FROM Gif_posts";

    connection.query(sqlFeed, function (error, result) {
        if (error) {
            return res.status(400).json({ error: error })
        }
        res.status(200).json(result);
    });
};