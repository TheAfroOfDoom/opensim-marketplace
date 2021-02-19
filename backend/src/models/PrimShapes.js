const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const PrimShapes = db.define(
  "primshapes",
  {
    Shape: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ScaleX: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    ScaleY: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    ScaleZ: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    PCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    PathBegin: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    PathEnd: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    PathScaleX: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    PathScaleY: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    PathShearX: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    PathShearY: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    PathSkew: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    PathCurve: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    PathRadiusOffset: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    PathRevolutions: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    PathTaperX: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    PathTaperY: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    PathTwist: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    PathTwistBegin: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ProfileBegin: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ProfileEnd: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ProfileCurve: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ProfileHollow: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    State: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Texture: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    ExtraParams: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    UUID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
    },
    Media: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    tableName: "primshapes",
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

module.exports = PrimShapes;
