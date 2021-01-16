const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const Assets = db.define(
  "assets",
  {
    name: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
    description: { type: Sequelize.STRING(64), allowNull: false },
    assetType: { type: Sequelize.INTEGER, allowNull: false },
    local: { type: Sequelize.BOOLEAN, allowNull: false },
    temporary: { type: Sequelize.BOOLEAN, allowNull: false },
    data: { type: Sequelize.BLOB, allowNull: false },
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    create_time: { type: Sequelize.INTEGER },
    access_time: { type: Sequelize.INTEGER },
    asset_flags: { type: Sequelize.INTEGER, allowNull: false },
    CreatorID: { type: Sequelize.UUID, allowNull: false },
    public: { type: Sequelize.BOOLEAN },
    marketplace_icon: { type: Sequelize.BLOB },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Assets;
