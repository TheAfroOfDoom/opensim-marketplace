const express = require("express");
const router = express.Router();
const sequelize = require("../../config/database");
const InventoryItems = require("../../models/InventoryItems");
const Assets = require("../../models/Assets");

router.get("/", async (req, res) => {
  try {
    //Check if user is authenticated
    const { uuid } = req.cookies;
    if (uuid === undefined) throw new Error("Unauthorized");

    // Give relations
    InventoryItems.hasMany(Assets);
    Assets.belongsTo(InventoryItems);

    //Query inventory
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
  } catch (e) {
    console.log(e);
    if (e.message === "Unauthorized") {
      return res.sendStatus(401);
    } else {
      return res.sendStatus(400);
    }
  }
});

router.get("/add", async (req, res) => {
  try {
    //Check if user is authenticated
    const { uuid } = req.cookies;
    if (uuid === undefined) throw new Error("Unauthorized");

    //Get item id
    let { assetID } = req.query;

    //Run SP
    const info = await sequelize.query(
      `CALL marketplaceDownloadAsset(:userID, :assetID, @error);`,
      {
        replacements: { userID: uuid, assetID: assetID },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    //Querry error code
    const sel = await sequelize.query("SELECT @error AS error;", {
      type: sequelize.QueryTypes.SELECT,
    });
    console.log("Add Error: " + sel[0].error);
    return res.status(200).send({ error: sel[0].error === 1 ? true : false });
  } catch (e) {
    console.log(e);
    if (e.message === "Unauthorized") {
      return res.sendStatus(401);
    } else {
      return res.sendStatus(400);
    }
  }
});

router.get("/remove", async (req, res) => {
  try {
    //Check if user is authenticated
    const { uuid } = req.cookies;
    if (uuid === undefined) throw new Error("Unauthorized");

    //Get item id
    let { assetID } = req.query;

    // Give relations
    // TODO: Update
    InventoryItems.hasMany(Assets);
    Assets.belongsTo(InventoryItems);

    //Destroy item
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
    return res.sendStatus(204);
  } catch (e) {
    console.log(e);
    if (e.message === "Unauthorized") {
      return res.sendStatus(401);
    } else {
      return res.sendStatus(400);
    }
  }
});

router.get("/upload", async (req, res) => {
  try {
    //Check if user is authenticated
    const { uuid } = req.cookies;
    if (uuid === undefined) throw new Error("Unauthorized");

    //Get item id
    let { assetID } = req.query;

    //Update database
    const info = await Assets.update({ public: 1 }, { where: { id: assetID } });

    //Returns rows updated
    return res.status(200).send(info);
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
4;
