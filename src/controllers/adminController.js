import { raw } from 'mysql2';
import db from '../models/index';
import argon2 from 'argon2';

const getAllUsers = async (req, res) => {
    try {
        const searchString = req.query.searchString;
        const users = await db.User.findAll({
            attributes: { exclude: ['password'] },
        });

        if (!users) {
            return res.status(404).json({ error: 'Users not found' });
        }

        if (searchString) {
            const newUsers = users.filter((user) => {
                for (let key in user) {
                    if (user[key].toString().toLowerCase().includes(searchString.toLowerCase())) {
                        return true;
                    }
                }
                return false;
            });
            return res.status(200).json({
                message: 'Get all users success',
                result: newUsers,
            });
        }

        return res.status(200).json({
            message: 'Get all users success',
            result: users,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const getAllProduct = async (req, res) => {
    try {
        const products = await db.Product.findAll({
            include: [
                {
                    model: db.Category,
                    as: 'categoryData',
                    attributes: ['id', 'name'],
                },
            ],
            raw: true,
            nest: true,
        });

        if (!products) {
            return res.status(404).json({ error: 'Products not found' });
        }

        return res.status(200).json({
            message: 'Get all products success',
            result: products,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const createUser = async (req, res) => {
    const { password, email } = req.body;
    try {
        let user = await db.User.findOne({
            where: {
                email: email,
            },
        });

        if (user) {
            return res.status(400).json({ success: false, error: 'Email already exists' });
        }

        const hashedPassword = await argon2.hash(password || '');

        const newUser = await db.User.create({
            ...req.body,
            password: hashedPassword,
        });

        return res.status(200).json({
            message: 'Create user success',
            result: newUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await db.User.destroy({
            where: {
                id: req.params.id,
            },
        });

        return res.status(200).json({
            message: 'Delete user success',
            result: user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await db.User.findOne({
            where: {
                id: req.params.id,
            },
            attributes: { exclude: ['password'] },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({
            message: 'Get user by id success',
            result: user,
        });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
};

const updateUser = async (req, res) => {
    try {
        const updatedUser = await db.User.update(
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
            message: 'Update user success',
        });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
};

const getAllPost = async (req, res) => {
    try {
        const searchStr = req.query.searchString;
        const posts = await db.Post.findAll({
            include: [
                {
                    model: db.User,
                    as: 'userDataofPost',
                    attributes: ['id', 'firstName', 'lastName'],
                },
            ],
            raw: true,
            nest: true,
            order: [['createdAt', 'DESC']],
        });

        if (!posts) {
            return res.status(404).json({ error: 'Posts not found' });
        }

        if (searchStr) {
            const newPosts = posts.filter((post) => {
                for (let key in post) {
                    if (key == 'userDataofPost') {
                        for (let key2 in post[key]) {
                            if (post[key][key2].toString().toLowerCase().includes(searchStr.toLowerCase())) {
                                return true;
                            }
                        }
                    }
                    if (post[key].toString().toLowerCase().includes(searchStr.toLowerCase())) {
                        return true;
                    }
                }
                return false;
            });
            return res.status(200).json({
                message: 'Get all posts success',
                result: newPosts,
            });
        }

        return res.status(200).json({
            message: 'Get all posts success',
            result: posts,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await db.Post.findOne({
            where: {
                id: req.params.id,
            },
            include: [
                {
                    model: db.User,
                    as: 'userDataofPost',
                    attributes: ['id', 'firstName', 'lastName'],
                },
            ],
            raw: true,
            nest: true,
        });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        return res.status(200).json({
            message: 'Get post by id success',
            result: post,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export { getAllUsers, getAllProduct, createUser, deleteUser, getUserById, updateUser, getAllPost, getPostById };
