"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class CartItem extends Model {
		static associate(models) {
			CartItem.belongsTo(models.Product, {
				foreignKey: "productId",
				targetKey: "id",
				as: "productData",
			});
			CartItem.belongsTo(models.Cart, {
				foreignKey: "cartId",
				targetKey: "id",
			});
		}
	}

	CartItem.init(
		{
			productId: DataTypes.INTEGER,
			userId: DataTypes.INTEGER,
			cartId: DataTypes.INTEGER,
			quantity: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "CartItem",
		}
	);

	return CartItem;
};
