'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        static associate(models) {
            Booking.belongsTo(models.User, {
                foreignKey: 'userId',
                targetKey: 'id',
                as: 'userData',
            });

            Booking.belongsTo(models.Specialty, {
                foreignKey: 'specialtyId',
                targetKey: 'id',
                as: 'specialtyData',
            });

            Booking.hasOne(models.HealthRecord, {
                foreignKey: 'bookingId',
                as: 'healthData',
            });
        }
    }
    Booking.init(
        {
            bookingDate: DataTypes.STRING,
            bookingTime: DataTypes.STRING,
            status: DataTypes.STRING,
            userId: DataTypes.INTEGER,
            specialtyId: DataTypes.STRING,
            reason: DataTypes.STRING,
            token: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Booking',
        },
    );
    return Booking;
};
