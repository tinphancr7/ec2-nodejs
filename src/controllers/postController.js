import db from '../models/index.js';

const createPost = async (req, res) => {
    try {
        const newPost = await db.Post.create({
            ...req.body,
        });

        return res.status(201).json({
            message: 'Create post success',
            result: newPost,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await db.Post.findAll({
            include: [
                {
                    model: db.User,
                    as: 'userDataofPost',
                    attributes: ['id', 'firstName', 'lastName', 'image'],
                },
            ],
            raw: true,
            nest: true,
            order: [['updatedAt', 'DESC']],
        });

        const comments = await db.Comment.findAll({
            include: [
                {
                    model: db.User,
                    as: 'userDataofComment',
                    attributes: ['id', 'firstName', 'lastName', 'image'],
                },
            ],
            raw: true,
            nest: true,
        });

        const commentByPostId = comments.reduce((acc, comment) => {
            const postId = comment.postId;
            if (!acc[postId]) {
                acc[postId] = [];
            }
            acc[postId].push(comment);
            return acc;
        }, {});

        const postsWithCommentCount = posts.map((post) => {
            return {
                ...post,
                comments: commentByPostId[post.id] || [],
            };
        });

        return res.status(200).json({
            message: 'Get all posts success',
            result: postsWithCommentCount,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getPostByUserId = async (req, res) => {
    try {
        const posts = await db.Post.findAll({
            where: {
                userId: req.params.userId,
            },
            include: [
                {
                    model: db.User,
                    as: 'userDataofPost',
                    attributes: ['id', 'firstName', 'lastName', 'image'],
                },
            ],
            raw: true,
            nest: true,
            order: [['updatedAt', 'DESC']],
        });

        const comments = await db.Comment.findAll({
            include: [
                {
                    model: db.User,
                    as: 'userDataofComment',
                    attributes: ['id', 'firstName', 'lastName', 'image'],
                },
            ],
            raw: true,
            nest: true,
        });

        const commentByPostId = comments.reduce((acc, comment) => {
            const postId = comment.postId;
            if (!acc[postId]) {
                acc[postId] = [];
            }
            acc[postId].push(comment);
            return acc;
        }, {});

        const postsWithCommentCount = posts.map((post) => {
            return {
                ...post,
                comments: commentByPostId[post.id] || [],
            };
        });

        return res.status(200).json({
            message: 'Get all posts success',
            result: postsWithCommentCount,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getPostById = async (req, res) => {
    try {
        const posts = await db.Post.findOne({
            where: {
                id: req.params.id,
            },
            include: [
                {
                    model: db.User,
                    as: 'userDataofPost',
                    attributes: ['id', 'firstName', 'lastName', 'image'],
                },
            ],
            raw: true,
            nest: true,
            order: [['updatedAt', 'DESC']],
        });

        const comments = await db.Comment.findAll({
            include: [
                {
                    model: db.User,
                    as: 'userDataofComment',
                    attributes: ['id', 'firstName', 'lastName', 'image'],
                },
            ],
            raw: true,
            nest: true,
        });

        const commentByPostId = comments.reduce((acc, comment) => {
            const postId = comment.postId;
            if (!acc[postId]) {
                acc[postId] = [];
            }
            acc[postId].push(comment);
            return acc;
        }, {});

        const postsWithCommentCount = {
            ...posts,
            comments: commentByPostId[posts.id] || [],
        };

        return res.status(200).json({
            message: 'Get post success',
            result: postsWithCommentCount,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updatePost = async (req, res) => {
    try {
        const updatePost = await db.Post.update(
            {
                ...req.body,
            },
            {
                where: {
                    id: req.params.id,
                },
            },
        );

        return res.status(200).json({
            message: 'Update post success',
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const deletePost = await db.Post.destroy({
            where: {
                id: req.params.id,
            },
        });

        return res.status(200).json({
            message: 'Delete post success',
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export { createPost, getAllPosts, getPostByUserId, getPostById, updatePost, deletePost };
