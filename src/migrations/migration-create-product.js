"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Products", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},

			price: {
				type: Sequelize.INTEGER,
			},
			images_url: {
				type: Sequelize.JSON,
			},

			description: {
				type: Sequelize.TEXT("long"),
			},

			stock_quantity: {
				type: Sequelize.INTEGER,
			},

			categoryId: {
				type: Sequelize.INTEGER,
			},
			isHot: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
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
		await queryInterface.dropTable("Products");
	},
};
