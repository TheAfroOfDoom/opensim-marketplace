const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const sequelize = require("../../config/database");
const Assets = require("../../models/Assets");
const UserAccounts = require("../../models/UserAccounts");
const _ = require("lodash");
const {
  isUserLoggedIn,
  openjpeg,
  setCacheItem,
  getCacheItem,
  objectFilter,
} = require("../util.js");
const { assetTypes } = require("../types.js");

/**
 * @swagger
 * /search:
 *   get:
 *     tags:
 *       - Search
 *     description: Search databases for public and system created assets
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: cookie
 *         name: sid
 *         type: string
 *         description: User access token
 *       - in: query
 *         name: searchString
 *         type: string
 *         required: false
 *         description: Asset name to search for
 *       - in: query
 *         name: assetType
 *         type: number
 *         required: false
 *         description: ID of asset type. refer to [OpenSim documentation](http://opensimulator.org/wiki/Assets#assetType)
 *       - in: query
 *         name: limit
 *         type: number
 *         required: false
 *         description: Maximum number of objects in response
 *       - in: query
 *         name: offset
 *         type: number
 *         required: false
 *         description: Offset from first found object (for paginiation)
 *       - in: query
 *         name: order
 *         type: string
 *         required: false
 *         default: NAME_ASC
 *         description: >
 *           Sort returned assets <br>
 *           Options: <br>
 *           * CREATE_ASC <br>
 *           * CREATE_DESC <br>
 *           * NAME_ASC <br>
 *           * NAME_DESC <br>
 *           * ACCESS_ASC <br>
 *           * ACCESS_DESC <br>
 *     responses:
 *       200:
 *         description: Return array of like objects
 */
router.get("/", async (req, res) => {
  try {
    //Check if user is authenticated
    const { sid } = req.cookies;

    if (!(await isUserLoggedIn(sid))) {
      throw new Error("Unauthorized");
    }

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
    console.log(e);
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

/**
 * @swagger
 * /search/public:
 *   get:
 *     tags:
 *       - Search
 *     description: Search databases for public and system created assets
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: cookie
 *         name: sid
 *         type: string
 *         description: User access token
 *       - in: query
 *         name: searchString
 *         type: string
 *         required: false
 *         description: Asset name to search for
 *       - in: query
 *         name: assetType
 *         type: number
 *         required: false
 *         description: ID of asset type. refer to [OpenSim documentation](http://opensimulator.org/wiki/Assets#assetType)
 *       - in: query
 *         name: limit
 *         type: number
 *         required: false
 *         description: Maximum number of objects in response
 *       - in: query
 *         name: offset
 *         type: number
 *         required: false
 *         description: Offset from first found object (for paginiation)
 *       - in: query
 *         name: order
 *         type: string
 *         required: false
 *         default: NAME_ASC
 *         description: >
 *           Sort returned assets <br>
 *           Options: <br>
 *           * CREATE_ASC <br>
 *           * CREATE_DESC <br>
 *           * NAME_ASC <br>
 *           * NAME_DESC <br>
 *           * ACCESS_ASC <br>
 *           * ACCESS_DESC <br>
 *     responses:
 *       200:
 *         description: Return array of like objects
 */
router.get("/public", async (req, res) => {
  try {
    //Check if user is authenticated
    const { sid } = req.cookies;

    if (!(await isUserLoggedIn(sid))) {
      throw new Error("Unauthorized");
    }
    // Give relations
    UserAccounts.hasMany(Assets);
    Assets.belongsTo(UserAccounts);

    //Params accepted by api-
    let {
      searchString,
      assetType,
      limit,
      offset,
      order,
      startCreated,
      endCreated,
      startAccessed,
      endAccessed,
    } = req.query;
    // Check if there is a valid search string
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
      ...getTimeParams(req.query),
    };

    if (assetType !== undefined) {
      whereParams.assetType = assetType;
    }
    let orderParam = { order: getSort(order) };

    let limitParam =
      limit !== undefined ? { limit: parseInt(limit) } : { limit: 24 };

    let offsetParam = offset !== undefined ? { offset: parseInt(offset) } : {};

    let params = {
      where: { ...whereParams },
      ...limitParam,
      ...offsetParam,
      ...orderParam,
    };

    let count = await Assets.count({ where: { ...whereParams } });

    let assets = await getAssets(params);

    stats = new Object();
    //Convert data
    for (const [key, value] of Object.entries(assetTypes)) {
      stats[`${key}`] = assets.filter(
        (x) => value === x.dataValues.assetType
      ).length;
    }
    stats = objectFilter(stats, (s) => s !== 0);
    /*
    const x = await Promise.all(assets.map((obj) => getConvertedObject(obj)));


    console.log(x);
    return res.send({ data: x, stats });
    */

    return res.send({ data: assets, stats, count });
  } catch (e) {
    console.log(e);
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
    case "CREATE_DESC":
      return [["create_time", "DESC"]];
    case "NAME_ASC":
      return [["name", "ASC"]];
    case "NAME_DESC":
      return [["name", "DESC"]];
    case "ACCESS_ASC":
      return [["access_time", "ASC"]];
    case "ACCESS_DESC":
      return [["access_time", "DESC"]];
    default:
      return [["name", "ASC"]];
  }
}

function getTimeParams({
  startCreated,
  endCreated,
  startAccessed,
  endAccessed,
}) {
  let where = {};
  if (startCreated != undefined) {
    if (endCreated != undefined) {
      // 1 1
      where.create_time = {
        [Op.and]: [{ [Op.gte]: startCreated }, { [Op.lte]: endCreated }],
      };
    } else {
      // 1 0
      where.create_time = { [Op.gte]: startCreated };
    }
  } else {
    // 0 1
    if (endCreated != undefined) {
      where.create_time = { [Op.lte]: endCreated };
    }
    // 0 0
  }
  if (startAccessed !== undefined) {
    if (endAccessed !== undefined) {
      // 1 1
      where.access_time = {
        [Op.and]: [{ [Op.gte]: startAccessed }, { [Op.lte]: endAccessed }],
      };
    } else {
      // 1 0
      where.access_time = { [Op.gte]: startAccessed };
    }
  } else {
    // 0 1
    if (endAccessed !== undefined) {
      where.access_time = { [Op.lte]: endAccessed };
    }
    // 0 0
  }
  return where;
}

module.exports = router;
