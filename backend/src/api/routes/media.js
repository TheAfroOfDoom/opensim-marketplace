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
    const { sid } = req.cookies;

    if (!(await isUserLoggedIn(sid))) {
      throw new Error("Unauthorized");
    }

    // Get assetID param
    const { assetID } = req.query;
    //console.log(req.query);
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
        console.log("Help me");
        //Assets.update({ marketplace_icon: j2k }, { where: { id: assetID } });

        return res.send({ data: j2k });
      } else {
        // IS NOT A TEXTURE. RETURN DEFAULT IMAGE OR NULL
        return res.send({ data: null });
      }
    } else {
      return res.send({
        data: JSON.parse(asset.dataValues.marketplace_icon),
      });
    }
  } catch (e) {
    console.log(e);
    if (e.message === "Unauthorized") {
      return res.sendStatus(401);
    } else if (e.message === "Invalid ID") {
      return res.status(400).json({ statusCode: 400, message: "Invalid ID" });
    } else {
      return res.sendStatus(400);
    }
  }
});

router.post("/set", async (req, res) => {
  try {
    //Check if user is logged in
    const { sid } = req.cookies;

    if (!(await isUserLoggedIn(sid))) {
      //throw new Error("Unauthorized");
    }

    let { assetID, imgData } = req.body;

    if (!(await isAssetInDatabase(assetID))) {
      throw new Error("Invalid ID");
    }

    //Check if image data is valid base64 image data
    const regex = /^data:image\/jpeg;base64,(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/gm;
    if (!regex.test(imgData.data)) {
      throw new Error("Data is not in base64");
    }

    Assets.update(
      { marketplace_icon: JSON.stringify(imgData) },
      { where: { id: assetID } }
    );
    res.sendStatus(204);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

module.exports = router;
