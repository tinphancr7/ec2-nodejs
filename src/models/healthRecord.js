"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class HealthRecord extends Model {
        static associate(models) {
            HealthRecord.belongsTo(models.Booking, {
                foreignKey: "bookingId",
                targetKey: "id",
                as: "bookingData",
            });
            HealthRecord.belongsTo(models.Pet, {
                foreignKey: "petId",
                targetKey: "id",
                as: "petData",
            });
        }
    }
    HealthRecord.init(
        {
            bookingId: DataTypes.INTEGER,
            petId: DataTypes.INTEGER,
            description: DataTypes.TEXT("long"),
            prescription: DataTypes.TEXT("long"),
        },
        {
            sequelize,
            modelName: "HealthRecord",
        }
    );
    return HealthRecord;
};