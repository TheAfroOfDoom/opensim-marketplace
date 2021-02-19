const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const RegionWindLight = db.define(
  "regionwindlight",
  {
    region_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      defaultValue: "000000-0000-0000-0000-000000000000",
      primaryKey: true,
    },
    water_color_r: {
      type: DataTypes.FLOAT(9, 6),
      allowNull: false,
      defaultValue: 4.0,
    },
    water_color_g: {
      type: DataTypes.FLOAT(9, 6),
      allowNull: false,
      defaultValue: 38.0,
    },
    water_color_b: {
      type: DataTypes.FLOAT(9, 6),
      allowNull: false,
      defaultValue: 64.0,
    },
    water_fog_density_exponent: {
      type: DataTypes.FLOAT(3, 1),
      allowNull: false,
      defaultValue: 4.0,
    },
    underwater_fog_modifier: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.25,
    },
    reflection_wavelet_scale_1: {
      type: DataTypes.FLOAT(3, 1),
      allowNull: false,
      defaultValue: 2.0,
    },
    reflection_wavelet_scale_2: {
      type: DataTypes.FLOAT(3, 1),
      allowNull: false,
      defaultValue: 2.0,
    },
    reflection_wavelet_scale_3: {
      type: DataTypes.FLOAT(3, 1),
      allowNull: false,
      defaultValue: 2.0,
    },
    fresnel_scale: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.4,
    },
    fresnel_offset: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.5,
    },
    refract_scale_above: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.03,
    },
    refract_scale_below: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.2,
    },
    blur_multiplier: {
      type: DataTypes.FLOAT(4, 3),
      allowNull: false,
      defaultValue: 0.04,
    },
    big_wave_direction_x: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 1.05,
    },
    big_wave_direction_y: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: -0.42,
    },
    little_wave_direction_x: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 1.11,
    },
    little_wave_direction_y: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: -1.16,
    },
    normal_map_texture: {
      type: DataTypes.STRING(36),
      allowNull: false,
      defaultValue: "822ded49-9a6c-f61c-cb89-6df54f42cdf4",
    },
    horizon_r: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.25,
    },
    horizon_g: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.25,
    },
    horizon_b: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.32,
    },
    horizon_i: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.32,
    },
    haze_horizon: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.19,
    },
    blue_density_r: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.12,
    },
    blue_density_g: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.22,
    },
    blue_density_b: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.38,
    },
    blue_density_i: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.38,
    },
    haze_density: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.7,
    },
    density_multiplier: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.18,
    },
    distance_multiplier: {
      type: DataTypes.FLOAT(4, 1),
      allowNull: false,
      defaultValue: 0.8,
    },
    max_altitude: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1605,
    },
    sun_moon_color_r: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.24,
    },
    sun_moon_color_g: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.26,
    },
    sun_moon_color_b: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.3,
    },
    sun_moon_color_i: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.3,
    },
    sun_moon_position: {
      type: DataTypes.FLOAT(4, 3),
      allowNull: false,
      defaultValue: 0.317,
    },
    ambient_r: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.35,
    },
    ambient_g: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.35,
    },
    ambient_b: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.35,
    },
    ambient_i: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.35,
    },
    east_angle: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    sun_glow_focus: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.1,
    },
    sun_glow_size: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 1.75,
    },
    scene_gamma: {
      type: DataTypes.FLOAT(4, 2),
      allowNull: false,
      defaultValue: 1.0,
    },
    star_brightness: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    cloud_color_r: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.41,
    },
    cloud_color_g: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.41,
    },
    cloud_color_b: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.41,
    },
    cloud_color_i: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.41,
    },
    cloud_x: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 1.0,
    },
    cloud_y: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.53,
    },
    cloud_density: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 1.0,
    },
    cloud_coverage: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.27,
    },
    cloud_scale: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.42,
    },
    cloud_detail_x: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 1.0,
    },
    cloud_detail_y: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.53,
    },
    cloud_detail_density: {
      type: DataTypes.FLOAT(3, 2),
      allowNull: false,
      defaultValue: 0.12,
    },
    cloud_scroll_x: {
      type: DataTypes.FLOAT(4, 2),
      allowNull: false,
      defaultValue: 0.2,
    },
    cloud_scroll_x_lock: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    cloud_scroll_y: {
      type: DataTypes.FLOAT(4, 2),
      allowNull: false,
      defaultValue: 0.01,
    },
    cloud_scroll_y_lock: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    draw_classic_clouds: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    freezeTableName: true,
    tableName: "regionwindlight",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "region_id" }],
      },
    ],
  }
);

module.exports = RegionWindLight;
