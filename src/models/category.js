"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Category extends Model {
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
            Category.hasMany(models.Product, {
                foreignKey: "categoryId",
                as: "categoryData",
            })
        }
	}
	Category.init(
		{
			name: DataTypes.STRING,  // TEXT("long")
		},
		{
			sequelize,
			modelName: "Category",
		}
	);
	return Category;
};
