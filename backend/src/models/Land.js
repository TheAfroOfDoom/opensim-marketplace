const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const Land = db.define(
  "land",
  {
    UUID: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
    },
    RegionUUID: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    LocalLandID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Bitmap: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    Name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    OwnerUUID: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    IsGroupOwned: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Area: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    AuctionID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Category: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ClaimDate: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ClaimPrice: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    GroupUUID: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    SalePrice: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    LandStatus: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    LandFlags: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    LandingType: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    MediaAutoScale: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    MediaTextureUUID: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    MediaURL: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    MusicURL: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    PassHours: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    PassPrice: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    SnapshotUUID: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    UserLocationX: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    UserLocationY: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    UserLocationZ: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    UserLookAtX: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    UserLookAtY: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    UserLookAtZ: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    AuthbuyerID: {
      type: DataTypes.STRING(36),
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    OtherCleanTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    Dwell: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    MediaType: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: "none/none",
    },
    MediaDescription: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
    },
    MediaSize: {
      type: DataTypes.STRING(16),
      allowNull: false,
      defaultValue: "0,0",
    },
    MediaLoop: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    ObscureMusic: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    ObscureMedia: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
    tableName: "land",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "UUID" }],
      },
    ],
  }
);

module.exports = Land;
