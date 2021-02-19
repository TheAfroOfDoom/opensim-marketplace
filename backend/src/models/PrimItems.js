const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const PrimItems = db.define(
  "primitems",
  {
    invType: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    assetType: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    creationDate: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    nextPermissions: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    currentPermissions: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    basePermissions: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    everyonePermissions: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    groupPermissions: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    flags: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    itemID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
    },
    primID: {
      type: DataTypes.CHAR(36),
      allowNull: true,
    },
    assetID: {
      type: DataTypes.CHAR(36),
      allowNull: true,
    },
    parentFolderID: {
      type: DataTypes.CHAR(36),
      allowNull: true,
    },
    CreatorID: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
    },
    ownerID: {
      type: DataTypes.CHAR(36),
      allowNull: true,
    },
    groupID: {
      type: DataTypes.CHAR(36),
      allowNull: true,
    },
    lastOwnerID: {
      type: DataTypes.CHAR(36),
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    tableName: "primitems",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "itemID" }],
      },
      {
        name: "primitems_primid",
        using: "BTREE",
        fields: [{ name: "primID" }],
      },
    ],
  }
);

module.exports = PrimItems;
