const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const OSGroupsRoles = db.define(
  "os_groups_roles",
  {
    GroupID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "",
      primaryKey: true,
    },
    RoleID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "",
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
    },
    Description: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
    },
    Title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
    },
    Powers: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
    tableName: "os_groups_roles",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "GroupID" }, { name: "RoleID" }],
      },
      {
        name: "GroupID",
        using: "BTREE",
        fields: [{ name: "GroupID" }],
      },
    ],
  }
);

module.exports = OSGroupsRoles;
