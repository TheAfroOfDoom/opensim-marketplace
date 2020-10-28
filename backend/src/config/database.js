const { Sequelize } = require("sequelize");

module.exports = new Sequelize("opensim", "ryanw", "2EvXhxnn", {
  host: "25.1.197.128",
  dialect: "mysql",
});
