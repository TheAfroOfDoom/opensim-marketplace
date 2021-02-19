const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const EstateBan = db.define(
  "estateban",
  {
    EstateID: {
      type: DataTypes.INTEGER.UNSIGNED,
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
    bannedNameMask: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    tableName: "estateban",
    timestamps: false,
    indexes: [
      {
        name: "estateban_EstateID",
        using: "BTREE",
        fields: [{ name: "EstateID" }],
      },
    ],
  }
);
module.exports = EstateBan;
