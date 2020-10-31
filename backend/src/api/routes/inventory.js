const express = require("express");
const router = express.Router();
const sequelize = require("../../config/database");
const InventoryItems = require("../../models/InventoryItems");
const Assets = require("../../models/Assets");

router.get("/", async (req, res) => {
  try {
    const { uuid } = req.cookies;
    InventoryItems.hasMany(Assets);
    Assets.belongsTo(InventoryItems);

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
      include: [
        {
          model: Assets,
          attributes: [],
          required: true,
          on: {
            col1: sequelize.where(
              sequelize.col("assets.id"),
              "=",
              sequelize.col("inventoryitems.assetID")
            ),
          },
        },
      ],
    });
    return res.send(inventoryInfo);
  } catch (error) {
    return res.sendStatus(400);
  }
});

module.exports = router;
