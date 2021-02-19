const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const UserAccounts = db.define(
  "useraccounts",
  {
    PrincipalID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true, // IS NOT PK BUT QUERY REQUIRES ONE. THIS IS THE CLOSEST
    },
    ScopeID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    FirstName: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    LastName: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    ServiceURLs: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Created: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    UserLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    UserFlags: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    UserTitle: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: "",
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = UserAccounts;
