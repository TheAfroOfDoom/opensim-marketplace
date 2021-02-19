const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const Terrain = db.define(
  "terrain",
  {
    RegionUUID: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Revision: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Heightfield: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    tableName: "terrain",
    timestamps: false,
  }
);

module.exports = Terrain;
