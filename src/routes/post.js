const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

router.post('/new', postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/all/:userId', postController.getPostByUserId);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;
