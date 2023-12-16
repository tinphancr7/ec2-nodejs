const Product = require("../models").Product;

const getProductById = async (req, res, next) => {
	try {
		const product = await Product.findByPk(req.params.id);
		if (!product) return res.status(404).json({error: "Product not found"});
		return res.status(200).json({
			result: product,
		});
	} catch (error) {
		return res.status(500).json({error: error.message});
	}
};

const getAllProducts = async (req, res, next) => {
	try {
		const products = await Product.findAll();
		return res.status(200).json({
			result: products,
		});
	} catch (error) {
		return res.status(500).json({error: error.message});
	}
};
const getAllHotProducts = async (req, res, next) => {
	try {
		const products = await Product.findAll({
			where: {
				isHot: true,
			},
		});
		return res.status(200).json({
			result: products,
		});
	} catch (error) {
		return res.status(500).json({error: error.message});
	}
};
const createProduct = async (req, res, next) => {
	try {
		const product = await Product.create(req.body);
		return res.status(201).json(product);
	} catch (error) {
		return res.status(500).json({error: error.message});
	}
};

const updateProduct = async (req, res, next) => {
	try {
		const product = await Product.findByPk(req.params.id);
		if (product) {
			const {id, name, price, description, quantity} = req.body;
			const updatedProduct = await Product.update(
				{
					id,
					name,
					price,
					description,
					quantity,
				},
				{
					where: {id: req.params.id},
				},
				{new: true}
			);
			return res.status(200).json(updatedProduct);
		} else {
			return res.status(404).json({error: "Product not found"});
		}
	} catch (error) {
		return res.status(500).json({error: error.message});
	}
};

const getProductsByCategoryId = async (req, res, next) => {
	try {
		const products = await Product.findAll({
			where: {
				categoryId: req.params.id,
			},
		});
		if (products) {
			return res.status(200).json(products);
		} else {
			return res.status(404).json({error: "Products not found"});
		}
	} catch (error) {
		return res.status(500).json({error: error.message});
	}
};
export {
	getProductById,
	getAllProducts,
	getAllHotProducts,
	createProduct,
	updateProduct,
	getProductsByCategoryId,
};
