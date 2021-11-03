const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/comments');

router.post('/', postCtrl.createComment);
router.get('/:id', postCtrl.showComments);
router.delete('/:id', postCtrl.deleteComment);

module.exports = router;