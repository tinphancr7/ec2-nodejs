'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Pet extends Model {
        static associate(models) {
            Pet.belongsTo(models.User, {
                foreignKey: 'userId',
                targetKey: 'id',
                as: 'userData',
            });
            Pet.hasMany(models.HealthRecord, {
                foreignKey: 'petId',
                as: 'healthData',
            });
        }
    }
    Pet.init(
        {
            // userId: DataTypes.INTEGER,
            type: DataTypes.STRING,
            height: DataTypes.INTEGER,
            weight: DataTypes.INTEGER,
            userId: DataTypes.STRING,
            image: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Pet',
        },
    );
    return Pet;
};
