const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const GridUser = db.define(
  "griduser",
  {
    UserID: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
    },
    HomeRegionID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    HomePosition: {
      type: DataTypes.CHAR(64),
      allowNull: false,
      defaultValue: "<0,0,0>",
    },
    HomeLookAt: {
      type: DataTypes.CHAR(64),
      allowNull: false,
      defaultValue: "<0,0,0>",
    },
    LastRegionID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    LastPosition: {
      type: DataTypes.CHAR(64),
      allowNull: false,
      defaultValue: "<0,0,0>",
    },
    LastLookAt: {
      type: DataTypes.CHAR(64),
      allowNull: false,
      defaultValue: "<0,0,0>",
    },
    Online: {
      type: DataTypes.CHAR(5),
      allowNull: false,
      defaultValue: "false",
    },
    Login: {
      type: DataTypes.CHAR(16),
      allowNull: false,
      defaultValue: "0",
    },
    Logout: {
      type: DataTypes.CHAR(16),
      allowNull: false,
      defaultValue: "0",
    },
    TOS: {
      type: DataTypes.CHAR(128),
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    tableName: "griduser",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "UserID" }],
      },
    ],
  }
);

module.exports = GridUser;
