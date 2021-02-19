const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const InventoryFolders = db.define(
  "inventoryfolders",
  {
    folderName: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    type: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
    },
    version: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    folderID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
      primaryKey: true,
    },
    agentID: {
      type: DataTypes.CHAR(36),
      allowNull: true,
    },
    parentFolderID: {
      type: DataTypes.CHAR(36),
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    tableName: "inventoryfolders",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "folderID" }],
      },
      {
        name: "inventoryfolders_agentid",
        using: "BTREE",
        fields: [{ name: "agentID" }],
      },
      {
        name: "inventoryfolders_parentFolderid",
        using: "BTREE",
        fields: [{ name: "parentFolderID" }],
      },
    ],
  }
);

module.exports = InventoryFolders;
