const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const Presence = db.define(
  "presence",
  {
    UserID: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    RegionID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    SessionID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    SecureSessionID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    LastSeen: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    tableName: "presence",
    timestamps: false,
    indexes: [
      {
        name: "SessionID",
        unique: true,
        using: "BTREE",
        fields: [{ name: "SessionID" }],
      },
      {
        name: "UserID",
        using: "BTREE",
        fields: [{ name: "UserID" }],
      },
    ],
  }
);

module.exports = Presence;
