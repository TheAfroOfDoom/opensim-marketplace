const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const IMOffline = db.define(
  "im_offline",
  {
    ID: {
      autoIncrement: true,
      type: DataTypes.MEDIUMINT,
      allowNull: false,
      primaryKey: true,
    },
    PrincipalID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "",
    },
    Message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    TMStamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "im_offline",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "ID" }],
      },
      {
        name: "PrincipalID",
        using: "BTREE",
        fields: [{ name: "PrincipalID" }],
      },
    ],
  }
);

module.exports = IMOffline;
