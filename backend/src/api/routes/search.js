const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const sequelize = require("../../config/database");
const Assets = require("../../models/Assets");
const UserAccounts = require("../../models/UserAccounts");
const _ = require("lodash");

router.get("/", async (req, res) => {
  try {
    //Check if user is authenticated
    const { uuid } = req.cookies;
    if (uuid === undefined) throw new Error();

    // Check if there is a valid search string
    let { searchString, assetType } = req.query;
    if (searchString === undefined) {
      searchString = "";
    }

    UserAccounts.hasMany(Assets);
    Assets.belongsTo(UserAccounts);

    let searchInfo;
    if (assetType == undefined) {
      // Search for all assets
      searchInfo = await Assets.findAll({
        where: {
          name: { [Op.like]: `%${searchString}%` },
          [Op.or]: [{ public: 1 }, { builtin: 1 }],
        },
        attributes: [
          "name",
          "description",
          "assetType",
          "id",
          "create_time",
          "CreatorID",
          "access_time",
        ],
        include: [
          {
            model: UserAccounts,
            attributes: ["FirstName", "LastName"],
            required: true,
            on: {
              col1: sequelize.where(
                sequelize.col("assets.CreatorID"),
                "=",
                sequelize.col("useraccount.PrincipalID")
              ),
            },
          },
        ],
      });
    } else {
      // Search for all assets of type
      searchInfo = await Assets.findAll({
        where: {
          name: { [Op.like]: `%${searchString}%` },
          [Op.or]: [{ public: 1 }, { builtin: 1 }],
          assetType: assetType,
        },
        attributes: [
          "name",
          "description",
          "assetType",
          "id",
          "create_time",
          "CreatorID",
          "access_time",
        ],
        include: [
          {
            model: UserAccounts,
            attributes: ["FirstName", "LastName"],
            required: true,
            on: {
              col1: sequelize.where(
                sequelize.col("assets.CreatorID"),
                "=",
                sequelize.col("useraccount.PrincipalID")
              ),
            },
          },
        ],
      });
    }

    let invInfo = await Assets.findAll({
      attributes: [
        "name",
        "description",
        "assetType",
        "id",
        "create_time",
        "CreatorID",
        "access_time",
      ],
      include: [
        {
          model: UserAccounts,
          attributes: ["FirstName", "LastName"],
          required: true,
          on: {
            col1: sequelize.where(
              sequelize.col("assets.CreatorID"),
              "=",
              sequelize.col("useraccount.PrincipalID")
            ),
          },
        },
      ],
    });

    return res.send(searchInfo);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.get("/public", async (req, res) => {
  try {
    //Check if user is authenticated
    const { uuid } = req.cookies;
    if (uuid === undefined) throw new Error();

    // Give relations
    UserAccounts.hasMany(Assets);
    Assets.belongsTo(UserAccounts);

    // Check if there is a valid search string
    let { searchString, assetType } = req.query;
    if (searchString === undefined) {
      searchString = "";
    }

    //Assign query params
    let whereParams = {
      name: { [Op.like]: `%${searchString}%` },
      [Op.or]: [{ public: 1 }, { builtin: 1 }],
    };

    if (assetType !== undefined) {
      whereParams.assetType = assetType;
    }

    // Search for all assets
    const searchInfo = await Assets.findAll({
      where: {
        ...whereParams,
      },
      attributes: [
        "name",
        "description",
        "assetType",
        "id",
        "create_time",
        "CreatorID",
        "access_time",
      ],
      include: [
        {
          model: UserAccounts,
          attributes: ["FirstName", "LastName"],
          required: true,
          on: {
            col1: sequelize.where(
              sequelize.col("assets.CreatorID"),
              "=",
              sequelize.col("useraccount.PrincipalID")
            ),
          },
        },
      ],
    });

    return res.send(searchInfo);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.get("/builtin", async (req, res) => {
  try {
    //Check if user is authenticated
    const { uuid } = req.cookies;
    if (uuid === undefined) throw new Error();

    // Check if there is a valid search string
    let { searchString, assetType } = req.query;
    if (searchString === undefined) {
      searchString = "";
    }

    UserAccounts.hasMany(Assets);
    Assets.belongsTo(UserAccounts);

    let searchInfo;
    if (assetType == undefined) {
      // Search for all assets
      searchInfo = await Assets.findAll({
        where: {
          name: { [Op.like]: `%${searchString}%` },
          builtin: 1,
        },
        attributes: [
          "name",
          "description",
          "assetType",
          "id",
          "create_time",
          "CreatorID",
          "access_time",
        ],
        include: [
          {
            model: UserAccounts,
            attributes: ["FirstName", "LastName"],
            required: true,
            on: {
              col1: sequelize.where(
                sequelize.col("assets.CreatorID"),
                "=",
                sequelize.col("useraccount.PrincipalID")
              ),
            },
          },
        ],
      });
    } else {
      // Search for all assets of type
      searchInfo = await Assets.findAll({
        where: {
          name: { [Op.like]: `%${searchString}%` },
          [Op.or]: [{ public: 1 }, { builtin: 1 }],
          assetType: assetType,
        },
        attributes: [
          "name",
          "description",
          "assetType",
          "id",
          "create_time",
          "CreatorID",
          "access_time",
        ],
        include: [
          {
            model: UserAccounts,
            attributes: ["FirstName", "LastName"],
            required: true,
            on: {
              col1: sequelize.where(
                sequelize.col("assets.CreatorID"),
                "=",
                sequelize.col("useraccount.PrincipalID")
              ),
            },
          },
        ],
      });
    }

    let invInfo = await Assets.findAll({
      attributes: [
        "name",
        "description",
        "assetType",
        "id",
        "create_time",
        "CreatorID",
        "access_time",
      ],
      include: [
        {
          model: UserAccounts,
          attributes: ["FirstName", "LastName"],
          required: true,
          on: {
            col1: sequelize.where(
              sequelize.col("assets.CreatorID"),
              "=",
              sequelize.col("useraccount.PrincipalID")
            ),
          },
        },
      ],
    });

    return res.send(searchInfo);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

module.exports = router;
