const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const sequelize = require("../../config/database");
const Assets = require("../../models/Assets");
const UserAccounts = require("../../models/UserAccounts");
const _ = require("lodash");
const {
  isUserLoggedIn,
  isAssetInDatabase,
  convertImage,
} = require("../util.js");
const { assetTypes } = require("../types.js");

router.get("/get", async (req, res) => {
  try {
    //Check if user is authenticated
    const { uuid } = req.cookies;
    /*
    if (!(await isUserLoggedIn(uuid))) {
      throw new Error("Unauthorized");
    }
    */

    // Get assetID param
    const { assetID, img_data } = req.query;

    if (!(await isAssetInDatabase(assetID))) {
      throw new Error("Invalid ID");
    }

    // Get Marketplace Icon
    let asset = await Assets.findOne({
      attributes: ["marketplace_icon", "assetType"],
      where: { id: assetID },
    });

    if (asset.dataValues.marketplace_icon === null) {
      if (asset.dataValues.assetType === assetTypes.TEXTURE) {
        // IS A TEXTURE. HANDLE CONVERSION
        let marketplace_raw = await Assets.findOne({
          attributes: ["data"],
          where: { id: assetID },
        });
        let j2k = await convertImage(
          asset.dataValues.assetType,
          marketplace_raw.dataValues.data
        );

        Assets.update(
          { marketplace_icon: JSON.stringify(j2k) },
          { where: { id: assetID } }
        );

        //Assets.update({ marketplace_icon: j2k }, { where: { id: assetID } });

        return res.send({ data: j2k });
      } else {
        // IS NOT A TEXTURE. RETURN DEFAULT IMAGE OR NULL
        return res.send({ data: null });
      }
    } else {
      console.log(asset);
      console.log(asset.marketplace_icon);
      return res.send({
        data: JSON.parse(asset.dataValues.marketplace_icon),
      });
    }
  } catch (e) {
    console.log(e);
    if (e.message === "Unauthorized") {
      return res.send(401);
    } else if (e.message === "Invalid ID") {
      return res.status(400).json({ statusCode: 400, message: "Invalid ID" });
    } else {
      return res.sendStatus(400);
    }
  }
});

module.exports = router;
