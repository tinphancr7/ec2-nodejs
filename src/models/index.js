"use strict";
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
// const { default: HealthRecord } = require("./HealthRecord").default;
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
const customizeConfig = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	dialect: process.env.DB_DIALECT,
	dialectModule: require("mysql2"),
	logging: false,
	query: {
		raw: true,
	},
	timezone: "+07:00",
};

sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USERNAME,
	process.env.DB_PASSWORD,
	customizeConfig
);

// sequelize.sync()
//   .then(() => {
//     // Start your application or perform other operations
//   })
//   .catch((error) => {
//     console.error('Error synchronizing models:', error);
//   });

// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {

//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
		);
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes
		);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

// const healthRecord = new Sequelize('database_name', 'username', 'password', {
//   host: 'localhost',
//   dialect: 'mysql',
// });

// healthRecord.authenticate()
//   .then(() => {
//     console.log('Kết nối thành công đến cơ sở dữ liệu MySQL.');
//   })
//   .catch((error) => {
//     console.error('Lỗi kết nối đến cơ sở dữ liệu MySQL:', error);
//   });

// module.exports = healthRecord;
