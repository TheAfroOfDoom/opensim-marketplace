const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const UserAccounts = db.define(
  "useraccounts",
  {
    PrincipalID: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    ScopeID: { type: Sequelize.UUID, allowNull: false },
    FirstName: { type: Sequelize.STRING(64), allowNull: false },
    LastName: { type: Sequelize.STRING(64), allowNull: false },
    Email: { type: Sequelize.STRING(64) },
    ServiceURLs: { type: Sequelize.TEXT },
    Created: { type: Sequelize.STRING(36) },
    UserLevel: { type: Sequelize.INTEGER, allowNull: false },
    UserFlags: { type: Sequelize.INTEGER, allowNull: false },
    UserTitle: { type: Sequelize.STRING(64), allowNull: false },
    active: { type: Sequelize.INTEGER, allowNull: false },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = UserAccounts;
