const express = require("express");
const router = express.Router();
const sequelize = require("../../config/database");
const InventoryItems = require("../../models/InventoryItems");
const Assets = require("../../models/Assets");

router.get("/", async (req, res) => {
  try {
    const { uuid } = req.cookies;
    if (uuid == undefined) throw new Error();
    let { assetID } = req.query;

    InventoryItems.hasMany(Assets);
    Assets.belongsTo(InventoryItems);

    let error = 0;
    const info = await InventoryItems.destroy({
      where: { assetID: assetID, avatarID: uuid },
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
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

module.exports = router;
