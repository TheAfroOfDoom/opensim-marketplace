const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const Auth = db.define(
  "auth",
  {
    UUID: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    passwordHash: {
      type: Sequelize.STRING(36),
      allowNull: false,
    },
    passwordSalt: {
      type: Sequelize.STRING(32),
      allowNull: false,
    },
    webLogInKey: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    accountType: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = Auth;
