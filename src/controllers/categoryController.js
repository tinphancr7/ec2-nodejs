const Category = require('../models').Category;

const getCategoryById = async (req, res, next) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (category) {
            return res.status(200).json({
                message: 'Get category by id success',
                result: category,
            });
        } else {
            return res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.findAll();
        return res.status(200).json({
            message: 'Get all categories success',
            result: categories,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const category = await Category.create({
            name,
        });
        if (category) {
            return res.status(201).json({
                message: 'Create category success',
                result: category,
            });
        } else {
            return res.status(400).json({ error: 'Invalid category data' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateCategory = async (req, res, next) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (category) {
            const { id, name } = req.body;
            const updatedCategory = await Category.update(
                {
                    id,
                    name,
                },
                {
                    where: { id: req.params.id },
                },
            );
            return res.status(200).json({
                message: 'Update category success',
                result: updatedCategory,
            });
        } else {
            return res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (category) {
            const deletedCategory = await Category.destroy({
                where: { id: req.params.id },
            });
            return res.status(200).json({
                message: 'Delete category success',
                result: deletedCategory,
            });
        } else {
            return res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getCategoryById = getCategoryById;
exports.getAllCategories = getAllCategories;
exports.createCategory = createCategory;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategory;
