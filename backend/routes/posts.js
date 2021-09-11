const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/posts');

router.get('/', auth, postCtrl.showFeed);
router.post('/', auth, multer, postCtrl.createPost);
router.get('/:id', auth, postCtrl.showPost);
// TODO : router.delete('/:id', auth, postCtrl.deletePost);
// TODO : router.post('/:id/comment', auth, postCtrl.commentPost);

module.exports = router;