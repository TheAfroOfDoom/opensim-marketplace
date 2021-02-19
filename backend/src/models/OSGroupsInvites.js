const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const OSGroupsInvites = db.define(
  "os_groups_invites",
  {
    InviteID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "",
      primaryKey: true,
    },
    GroupID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "",
    },
    RoleID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "",
    },
    PrincipalID: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
    },
    TMStamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "os_groups_invites",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "InviteID" }],
      },
      {
        name: "PrincipalGroup",
        unique: true,
        using: "BTREE",
        fields: [{ name: "GroupID" }, { name: "PrincipalID" }],
      },
    ],
  }
);

module.exports = OSGroupsInvites;
