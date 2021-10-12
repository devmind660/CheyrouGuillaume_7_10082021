const connection = require('../models/connection')
const fs = require('fs'); // style system, gestion Node des fichiers

// Poster un GIF
exports.createPost = (req, res) => {
    // const userId = res.locals.userId;
    // const gifTitle = req.body.gif_desc;
    // const gifUrl = `${req.protocol}://${req.get('host')}/gif/${req.file.filename}`;
    const userId = 9;
    const gifTitle = "Super GIF";
    const gifUrl = "hello.gif";

    let sqlCreatePost = "INSERT INTO Gif_posts (author_id, gif_desc, gif_url)"
        + "VALUES (?, ?, ?)"; // On ne met pas les colonnes avec valeur par défaut
    let values = [userId, gifTitle, gifUrl];

    connection.query(sqlCreatePost, values, function (err, result) {
        if (err) {
            return res.status(400).json({ error: err })
        }
        res.status(201).json({ message: 'Gif publié !' })
    });
};

// Afficher un post
exports.showPost = (req, res) => {
    // const postId = req.body.id;
    const postId = 1;

    const sqlPost = "SELECT * FROM Gif_posts p LEFT JOIN Users u ON p.author_id = u.id WHERE p.id = ?";

    connection.query(sqlPost, [postId], function (err, result) {
        if (err) {
            return res.status(404).json({ error: err })
        }
        res.status(200).json(result[0]);
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
                    .catch((err) => {
                        res.status(400).json({
                            error: err
                        })
                    });
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            })
        });
}; */

// Afficher le fil
exports.showFeed = (req, res) => {
    const sqlFeed = "SELECT * FROM Gif_posts p LEFT JOIN Users u ON p.author_id = u.id";

    connection.query(sqlFeed, function (err, result) {
        if (err) {
            return res.status(400).json({ error: err })
        }
        res.status(200).json(result);
    });
};