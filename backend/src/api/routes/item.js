const express = require("express");
const router = express.Router();
const sequelize = require("../../config/database");
const Assets = require("../../models/Assets");
const Tokens = require("../../models/Tokens");
const UserAccounts = require("../../models/UserAccounts");
const InventoryItems = require("../../models/InventoryItems");
const _ = require("lodash");
const {
  isUserLoggedIn,
  isAssetInDatabase,
  openjpeg,
  returnError,
  checkAuth,
} = require("../util.js");

const { opensimCreatorIDs } = require("../types.js");

/**
 * @swagger
 * /item:
 *   get:
 *     tags:
 *       - Item
 *     description: Get advanced information about asset
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of asset
 *     responses:
 *       200:
 *         description: Successfully retrieved item information
 */

router.get("/", checkAuth, async (req, res) => {
  try {
    const { sid } = req.cookies;

    // Get assetID param
    const { id } = req.query;

    if (!(await isAssetInDatabase(id))) {
      throw new Error("Invalid ID");
    }

    const template = {
      itemInfo: {},
      userInfo: {},
      creator: false,
      invInfo: { inInventory: false },
    };

    // Get Item Info
    const itemInfo = await getAssetInfo(id);
    template.itemInfo = itemInfo;

    let uuidFromToken = await Tokens.findOne({
      attributes: ["uuid"],
      where: { token: sid },
    });

    console.log(uuidFromToken);

    // Check if the creator is not the system
    if (!opensimCreatorIDs.includes(itemInfo.CreatorID)) {
      const userInfo = await getUserInfo(itemInfo.CreatorID);
      console.log(userInfo);
      template.userInfo = userInfo;
    } else {
      template.userInfo = {
        PrincipalID: itemInfo.CreatorID,
        FirstName: "Default",
        LastName: "Asset",
      };
    }

    //Get info on item in inventory
    invInfo = await getInventoryInfo(uuidFromToken.dataValues.uuid, id);

    // Set creator field
    template.creator = uuidFromToken.dataValues.uuid === itemInfo.CreatorID;

    if (invInfo !== null && !_.isEmpty(invInfo)) {
      template.invInfo = { ...invInfo.dataValues, inInventory: true };
    } else {
      template.invInfo = { inInventory: false };
    }

    return res.json(template);
  } catch (e) {
    return returnError(e, res);
  }
});

async function getAssetInfo(id) {
  return Assets.findOne({
    attributes: [
      "name",
      "description",
      "assetType",
      "id",
      "create_time",
      "access_time",
      "public",
      "CreatorID",
    ],
    where: { id },
  });
}

async function getUserInfo(creatorID) {
  return UserAccounts.findOne({
    attributes: ["PrincipalID", "FirstName", "LastName"],
    where: { PrincipalID: creatorID },
  });
}

async function getInventoryInfo(uuid, id) {
  return InventoryItems.findOne({
    where: { avatarID: uuid, assetID: id },
  });
}

module.exports = router;
