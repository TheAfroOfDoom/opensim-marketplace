const express = require("express");
const router = express.Router();
const sequelize = require("../../config/database");
const InventoryItems = require("../../models/InventoryItems");
const md5 = require("md5");

router.get("/", async (req, res) => {
  try {
    //await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    console.log(md5("password2020"));
    return res.send("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return res.send("Unable to connect to the database:", error);
  }
});

router.get("/inventory", async (req, res) => {
  try {
    const { uuid } = req.cookies;
    if (uuid == undefined) throw new Error();
    const searchInfo = await InventoryItems.findAll();
    return res.send(searchInfo);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});
router.get("/add", async (req, res) => {
  try {
    const { uuid } = req.cookies;
    if (uuid == undefined) throw new Error();
    let asset = "2e349029-118a-995e-a7bf-d4fa32c1e9aa";
    let error = 0;
    const info = await sequelize
      .query(`CALL marketplaceDownloadAsset(:userID, :assetID, @error)`, {
        replacements: { userID: uuid, assetID: asset },
      })
      .spread((result) => {
        if (result) {
          console.log("\nInside result : " + JSON.stringify(result));
        }
      });
    console.log("Info:", info);
    return res.send(info);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

module.exports = router;
