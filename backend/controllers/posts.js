const connection = require('../models/connection')
const mysql = require('mysql');
const fs = require('fs'); // style system, gestion Node des fichiers

// Poster un GIF
exports.createPost = (req, res) => {
    const userId = res.locals.userId;
    const gifTitle = req.body.gif_desc;
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
exports.deleteOneGif = (req, res, next) => {
    // const gifId = req.params.id;
    // const userId = res.locals.userID;
    let gifId = "5";
    let userId = "9";
    let gifUrl = "hello.gif"; //@todo supp après test, doublon de code verifier

    let sqlSelectPost = "SELECT url FROM gif WHERE id = ?";
    connection.query(sqlSelectPost, [gifId], function (err, result) {
        if (result > 0) {
            // const filename = result[0].gifUrl.split("/gif/")[1];
            // fs.unlink(`gif/${filename}`
                fs.unlink(gifUrl, () => { // On supprime le fichier image en amont
                let sqlDeletePost = "DELETE FROM Post WHERE userID = ? AND postID = ?";
                connection.query(sqlDeletePost, [userId, gifId], function (err, result) {
                    if (err) {
                        return res.status(500).json(err.message);
                    };
                    res.status(200).json({ message: "Post supprimé !" });
                });
            })
        } else {
            let sqlDeletePost = "DELETE FROM gif WHERE user_id = ? AND id = ?";
            connection.query(sqlDeletePost, [userId, gifId], function (err, result) {
                if (err) {
                    return res.status(500).json(err.message);
                };
                res.status(200).json({ message: "Post supprimé !" });
            });
        }
        if (err) {
            return res.status(500).json(err.message);
        };
    });
}

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