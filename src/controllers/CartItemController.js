import {Op} from "sequelize";
import db from "../models/index.js";

const createCartItem = async (req, res) => {
	try {
		const {userId, productId, quantity} = req.body;

		const userCart = await db.Cart.findOne({
			where: {
				userId: userId,
			},
		});
		let cartItem;
		if (!userCart) {
			const result = await db.Cart.create({
				userId: userId,
			});

			cartItem = await db.CartItem.create({
				cartId: result.id,
				userId,
				productId,
				quantity,
			});
		} else {
			//exit product in cart
			const foundProduct = await db.CartItem.findOne({
				where: {
					[Op.and]: [{userId}, {productId}],
				},
			});
			if (foundProduct) {
				cartItem = await db.CartItem.update(
					{
						quantity: foundProduct.quantity + quantity,
					},
					{
						where: {
							[Op.and]: [{userId}, {productId}],
						},
					}
				);
			} else {
				cartItem = await db.CartItem.create({
					cartId: userCart.id,
					userId,
					productId,
					quantity,
				});
			}
		}
		return res.status(200).json({
			result: cartItem,
		});
	} catch (error) {
		return res.status(500).json({error: error.message});
	}
};

const updateCartItem = async (req, res) => {
	const {productId, quantity} = req.body;
	const userId = req.user.id;
	try {
		const cartItem = await db.CartItem.findOne({
			where: {
				[Op.and]: [{userId}, {productId}],
			},
		});
		if (cartItem) {
			await db.CartItem.update(
				{
					userId,
					productId,
					quantity,
				},
				{
					where: {
						[Op.and]: [{userId}, {productId}],
					},
				}
			);
			return res.status(200).json("Cart item updated");
		} else {
			return res.status(404).json({error: "Cart item not found"});
		}
	} catch (error) {
		return res.status(500).json({error: error.message});
	}
};

const removeCartItem = async (req, res) => {
	const userId = req.user.id;
	const productId = req.params.id;
	try {
		const cartItem = await db.CartItem.findOne({
			where: {
				[Op.and]: [{userId}, {productId}],
			},
		});
		if (cartItem) {
			await db.CartItem.destroy({
				where: {
					[Op.and]: [{userId}, {productId}],
				},
			});
			return res.status(200).json("Cart item deleted");
		} else {
			return res.status(404).json({error: "Cart item not found"});
		}
	} catch (error) {
		return res.status(500).json({error: error.message});
	}
};

const getCartItemsByUserId = async (req, res) => {
	try {
		const userId = req.user.id;

		let cartItems = await db.CartItem.findAll({
			where: {
				userId: userId,
			},
			attributes: ["id", "quantity"],

			include: [
				{
					model: db.Product,
					attributes: ["id", "name", "price", "description", "images_url"],
					as: "productData",
				},
			],
			raw: false,
			nest: true,
		});
		return res.status(200).json({
			result: cartItems,
		});
	} catch (error) {
		return res.status(500).json({error: error.message});
	}
};

export {createCartItem, updateCartItem, removeCartItem, getCartItemsByUserId};
