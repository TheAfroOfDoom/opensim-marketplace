const express = require("express");
const router = express.Router();
const sequelize = require("../../config/database");
const InventoryItems = require("../../models/InventoryItems");
const Assets = require("../../models/Assets");
const UserAccounts = require("../../models/UserAccounts");
const _ = require("lodash");
const { isUserLoggedIn } = require("../util.js");

router.get("/", async (req, res) => {
  try {
    //Check if user is authenticated
    const { uuid } = req.cookies;

    if (!(await isUserLoggedIn(uuid))) {
      throw new Error("Unauthorized");
    }

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
        "creationDate",
        "InventoryID",
      ],
      include: [
        {
          model: Assets,
          attributes: ["public", "CreatorID"],
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

    for (const invItem of inventoryInfo) {
      invItem.dataValues.isCreator = invItem.assets[0].CreatorID === uuid;
      //console.log(invItem.isCreator);
    }
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

    if (!(await isUserLoggedIn(uuid))) {
      throw new Error("Unauthorized");
    }

    // Get assetID param
    const { assetID } = req.query;

    let asset = await Assets.findOne({
      attributes: ["id"],
      where: { id: assetID },
    });
    if (_.isEmpty(asset)) throw new Error("Invalid ID");

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

    if (!(await isUserLoggedIn(uuid))) {
      throw new Error("Unauthorized");
    }

    //Get item id
    // Get assetID param
    const { assetID } = req.query;

    let asset = await Assets.findOne({
      attributes: ["id"],
      where: { id: assetID },
    });
    if (_.isEmpty(asset)) throw new Error("Invalid ID");

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

    if (!(await isUserLoggedIn(uuid))) {
      throw new Error("Unauthorized");
    }

    // Get assetID param
    const { assetID } = req.query;

    let asset = await Assets.findOne({
      attributes: ["id"],
      where: { id: assetID },
    });
    if (_.isEmpty(asset)) throw new Error("Invalid ID");

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

    if (!(await isUserLoggedIn(uuid))) {
      throw new Error("Unauthorized");
    }

    //Get item id
    let { assetID } = req.body;

    //Check user is creator
    const [creatorID] = await Assets.findAll({
      where: { id: assetID },
      attributes: ["CreatorID"],
    });

    console.log(creatorID.CreatorID + "-----------" + uuid);
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
