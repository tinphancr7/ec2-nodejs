'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Pets', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },

            type: {
                type: Sequelize.STRING,
            },

            height: {
                type: Sequelize.INTEGER,
            },

            weight: {
                type: Sequelize.INTEGER,
            },

            userId: {
                type: Sequelize.INTEGER,
                // references: {
                //     model: "Users",
                //     key: "id",
                // },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },

            image: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('Pets');
    },
};

// npx sequelize-cli db:migrate
