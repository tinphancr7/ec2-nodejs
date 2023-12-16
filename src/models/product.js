"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Product extends Model {
		static associate(models) {
			Product.belongsTo(models.Category, {
				foreignKey: "categoryId",
				targetKey: "id",
				as: "categoryData",
			});
			Product.belongsToMany(models.User, {
				through: "cartItem",
				foreignKey: "productId",
				otherKey: "userId",
			});
			Product.hasMany(models.CartItem, {
				foreignKey: "productId",
				as: "productData",
			});
			Product.hasMany(models.OrderItem, {
				foreignKey: "productId",
				as: "orderItemData",
			});
		}
	}
	Product.init(
		{
			name: DataTypes.STRING, // TEXT("long")
			price: DataTypes.INTEGER,
			description: DataTypes.TEXT("long"),
			images_url: DataTypes.JSON,
			stock_quantity: DataTypes.INTEGER,
			categoryId: DataTypes.INTEGER,
			isHot: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: "Product",
		}
	);
	return Product;
};
