const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const Tokens = db.define(
  "tokens",
  {
    UUID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    validity: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "tokens",
    timestamps: false,
    indexes: [
      {
        name: "uuid_token",
        unique: true,
        using: "BTREE",
        fields: [{ name: "UUID" }, { name: "token" }],
      },
      {
        name: "UUID",
        using: "BTREE",
        fields: [{ name: "UUID" }],
      },
      {
        name: "token",
        using: "BTREE",
        fields: [{ name: "token" }],
      },
      {
        name: "validity",
        using: "BTREE",
        fields: [{ name: "validity" }],
      },
    ],
  }
);

module.exports = Tokens;
