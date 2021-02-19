const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const EstateManagers = db.define(
  "estate_managers",
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
    tableName: "estate_managers",
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

module.exports = EstateManagers;
