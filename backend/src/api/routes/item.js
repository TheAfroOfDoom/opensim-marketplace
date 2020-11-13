const express = require("express");
const router = express.Router();
const sequelize = require("../../config/database");
const Assets = require("../../models/Assets");
const UserAccounts = require("../../models/UserAccounts");
const InventoryItems = require("../../models/InventoryItems");
const _ = require("lodash");

let builtinUUID = "11111111-1111-0000-0000-000100bba000";
let nilUUID = "00000000-0000-0000-0000-000000000000";

router.get("/", async (req, res) => {
  const { uuid } = req.cookies;
  if (uuid == undefined) throw new Error();
  const { id } = req.query;

  try {
    let itemInfo,
      userInfo,
      creator = false,
      invInfo;

    // Get Assets Table
    itemInfo = await Assets.findAll({
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
    console.log();
    //If there is an asset
    if (!_.isEmpty(itemInfo)) {
      if (
        itemInfo[0].CreatorID === builtinUUID ||
        itemInfo[0].CreatorID === nilUUID
      ) {
        //Creator is System
        creator = false;
      } else {
        // Get user based on Creator of asset
        userInfo = await UserAccounts.findAll({
          attributes: ["PrincipalID", "FirstName", "LastName"],
          where: { PrincipalID: itemInfo[0].CreatorID },
        });

        // If User exists and id equals current uuid
        if (!_.isEmpty(userInfo) && userInfo[0].PrincipalID === uuid) {
          creator = true;
        }
        invInfo = await InventoryItems.findAll({
          where: { avatarID: uuid, assetID: id },
        });
      }
      return res.status(200).send({
        itemInfo: itemInfo[0],
        userInfo: !_.isEmpty(userInfo) ? userInfo[0] : {},
        creator: creator,
        invInfo: !_.isEmpty(invInfo)
          ? { ...invInfo[0], inInventory: true }
          : { inInventory: false },
      });
    } else {
      return res.send({
        itemInfo: {},
        userInfo: {},
        creator: false,
        invInfo: { inInventory: false },
      });
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});
module.exports = router;

/*
app.get("/item", (req, res) => {
  const { id } = req.query;
  console.log(id);
  opensim.query(
    `SELECT * FROM assets WHERE id="${id}";`,
    (err, result, fields) => {

      let arr = [];

      for (let i = 0; i < result[0].data.length; i++) {
        arr.push(result[0].data[i]);
      }
      let j2k = openjpeg(arr, "j2k");
      var endString = "";
      for (var i = 0; i < j2k.data.length; i++) {
        endString += String.fromCharCode(parseInt(j2k.data[i], 2));
      }

      return res.send({ result, j2k, endString });

      return res.send({ result });
    }
  );
});
*/
