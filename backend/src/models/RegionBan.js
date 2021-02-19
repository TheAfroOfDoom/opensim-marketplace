const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const RegionBan = db.define(
  "regionban",
  {
    regionUUID: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
    bannedUUID: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
    bannedIp: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    bannedIpHostMask: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "regionban",
    timestamps: false,
  }
);

module.exports = RegionBan;
