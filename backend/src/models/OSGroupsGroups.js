const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const OSGroupsGroups = db.define(
  "os_groups_groups",
  {
    GroupID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "",
      primaryKey: true,
    },
    Location: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
    },
    Name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
      unique: "Name",
    },
    Charter: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    InsigniaID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "",
    },
    FounderID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "",
    },
    MembershipFee: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    OpenEnrollment: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
    },
    ShowInList: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    AllowPublish: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    MaturePublish: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    OwnerRoleID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "",
    },
  },
  {
    freezeTableName: true,
    tableName: "os_groups_groups",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "GroupID" }],
      },
      {
        name: "Name",
        unique: true,
        using: "BTREE",
        fields: [{ name: "Name" }],
      },
      {
        name: "Name_2",
        type: "FULLTEXT",
        fields: [{ name: "Name" }],
      },
    ],
  }
);

module.exports = OSGroupsGroups;
