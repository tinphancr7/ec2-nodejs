"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Orders", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},

			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			paymentMethod: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			shippingAddress: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			orderStatus: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: "pending",
			},
			totalCost: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},

			phone: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			fullname: {
				type: Sequelize.STRING,
				allowNull: false,
			},

			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Orders");
	},
};
