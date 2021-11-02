const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/posts');

router.get('/', postCtrl.showFeed);
router.post('/', multer, postCtrl.createPost);
router.get('/:id', postCtrl.showPost);
router.delete('/:id', postCtrl.deletePost);

module.exports = router;