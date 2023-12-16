const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController');

router.post('/new', commentController.createComment);
router.get('/post/:id', commentController.getCommentsByPostId);

module.exports = router;
