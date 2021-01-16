const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const InventoryFolders = db.define(
  "inventoryfolders",
  {
    folderNamme: {
      type: Sequelize.STRING(64),
    },
    type: {
      type: Sequelize.INTEGER,
    },
    version: {
      type: Sequelize.INTEGER(11),
    },
    folderID: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    agentID: {
      type: Sequelize.UUID,
    },
    parentFolderID: {
      type: Sequelize.UUID,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = InventoryFolders;
