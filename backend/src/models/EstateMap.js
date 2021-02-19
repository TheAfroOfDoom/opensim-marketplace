const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const EstateMap = db.define(
  "estate_map",
  {
    RegionID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
      primaryKey: true,
    },
    EstateID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "estate_map",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "RegionID" }],
      },
      {
        name: "EstateID",
        using: "BTREE",
        fields: [{ name: "EstateID" }],
      },
    ],
  }
);

module.exports = EstateMap;
