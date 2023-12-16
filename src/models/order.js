"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Order extends Model {
		static associate(models) {
			Order.belongsTo(models.User, {
				foreignKey: "userId",
				targetKey: "id",
			});
			Order.hasMany(models.OrderItem, {
				foreignKey: "orderId",
				targetKey: "id",
				as: "orderData",
			});
		}
	}
	Order.init(
		{
			userId: DataTypes.INTEGER,
			paymentMethod: DataTypes.STRING,
			shippingAddress: DataTypes.STRING,
			orderStatus: DataTypes.STRING,
			totalCost: DataTypes.INTEGER,
			phone: DataTypes.STRING,
			email: DataTypes.STRING,
			fullname: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Order",
		}
	);
	return Order;
};
