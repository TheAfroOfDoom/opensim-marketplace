const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const OSGroupsNotices = db.define(
  "os_groups_notices",
  {
    GroupID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "",
    },
    NoticeID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "",
      primaryKey: true,
    },
    TMStamp: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    FromName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
    },
    Subject: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
    },
    Message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    HasAttachment: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    AttachmentType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    AttachmentName: {
      type: DataTypes.STRING(128),
      allowNull: false,
      defaultValue: "",
    },
    AttachmentItemID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "",
    },
    AttachmentOwnerID: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
    },
  },
  {
    freezeTableName: true,
    tableName: "os_groups_notices",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "NoticeID" }],
      },
      {
        name: "GroupID",
        using: "BTREE",
        fields: [{ name: "GroupID" }],
      },
      {
        name: "TMStamp",
        using: "BTREE",
        fields: [{ name: "TMStamp" }],
      },
    ],
  }
);

module.exports = OSGroupsNotices;
