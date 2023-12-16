"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("HealthRecords", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			bookingId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				// references: {
				// 	model: "Bookings",
				// 	key: "id",
				// },
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			petId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				// references: {
				// 	model: "Pets",
				// 	key: "id",
				// },
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			description: {
				type: Sequelize.TEXT("long"),
				allowNull: false,
			},
			prescription: {
				type: Sequelize.TEXT("long"),
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
		await queryInterface.dropTable("HealthRecords");
	},
};
