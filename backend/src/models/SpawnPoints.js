const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const SpawnPoints = db.define(
  "spawn_points",
  {
    RegionID: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
    Yaw: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Pitch: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Distance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "spawn_points",
    timestamps: false,
    indexes: [
      {
        name: "RegionID",
        using: "BTREE",
        fields: [{ name: "RegionID" }],
      },
    ],
  }
);

module.exports = SpawnPoints;
