'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Specialty extends Model {
        static associate(models) {
            Specialty.hasMany(models.Booking, {
                foreignKey: 'specialtyId',
                sourceKey: 'id',
                as: 'bookingData',
            });
            Specialty.hasMany(models.Dr, {
                foreignKey: 'specialtyId',
                as: 'doctorData',
            });
        }
    }
    Specialty.init(
        {
            name: DataTypes.STRING,
            image: DataTypes.STRING,
            description: DataTypes.TEXT('long'),
        },
        {
            sequelize,
            modelName: 'Specialty',
        },
    );
    return Specialty;
};
