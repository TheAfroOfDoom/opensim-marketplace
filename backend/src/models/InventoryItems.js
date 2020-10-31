const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const InventoryItems = db.define(
  "inventoryitems",
  {
    assetID: {
      type: Sequelize.UUID,
    },
    assetType: {
      type: Sequelize.INTEGER(11).UNSIGNED,
    },
    InventoryName: {
      type: Sequelize.STRING(64),
    },
    InventoryDescription: {
      type: Sequelize.STRING(64),
    },
    InventoryNextPermissions: {
      type: Sequelize.INTEGER(10).UNSIGNED,
    },
    InventoryCurrentPermissions: {
      type: Sequelize.INTEGER(10).UNSIGNED,
    },
    InvType: {
      type: Sequelize.INTEGER(11),
    },
    creatorID: {
      type: Sequelize.UUID,
    },
    InventoryBasePermissions: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
    },
    InventoryEveryOnePermissions: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
    },
    salePrice: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    saleType: {
      type: Sequelize.INTEGER(4),
      allowNull: false,
    },
    creationDate: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    groupID: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    groupOwned: {
      type: Sequelize.INTEGER(4),
      allowNull: false,
    },
    flags: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    InventoryID: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    avatarID: {
      type: Sequelize.UUID,
    },
    parentFolderID: {
      type: Sequelize.UUID,
    },
    InventoryGroupPermissions: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = InventoryItems;
