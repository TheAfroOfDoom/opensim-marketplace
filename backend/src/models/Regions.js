const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const Regions = db.define(
  "regions",
  {
    uuid: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true,
    },
    regionHandle: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    regionName: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    regionRecvKey: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    regionSendKey: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    regionSecret: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    regionDataURI: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    serverIP: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    serverPort: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    serverURI: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    locX: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    locY: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    locZ: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    eastOverrideHandle: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
    },
    westOverrideHandle: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
    },
    southOverrideHandle: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
    },
    northOverrideHandle: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
    },
    regionAssetURI: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    regionAssetRecvKey: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    regionAssetSendKey: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    regionUserURI: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    regionUserRecvKey: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    regionUserSendKey: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    regionMapTexture: {
      type: DataTypes.STRING(36),
      allowNull: true,
    },
    serverHttpPort: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    serverRemotingPort: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    owner_uuid: {
      type: DataTypes.STRING(36),
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    originUUID: {
      type: DataTypes.STRING(36),
      allowNull: true,
    },
    access: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: 1,
    },
    ScopeID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    sizeX: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    sizeY: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    flags: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    last_seen: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    PrincipalID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    Token: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    parcelMapTexture: {
      type: DataTypes.STRING(36),
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    tableName: "regions",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "uuid" }],
      },
      {
        name: "regionName",
        using: "BTREE",
        fields: [{ name: "regionName" }],
      },
      {
        name: "regionHandle",
        using: "BTREE",
        fields: [{ name: "regionHandle" }],
      },
      {
        name: "overrideHandles",
        using: "BTREE",
        fields: [
          { name: "eastOverrideHandle" },
          { name: "westOverrideHandle" },
          { name: "southOverrideHandle" },
          { name: "northOverrideHandle" },
        ],
      },
      {
        name: "ScopeID",
        using: "BTREE",
        fields: [{ name: "ScopeID" }],
      },
      {
        name: "flags",
        using: "BTREE",
        fields: [{ name: "flags" }],
      },
    ],
  }
);

module.exports = Regions;
