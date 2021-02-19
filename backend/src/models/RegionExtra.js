const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const RegionExtra = db.define(
  "regionextra",
  {
    RegionID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true,
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    tableName: "regionextra",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "RegionID" }, { name: "Name" }],
      },
    ],
  }
);

module.exports = RegionExtra;
