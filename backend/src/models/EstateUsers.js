const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const EstateUsers = db.define(
  "estate_users",
  {
    EstateID: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "estate_users",
    timestamps: false,
    indexes: [
      {
        name: "EstateID",
        using: "BTREE",
        fields: [{ name: "EstateID" }],
      },
    ],
  }
);

module.exports = EstateUsers;
