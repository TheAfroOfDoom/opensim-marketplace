const express = require("express");
const router = express.Router();
const sequelize = require("../../config/database");
const Assets = require("../../models/Assets");
const UserAccounts = require("../../models/UserAccounts");
const InventoryItems = require("../../models/InventoryItems");
const _ = require("lodash");
const uuid = require("uuid");

router.get("/", async (req, res) => {
  try {
    //Check if user is authenticated
    const { uuid } = req.cookies;
    if (uuid == undefined) throw new Error("Unauthorized");

    // Get assetID param
    const { id } = req.query;

    if (!uuid.validate(id)) throw new Error();

    let userInfo,
      creator = false,
      invInfo;

    // List of OpenSims builtin IDs
    let opensimCreatorIDs = [
      "11111111-1111-0000-0000-000100bba000",
      "00000000-0000-0000-0000-000000000000",
    ];

    // Get Asset from Assets table
    const [itemInfo] = await Assets.findAll({
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
      where: { id: id },
    });

    //If there is an asset
    if (!_.isEmpty(itemInfo)) {
      if (opensimCreatorIDs.includes(itemInfo.CreatorID)) {
        //Creator is System
        creator = false;
      } else {
        // Get user based on Creator of asset
        [userInfo] = await UserAccounts.findAll({
          attributes: ["PrincipalID", "FirstName", "LastName"],
          where: { PrincipalID: itemInfo.CreatorID },
        });

        // If User exists and id equals current uuid
        if (!_.isEmpty(userInfo) && userInfo.PrincipalID === uuid) {
          creator = true;
        }

        //Get info on item in inventory
        [invInfo] = await InventoryItems.findAll({
          where: { avatarID: uuid, assetID: id },
        });
      }

      //Construct response object
      return res.status(200).send({
        itemInfo: itemInfo,
        userInfo: !_.isEmpty(userInfo) ? userInfo : {},
        creator: creator,
        invInfo: !_.isEmpty(invInfo)
          ? { ...invInfo.dataValues, inInventory: true }
          : { inInventory: false },
      });
    } else {
      //No asset. Return all empty objects
      return res.send({
        itemInfo: {},
        userInfo: {},
        creator: false,
        invInfo: { inInventory: false },
      });
    }
  } catch (e) {
    console.log(e);
    if (e.message === "Unauthorized") {
      return res.sendStatus(401);
    } else {
      return res.sendStatus(400);
    }
  }
});

module.exports = router;

/*
  let arr = [];

  for (let i = 0; i < result[0].data.length; i++) {
    arr.push(result[0].data[i]);
  }
  let j2k = openjpeg(arr, "j2k");
*/
