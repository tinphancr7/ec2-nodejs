"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Cart extends Model {
		static associate(models) {
			Cart.belongsTo(models.User, {
				foreignKey: "userId",
				targetKey: "id",
			});
			Cart.hasMany(models.CartItem, {
				foreignKey: "cartId",
				targetKey: "id",
			});
			// Cart.belongsToMany(models.Product, {
			// 	through: models.CartItem,
			// 	as: "products",
			// 	foreignKey: "cartId",
			// 	otherKey: "productId",
			// });
		}
	}
	Cart.init(
		{
			userId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Cart",
		}
	);
	return Cart;
};
