'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        // static associate(models) {
        // 	User.belongsTo(models.Allcode, {
        // 		foreignKey: "genderId",
        // 		targetKey: "keyMap",
        // 		as: "genderData",
        // 	});
        // 	User.hasOne(models.Doctor_Info, {
        // 		foreignKey: "doctorId",
        // 		as: "doctorInfoData",
        // 	});
        // 	User.hasOne(models.Schedule, {
        // 		foreignKey: "doctorId",
        // 		as: "doctorData",
        // 	});
        // 	User.hasMany(models.Booking, {
        // 		foreignKey: "patientId",
        // 		as: "patientData",
        // 	});
        // 	User.hasMany(models.Comment, {
        // 		foreignKey: "userId",
        // 		as: "userData",
        // 	});
        // }
        static associate(models) {
            User.belongsToMany(models.Product, {
                through: 'cartItem',
                foreignKey: 'userId',
                otherKey: 'productId',
                as: 'userData',
            });
        }

        static associate(models) {
            User.hasMany(models.Pet, {
                foreignKey: 'userId',
                as: 'petData',
            });

            User.hasMany(models.Booking, {
                foreignKey: 'userId',
                as: 'bookingData',
            });

            User.hasOne(models.Dr, {
                foreignKey: 'userId',
                as: 'doctorData',
            });

            User.hasMany(models.Post, {
                foreignKey: 'userId',
                as: 'postDataofUser',
            });
            User.hasMany(models.Comment, {
                foreignKey: 'userId',
                as: 'commentDataofUser',
            });
        }
    }
    User.init(
        {
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: DataTypes.STRING,
            address: DataTypes.STRING,

            roleId: DataTypes.STRING,
            password: DataTypes.STRING,
            phone: DataTypes.STRING,
            image: DataTypes.BLOB,
        },
        {
            sequelize,
            modelName: 'User',
        },
    );

    return User;
};
