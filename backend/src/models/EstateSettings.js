const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const EstateSettings = db.define(
  "estate_settings",
  {
    EstateID: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    EstateName: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    AbuseEmailToEstateOwner: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    DenyAnonymous: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    ResetHomeOnTeleport: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    FixedSun: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    DenyTransacted: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    BlockDwell: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    DenyIdentified: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    AllowVoice: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    UseGlobalTime: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    PricePerMeter: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    TaxFree: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    AllowDirectTeleport: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    RedirectGridX: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    RedirectGridY: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ParentEstateID: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    SunPosition: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    EstateSkipScripts: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    BillableFactor: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    PublicAccess: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    AbuseEmail: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    EstateOwner: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
    DenyMinors: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    AllowLandmark: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
    AllowParcelChanges: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
    AllowSetHome: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    freezeTableName: true,
    tableName: "estate_settings",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "EstateID" }],
      },
    ],
  }
);

module.exports = EstateSettings;
