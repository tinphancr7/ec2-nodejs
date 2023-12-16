"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Drs", {
			id: {
				allowNull: false,
                autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},

            userId: {
                type: Sequelize.INTEGER,
                // references: {
                //     model: "Users",
                //     key: "id",
                // },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },

            specialtyId: {
                type: Sequelize.INTEGER,
                // references: {
                //     model: "Specialties",
                //     key: "id",
                // },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
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
		await queryInterface.dropTable("Drs");
        await queryInterface.dropColumn("doctorId");
	},
};

// npx sequelize-cli db:migrate
