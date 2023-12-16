'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Dr extends Model {
        static associate(models) {
            Dr.belongsTo(models.Specialty, {
                foreignKey: 'specialtyId',
                targetKey: 'id',
                as: 'specialtyData',
            });
            Dr.belongsTo(models.User, {
                foreignKey: 'userId',
                targetKey: 'id',
                as: 'userData',
            });
        }
    }
    Dr.init(
        {
            userId: DataTypes.INTEGER,
            specialtyId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Dr',
        },
    );
    return Dr;
};
