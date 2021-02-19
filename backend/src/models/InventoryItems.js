const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const InventoryItems = db.define(
  "inventoryitems",
  {
    assetID: {
      type: DataTypes.STRING(36),
      allowNull: true,
    },
    assetType: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    inventoryName: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    inventoryDescription: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    inventoryNextPermissions: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    inventoryCurrentPermissions: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    invType: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    creatorID: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    inventoryBasePermissions: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    inventoryEveryOnePermissions: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    salePrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    saleType: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    creationDate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    groupID: {
      type: DataTypes.STRING(36),
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    groupOwned: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    flags: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    inventoryID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
      primaryKey: true,
    },
    avatarID: {
      type: DataTypes.CHAR(36),
      allowNull: true,
    },
    parentFolderID: {
      type: DataTypes.CHAR(36),
      allowNull: true,
    },
    inventoryGroupPermissions: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
    tableName: "inventoryitems",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "inventoryID" }],
      },
      {
        name: "inventoryitems_avatarid",
        using: "BTREE",
        fields: [{ name: "avatarID" }],
      },
      {
        name: "inventoryitems_parentFolderid",
        using: "BTREE",
        fields: [{ name: "parentFolderID" }],
      },
    ],
  }
);

module.exports = InventoryItems;
