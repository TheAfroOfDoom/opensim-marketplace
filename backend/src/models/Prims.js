const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../config/database");

const Prims = db.define(
  "prims",
  {
    CreationDate: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Text: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    SitName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    TouchName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ObjectFlags: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    OwnerMask: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    NextOwnerMask: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    GroupMask: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    EveryoneMask: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    BaseMask: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    PositionX: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    PositionY: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    PositionZ: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    GroupPositionX: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    GroupPositionY: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    GroupPositionZ: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    VelocityX: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    VelocityY: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    VelocityZ: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    AngularVelocityX: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    AngularVelocityY: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    AngularVelocityZ: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    AccelerationX: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    AccelerationY: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    AccelerationZ: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    RotationX: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    RotationY: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    RotationZ: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    RotationW: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    SitTargetOffsetX: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    SitTargetOffsetY: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    SitTargetOffsetZ: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    SitTargetOrientW: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    SitTargetOrientX: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    SitTargetOrientY: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    SitTargetOrientZ: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    UUID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
    },
    RegionUUID: {
      type: DataTypes.CHAR(36),
      allowNull: true,
    },
    CreatorID: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
    },
    OwnerID: {
      type: DataTypes.CHAR(36),
      allowNull: true,
    },
    GroupID: {
      type: DataTypes.CHAR(36),
      allowNull: true,
    },
    LastOwnerID: {
      type: DataTypes.CHAR(36),
      allowNull: true,
    },
    SceneGroupID: {
      type: DataTypes.CHAR(36),
      allowNull: true,
    },
    PayPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    PayButton1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    PayButton2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    PayButton3: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    PayButton4: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    LoopedSound: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    LoopedSoundGain: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    TextureAnimation: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    OmegaX: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    OmegaY: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    OmegaZ: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    CameraEyeOffsetX: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    CameraEyeOffsetY: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    CameraEyeOffsetZ: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    CameraAtOffsetX: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    CameraAtOffsetY: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    CameraAtOffsetZ: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    ForceMouselook: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    ScriptAccessPin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    AllowedDrop: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    DieAtEdge: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    SalePrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
    },
    SaleType: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    ColorR: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    ColorG: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    ColorB: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    ColorA: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    ParticleSystem: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    ClickAction: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    Material: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 3,
    },
    CollisionSound: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    CollisionSoundVolume: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    LinkNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    PassTouches: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    MediaURL: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    DynAttrs: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    PhysicsShapeType: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    Density: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 1000,
    },
    GravityModifier: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 1,
    },
    Friction: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.6,
    },
    Restitution: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.5,
    },
    KeyframeMotion: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    tableName: "prims",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "UUID" }],
      },
      {
        name: "prims_regionuuid",
        using: "BTREE",
        fields: [{ name: "RegionUUID" }],
      },
      {
        name: "prims_scenegroupid",
        using: "BTREE",
        fields: [{ name: "SceneGroupID" }],
      },
    ],
  }
);

module.exports = Prims;
