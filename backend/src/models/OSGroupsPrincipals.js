const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const OSGroupsPrincipals = db.define(
  "os_groups_principals",
  {
    PrincipalID: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
      primaryKey: true,
    },
    ActiveGroupID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "",
    },
  },
  {
    freezeTableName: true,
    tableName: "os_groups_principals",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "PrincipalID" }],
      },
    ],
  }
);

module.exports = OSGroupsPrincipals;
