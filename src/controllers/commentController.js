import db from '../models/index.js';

const createComment = async (req, res) => {
    try {
        const newComment = await db.Comment.create({
            ...req.body,
        });

        return res.status(201).json({
            message: 'Create comment success',
            result: newComment,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getCommentsByPostId = async (req, res) => {
    try {
        const comments = await db.Comment.findAll({
            where: { postId: req.params.id },
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

        return res.status(200).json({
            message: 'Get all comments success',
            result: comments,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export { createComment, getCommentsByPostId };
