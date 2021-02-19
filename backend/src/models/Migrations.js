const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const Migrations = db.define(
  "migrations",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    version: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    tableName: "migrations",
    timestamps: false,
  }
);

module.exports = Migrations;
