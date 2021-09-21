const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/posts');

// TODO : ajouter le middleware auth
router.get('/', postCtrl.showFeed);
router.post('/', multer, postCtrl.createPost);
router.get('/:id', postCtrl.showPost);
// TODO : router.delete('/:id', auth, postCtrl.deletePost);
// TODO : router.post('/:id/comment', auth, postCtrl.commentPost);

module.exports = router;