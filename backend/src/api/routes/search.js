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
    if (uuid === undefined) throw new Error("Unauthorized");

    // Give relations
    UserAccounts.hasMany(Assets);
    Assets.belongsTo(UserAccounts);

    // Check if there is a valid search string
    let { searchString, assetType } = req.query;
    if (searchString === undefined) {
      searchString = "";
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

    return res.send(await getAssets(whereParams));
  } catch (e) {
    console.log(e);
    if (e.message === "Unauthorized") {
      return res.sendStatus(401);
    } else {
      return res.sendStatus(400);
    }
  }
});

router.get("/public", async (req, res) => {
  try {
    //Check if user is authenticated
    const { uuid } = req.cookies;
    if (uuid === undefined) throw new Error("Unauthorized");

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
      public: 1,
    };

    if (assetType !== undefined) {
      whereParams.assetType = assetType;
    }

    return res.send(await getAssets(whereParams));
  } catch (e) {
    console.log(e);
    if (e.message === "Unauthorized") {
      return res.sendStatus(401);
    } else {
      return res.sendStatus(400);
    }
  }
});

function getAssets(whereParams) {
  return Assets.findAll({
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

module.exports = router;
