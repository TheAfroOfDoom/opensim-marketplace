const express = require("express");
const router = express.Router();
const sequelize = require("../../config/database");
const InventoryItems = require("../../models/InventoryItems");
const Assets = require("../../models/Assets");

router.get("/", async (req, res) => {
  try {
    const { uuid } = req.cookies;
    if (uuid == undefined) throw new Error();
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

router.get("/add", async (req, res) => {
  try {
    const { uuid } = req.cookies;
    if (uuid == undefined) throw new Error();
    let { assetID } = req.query;
    let error = 0;
    const info = await sequelize.query(
      `CALL marketplaceDownloadAsset(:userID, :assetID, @:error)`,
      {
        replacements: { userID: uuid, assetID: assetID, error: error },
      }
    );
    console.log(error);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.get("/remove", async (req, res) => {
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

router.get("/upload", async (req, res) => {
  try {
    const { uuid } = req.cookies;
    if (uuid == undefined) throw new Error();
    let { assetID } = req.query;

    const info = await Assets.update({ public: 1 }, { where: { id: assetID } });
    return res.status(200).send(info);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

module.exports = router;
