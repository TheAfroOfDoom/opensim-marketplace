const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const Friends = db.define(
  "friends",
  {
    PrincipalID: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
      primaryKey: true,
    },
    Friend: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
    },
    Flags: {
      type: DataTypes.STRING(16),
      allowNull: false,
      defaultValue: "0",
    },
    Offered: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: "0",
    },
  },
  {
    freezeTableName: true,
    tableName: "friends",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "PrincipalID", length: 36 },
          { name: "Friend", length: 36 },
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

module.exports = Friends;
