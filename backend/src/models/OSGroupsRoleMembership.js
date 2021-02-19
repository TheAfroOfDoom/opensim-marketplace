const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const OSGroupsRoleMembership = db.define(
  "os_groups_rolemembership",
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
    PrincipalID: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
      primaryKey: true,
    },
  },
  {
    freezeTableName: true,
    tableName: "os_groups_rolemembership",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "GroupID" },
          { name: "RoleID" },
          { name: "PrincipalID" },
        ],
      },
      {
        name: "PrincipalID",
        using: "BTREE",
        fields: [{ name: "PrincipalID" }],
      },
    ],
  }
);

module.exports = OSGroupsRoleMembership;
