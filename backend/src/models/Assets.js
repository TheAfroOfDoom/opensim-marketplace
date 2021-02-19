const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const Assets = db.define(
  "assets",
  {
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    assetType: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    local: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    temporary: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    data: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
      primaryKey: true,
    },
    create_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    access_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    asset_flags: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    CreatorID: {
      type: DataTypes.STRING(128),
      allowNull: false,
      defaultValue: "",
    },
    public: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    marketplace_icon: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    tableName: "assets",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }],
      },
    ],
  }
);

module.exports = Assets;
