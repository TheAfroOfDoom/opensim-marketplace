const express = require("express");
const router = express.Router();
const sequelize = require("../../config/database");
const InventoryItems = require("../../models/InventoryItems");
const Assets = require("../../models/Assets");
const validateUUID = require("uuid-validate");
const { validate } = require("uuid");

router.get("/", async (req, res) => {
  try {
    //Check if user is authenticated
    const { uuid } = req.cookies;
    if (!validate(uuid) && !validateUUID(uuid)) throw new Error("Unauthorized");

    // Give relations
    InventoryItems.hasMany(Assets);
    Assets.belongsTo(InventoryItems);

    //Query inventory
    const inventoryInfo = await InventoryItems.findAll({
      where: { avatarID: uuid },
      order: [["InventoryName", "ASC"]],
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
          attributes: ["public"],
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
      return res.send(401);
    } else if (e.message === "Invalid ID") {
      return res.status(400).send("Invalid ID");
    } else {
      return res.sendStatus(400);
    }
  }
});

router.post("/add", async (req, res) => {
  try {
    //Check if user is authenticated
    const { uuid } = req.cookies;
    if (!validate(uuid)) throw new Error("Unauthorized");

    //Get item id
    let { assetID } = req.body;
    if (!validate(assetID)) throw new Error("Invalid ID");

    console.log(req.body);

    //Run SP
    const info = await sequelize.query(
      `CALL marketplaceDownloadAsset(:userID, :assetID, @error);`,
      {
        replacements: { userID: uuid, assetID: assetID },
      }
    );

    //Querry error code
    const [sel] = await sequelize.query("SELECT @error AS error;", {
      type: sequelize.QueryTypes.SELECT,
    });
    console.log("Add Error: " + sel.error);
    return res.status(200).send({ error: sel.error === 1 ? true : false });
  } catch (e) {
    //console.error(e);
    if (e.message === "Unauthorized") {
      return res.send(401);
    } else if (e.message === "Invalid ID") {
      return res.status(400).send("Invalid ID");
    } else {
      return res.sendStatus(400);
    }
  }
});

router.post("/remove", async (req, res) => {
  try {
    //Check if user is authenticated
    const { uuid } = req.cookies;
    if (!validate(uuid)) throw new Error("Unauthorized");

    //Get item id
    let { assetID } = req.body;
    if (!validate(assetID)) throw new Error("Invalid ID");

    // Give relations
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

router.post("/upload", async (req, res) => {
  try {
    //Check if user is authenticated
    const { uuid } = req.cookies;
    if (!validate(uuid)) throw new Error("Unauthorized");

    //Get item id
    let { assetID } = req.body;

    //Check user is creator
    const [creatorID] = await Assets.findAll({
      where: { id: assetID },
      attributes: ["CreatorID"],
    });

    if (creatorID.CreatorID !== uuid) throw new Error("Forbidden");

    //Update database
    const info = await Assets.update({ public: 1 }, { where: { id: assetID } });

    //Returns rows updated
    return res.status(200).send(info);
  } catch (e) {
    console.log(e);
    if (e.message === "Unauthorized") {
      return res.sendStatus(401);
    } else if (e.message === "Forbidden") {
      return res.sendStatus(403);
    } else {
      return res.sendStatus(400);
    }
  }
});


router.post("/private", async (req, res) => {
  try {
    //Check if user is authenticated
    const { uuid } = req.cookies;
    if (!validate(uuid)) throw new Error("Unauthorized");

    //Get item id
    let { assetID } = req.body;

    //Check user is creator
    const [creatorID] = await Assets.findAll({
      where: { id: assetID },
      attributes: ["CreatorID"],
    });

    if (creatorID.CreatorID !== uuid) throw new Error("Forbidden");

    //Update database
    const info = await Assets.update({ public: 0 }, { where: { id: assetID } });

    //Returns rows updated
    return res.status(200).send(info);
  } catch (e) {
    console.log(e);
    if (e.message === "Unauthorized") {
      return res.sendStatus(401);
    } else if (e.message === "Forbidden") {
      return res.sendStatus(403);
    } else {
      return res.sendStatus(400);
    }
  }
});

module.exports = router;
