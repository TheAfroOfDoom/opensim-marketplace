const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const OSGroupsMembership = db.define(
  "os_groups_membership",
  {
    GroupID: {
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
    SelectedRoleID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "",
    },
    Contribution: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    ListInProfile: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    AcceptNotices: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    AccessToken: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "",
    },
  },
  {
    freezeTableName: true,
    tableName: "os_groups_membership",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "GroupID" }, { name: "PrincipalID" }],
      },
      {
        name: "PrincipalID",
        using: "BTREE",
        fields: [{ name: "PrincipalID" }],
      },
    ],
  }
);

module.exports = OSGroupsMembership;
