const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const Auth = db.define(
  "auth",
  {
    UUID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
    },
    passwordHash: {
      type: DataTypes.CHAR(32),
      allowNull: false,
      defaultValue: "",
    },
    passwordSalt: {
      type: DataTypes.CHAR(32),
      allowNull: false,
      defaultValue: "",
    },
    webLoginKey: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
    },
    accountType: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: "UserAccount",
    },
  },
  {
    freezeTableName: true,
    tableName: "auth",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "UUID" }],
      },
    ],
  }
);

module.exports = Auth;
