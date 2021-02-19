const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const RegionSettings = db.define(
  "regionsettings",
  {
    regionUUID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
    },
    block_terraform: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    block_fly: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    allow_damage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    restrict_pushing: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    allow_land_resell: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    allow_land_join_divide: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    block_show_in_search: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    agent_limit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    object_bonus: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    maturity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    disable_scripts: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    disable_collisions: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    disable_physics: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    terrain_texture_1: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    terrain_texture_2: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    terrain_texture_3: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    terrain_texture_4: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    elevation_1_nw: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    elevation_2_nw: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    elevation_1_ne: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    elevation_2_ne: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    elevation_1_se: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    elevation_2_se: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    elevation_1_sw: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    elevation_2_sw: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    water_height: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    terrain_raise_limit: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    terrain_lower_limit: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    use_estate_sun: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fixed_sun: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sun_position: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    covenant: {
      type: DataTypes.CHAR(36),
      allowNull: true,
    },
    Sandbox: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    sunvectorx: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    sunvectory: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    sunvectorz: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    loaded_creation_id: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    loaded_creation_datetime: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    map_tile_ID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    TelehubObject: {
      type: DataTypes.STRING(36),
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    parcel_tile_ID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    covenant_datetime: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
    tableName: "regionsettings",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "regionUUID" }],
      },
    ],
  }
);

module.exports = RegionSettings;
