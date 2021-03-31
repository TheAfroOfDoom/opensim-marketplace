const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const MarketplaceTags = db.define(
  "marketplace_tags",
  {
    id: { type: DataTypes.UUID, primaryKey: true },
    tag: {
      type: DataTypes.STRING(64),
    },
  },
  {
    freezeTableName: true,
    tableName: "marketplace_tags",
    timestamps: false,
  }
);

module.exports = MarketplaceTags;
