const Post = require('../model/postSchema');

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const createPost = async (req, res) => {
    const post = new Post({
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content
    });

    try {
        if (req.session.userId !== post.userId) {
            throw new Error('Unauthorized');
        }

        const savedPost = await post.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updatePost = async (req, res) => {
    const updatePost = {
        title: req.body.title,
        content: req.body.content
    };

    try {
        const post = await Post.findById(req.params.postId);
        if (!post || req.session.userId !== post.userId) {
            throw new Error('Unauthorized');
        }

        const updatedPost = await Post.updateOne(
            { _id: req.params.postId },
            { $set: updatePost }
        );
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post || req.session.userId !== post.userId) {
            throw new Error('Unauthorized');
        }

        const removedPost = await Post.deleteOne({ _id: req.params.postId });
        res.json(removedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post || req.session.userId !== post.userId) {
            throw new Error('Unauthorized');
        }

        res.json(post);
    } catch (err) {
        res.status(404).json({ message: 'Post not found' });
    }
};

module.exports = { getAllPosts, createPost, updatePost, deletePost, getPostById };