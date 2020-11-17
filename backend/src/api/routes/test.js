const express = require("express");
const router = express.Router();
const sequelize = require("../../config/database");
const InventoryItems = require("../../models/InventoryItems");
const md5 = require("md5");

router.get("/", async (req, res) => {
  try {
    //await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    return res.send("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return res.send("Unable to connect to the database:", error);
  }
});

router.get("/inventory", async (req, res) => {
  try {
    const { uuid } = req.cookies;
    if (uuid == undefined) throw new Error("Unauthorized");
    const searchInfo = await InventoryItems.findAll();
    return res.send(searchInfo);
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
