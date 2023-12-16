("use strict");
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class OrderItem extends Model {
		static associate(models) {
			OrderItem.belongsTo(models.Product, {
				foreignKey: "productId",
				targetKey: "id",
				as: "orderItemData",
			});
			OrderItem.belongsTo(models.Order, {
				foreignKey: "orderId",
				targetKey: "id",
				as: "orderData",
			});
		}
	}

	OrderItem.init(
		{
			orderId: DataTypes.INTEGER,
			productId: DataTypes.INTEGER,
			quantity: DataTypes.INTEGER,
			priceAtPurchase: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "OrderItem",
		}
	);

	return OrderItem;
};
