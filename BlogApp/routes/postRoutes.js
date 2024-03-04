const express = require('express');
const postController = require('../controller/postController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', postController.getAllPosts);

router.post('/', postController.createPost);

router.put('/:postId', postController.updatePost);

router.delete('/:postId', postController.deletePost);

router.get('/:postId', postController.getPostById);

module.exports = router;
