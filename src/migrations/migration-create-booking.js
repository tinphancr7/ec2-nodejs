'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Bookings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },

            bookingDate: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            bookingTime: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            status: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'pending',
            },
            reason: {
                type: Sequelize.STRING,
            },
            token: {
                type: Sequelize.STRING,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                // references: {
                // 	model: "Users",
                // 	key: "id",
                // },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },

            specialtyId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                // references: {
                // 	model: "Specialties",
                // 	key: "id",
                // },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
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
        await queryInterface.dropTable('Bookings');
    },
};
