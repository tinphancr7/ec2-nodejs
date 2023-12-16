"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Bill extends Model {
		static associate(models) {}
	}
	Bill.init(
		{
			userId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Bill",
		}
	);
	return Bill;
};
