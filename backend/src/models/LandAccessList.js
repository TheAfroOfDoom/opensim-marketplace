const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const LandAccessList = db.define(
  "landaccesslist",
  {
    LandUUID: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    AccessUUID: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Flags: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Expires: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
    tableName: "landaccesslist",
    timestamps: false,
  }
);

module.exports = LandAccessList;
