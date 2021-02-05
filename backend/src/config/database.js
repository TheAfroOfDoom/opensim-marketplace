const { Sequelize } = require("sequelize");
const { db_url, db_username, db_password, db_name } = require("./index.js");

module.exports = new Sequelize(db_name, db_username, db_password, {
  host: db_url,
  dialect: "mysql",
  logging: console.log(),
});
