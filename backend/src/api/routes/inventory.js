const express = require("express");
const router = express.Router();
const sequelize = require("../../config/database");
const InventoryItems = require("../../models/InventoryItems");

router.get("/", async (req, res) => {
  try {
    const { uuid } = req.cookies;

    const inventoryInfo = await InventoryItems.findAll({
      where: { avatarID: uuid },
      attributes: [
        "assetID",
        "assetType",
        "InventoryName",
        "InvType",
        "creatorID",
        "creationDate",
        "InventoryID",
      ],
    });

    return res.send(inventoryInfo);
  } catch (error) {
    return res.sendStatus(400);
  }
});

module.exports = router;
