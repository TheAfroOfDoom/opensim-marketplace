const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const Avatars = db.define(
  "avatars",
  {
    PrincipalID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true,
    },
    Value: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    tableName: "avatars",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "PrincipalID" }, { name: "Name" }],
      },
      {
        name: "PrincipalID",
        using: "BTREE",
        fields: [{ name: "PrincipalID" }],
      },
    ],
  }
);

module.exports = Avatars;
