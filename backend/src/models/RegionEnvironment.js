const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const RegionEnvironment = db.define(
  "regionenvironment",
  {
    region_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true,
    },
    llsd_settings: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "regionenvironment",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "region_id" }],
      },
    ],
  }
);

module.exports = RegionEnvironment;
