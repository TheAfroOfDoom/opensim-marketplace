const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const sequelize = require("../../config/database");
const Assets = require("../../models/Assets");
const UserAccounts = require("../../models/UserAccounts");
const _ = require("lodash");
const validate = require("uuid-validate");

router.get("/", async (req, res) => {
  try {
    ///Check if user is authenticated
    const { uuid } = req.cookies;
    if (!validate(uuid)) throw new Error("Unauthorized");

    // Give relations
    UserAccounts.hasMany(Assets);
    Assets.belongsTo(UserAccounts);

    // Check if there is a valid search string
    let { searchString, assetType, limit, offset, order } = req.query;
    if (searchString === undefined) {
      searchString = "";
    }

    if (!(typeof searchString === "string" || searchString instanceof String)) {
      throw new Error("Search String must be string");
    }

    //Assign query params
    let opensimCreatorIDs = [
      "11111111-1111-0000-0000-000100bba000",
      "00000000-0000-0000-0000-000000000000",
    ];

    let whereParams = {
      name: { [Op.like]: `%${searchString}%` },
      [Op.or]: [
        { public: 1 },
        ...opensimCreatorIDs.map((id) => {
          return { CreatorID: id };
        }),
      ],
    };

    if (assetType !== undefined) {
      whereParams.assetType = assetType;
    }

    let orderParam = { order: getSort(order) };

    let limitParam = limit !== undefined ? { limit: parseInt(limit) } : {};

    let offsetParam = offset !== undefined ? { offset: parseInt(offset) } : {};

    let params = {
      where: { ...whereParams },
      ...limitParam,
      ...offsetParam,
      ...orderParam,
    };

    return res.send(await getAssets(params));
  } catch (e) {
    //console.log(e);
    if (e.message === "Unauthorized") {
      return res.sendStatus(401);
    }
    if (e.message === "Search String must be string") {
      return res.status(400).send("Search String must be string");
    } else {
      return res.sendStatus(400);
    }
  }
});

router.get("/public", async (req, res) => {
  try {
    //Check if user is authenticated
    const { uuid } = req.cookies;
    if (!validate(uuid)) throw new Error("Unauthorized");

    // Give relations
    UserAccounts.hasMany(Assets);
    Assets.belongsTo(UserAccounts);

    // Check if there is a valid search string
    let { searchString, assetType, limit, offset, order } = req.query;
    if (searchString === undefined) {
      searchString = "";
    }

    if (!(typeof searchString === "string" || searchString instanceof String)) {
      throw new Error("Search String must be string");
    }

    //Assign query params
    let whereParams = {
      name: { [Op.like]: `%${searchString}%` },
      public: 1,
    };

    if (assetType !== undefined) {
      whereParams.assetType = assetType;
    }

    let orderParam = { order: getSort(order) };

    let limitParam = limit !== undefined ? { limit: parseInt(limit) } : {};

    let offsetParam = offset !== undefined ? { offset: parseInt(offset) } : {};

    let params = {
      where: { ...whereParams },
      ...limitParam,
      ...offsetParam,
      ...orderParam,
    };

    return res.send(await getAssets(params));
  } catch (e) {
    //console.log(e);
    if (e.message === "Unauthorized") {
      return res.sendStatus(401);
    }
    if (e.message === "Search String must be string") {
      return res.status(400).send("Search String must be string");
    } else {
      return res.sendStatus(400);
    }
  }
});

function getAssets(params) {
  return Assets.findAll({
    ...params,
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
        //required: true,
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

function getSort(order) {
  switch (order) {
    case "CREATE_ASC":
      return [["create_time", "ASC"]];
      break;
    case "CREATE_DESC":
      return [["create_time", "DESC"]];
      break;
    case "NAME_ASC":
      return [["name", "ASC"]];
      break;
    case "NAME_DESC":
      return [["name", "DESC"]];
      break;
    case "ACCESS_ASC":
      return [["access_time", "ASC"]];
      break;
    case "ACCESS_DESC":
      return [["access_time", "DESC"]];
      break;
    default:
      return [["name", "ASC"]];
  }
}

module.exports = router;
