const { Sequelize } = require("sequelize");
const { logging } = require("../config/index");

module.exports = new Sequelize("opensim", "marketplace", "bLV8dkgQjjpq", {
  host: "25.1.197.128",
  dialect: "mysql",
  logging: console.log(),
});
