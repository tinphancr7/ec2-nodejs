import db from "../models";

const addToCart = async (req, res) => {
	const {userId, product} = req.body;

	try {
		const userCart = await db.Cart.findOne({
			where: {
				userId: userId,
			},
		});

		//Cart is empty
		if (!userCart) {
			const result = await db.Cart.create({
				userId: userId,
				items: [product], //convert to string
			});
			return res.status(200).send(result);
		} else {
			const products = JSON.parse(userCart.items); //convert to array

			const foundProduct = products?.find(
				(item) => item?.productId === product?.productId
			);
			let result;
			if (foundProduct) {
				result = await db.Cart.update(
					{
						items: products.map((item) =>
							item.productId === product.productId
								? {...item, quantity: item.quantity + product.quantity}
								: item
						),
					},
					{
						where: {
							userId: userId,
						},
					}
				);
			} else {
				result = await db.Cart.update(
					{
						items: [...products, product],
					},
					{
						where: {
							userId: userId,
						},
					}
				);
			}
			return res.status(200).send(result);
		}
	} catch (error) {
		// Handle the error appropriately
		console.error("Error creating/updating user cart:", error);
		throw error;
	}
};

const updateQuantity = async (req, res) => {
	const {productId, quantity} = req.body;
	const userId = req.user?.id;

	try {
		const userCart = await db.Cart.findOne({
			where: {
				userId: userId,
			},
		});

		//Cart is empty
		if (!userCart) {
			return res.status(200).send([]);
		} else {
			const products = JSON.parse(userCart.items); //convert to array

			const foundProduct = products?.find(
				(item) => item?.productId === productId
			);

			if (foundProduct) {
				const result = await db.Cart.update(
					{
						items: products.map((item) =>
							item.productId === productId
								? {...item, quantity: quantity}
								: item
						),
					},
					{
						where: {
							userId: userId,
						},
					}
				);
				return res.status(200).send(result);
			}

			return res.status(200).send([]);
		}
	} catch (error) {
		// Handle the error appropriately
		console.error("Error creating/updating user cart:", error);
		throw error;
	}
};

const getCart = async (req, res) => {
	const userId = req.user?.id;

	try {
		const userCart = await db.Cart.findOne({
			where: {
				userId: userId,
			},
		});

		if (!userCart) {
			return res.status(200).send([]);
		} else {
			const products = JSON.parse(userCart.items);
			return res.status(200).send({result: products});
		}
	} catch (error) {
		// Handle the error appropriately
		console.error("Error getting user cart:", error);
		throw error;
	}
};
const removeItemFromCart = async (req, res) => {
	const userId = req.user?.id;
	const productId = req.params?.id;

	try {
		const userCart = await db.Cart.findOne({
			where: {
				userId: userId,
			},
		});

		if (!userCart) {
			return res.status(200).send([]);
		} else {
			const products = JSON.parse(userCart.items);
			const newProducts = products.filter(
				(item) => item.productId.toString() !== productId.toString()
			);

			const result = await db.Cart.update(
				{
					items: newProducts,
				},
				{
					where: {
						userId: userId,
					},
				}
			);
			return res.status(200).send(result);
		}
	} catch (error) {
		// Handle the error appropriately
		console.error("Error getting user cart:", error);
		throw error;
	}
};

export {addToCart, getCart, updateQuantity, removeItemFromCart};
