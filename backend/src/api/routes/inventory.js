const express = require("express");
const router = express.Router();
const sequelize = require("../../config/database");
const InventoryItems = require("../../models/InventoryItems");
const InventoryFolders = require("../../models/InventoryFolders");
const Assets = require("../../models/Assets");
const UserAccounts = require("../../models/UserAccounts");
const _ = require("lodash");
const axios = require("axios");
const qs = require("qs");
const { isUserLoggedIn, isAssetInDatabase } = require("../util.js");

/**
 * @swagger
 * /inventory:
 *   get:
 *     tags:
 *       - Inventory
 *     description: Fetch User Inventory
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return user inventory
 */
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

/**
 * @swagger
 * /inventory/add:
 *   post:
 *     tags:
 *       - Inventory
 *     description: Add asset to user inventory
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: assetID
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of asset
 *     responses:
 *       200:
 *         description: Add item to user inventory
 */
router.post("/add", async (req, res) => {
  try {
    //Check if user is authenticated
    const { uuid } = req.cookies;

    if (!(await isUserLoggedIn(uuid))) {
      throw new Error("Unauthorized");
    }

    // Get assetID param
    const { assetID } = req.body;

    if (!(await isAssetInDatabase(assetID))) {
      throw new Error("Invalid ID");
    }

    //Run SP
    const info = await sequelize.query(
      `CALL marketplaceDownloadAsset(:userID, :assetID, @error, @inventoryID);`,
      {
        replacements: { userID: uuid, assetID: assetID },
      }
    );

    //Query error code
    const [sel] = await sequelize.query(
      "SELECT @error as error, @inventoryID as inventoryID;",
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
    console.log("Add Error: " + JSON.stringify(sel));

    /*REFRESH FIRESTORM USING IARs*/

    let asset = await Assets.findOne({
      attributes: ["name"],
      where: { id: assetID },
    });

    await setTimeout(async function () {
      let x = await axios({
        method: "post",
        url: "http://25.1.197.128:9000/SessionCommand/",
        data: qs.stringify({
          ID: "c1bc078b-3aa7-42ca-9cf9-96de78b44569",
          COMMAND: `save iar --noassets Wifi Admin "Marketplace Downloads/${asset.dataValues.name}" kenny123`,
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });
      setTimeout(async function () {
        let y = await axios({
          method: "post",
          url: "http://25.1.197.128:9000/SessionCommand/",
          data: qs.stringify({
            ID: "c1bc078b-3aa7-42ca-9cf9-96de78b44569",
            COMMAND: `load iar -m Wifi Admin "Marketplace Downloads" kenny123`,
          }),
          headers: {
            "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        });
        setTimeout(async function () {
          await InventoryItems.destroy({
            where: { inventoryID: sel.inventoryID },
          });
        }, 500);
      }, 500);
    }, 500);

    return res.status(200).send({ error: false });
  } catch (e) {
    console.error(e);
    if (e.message === "Unauthorized") {
      return res.send(401);
    } else if (e.message === "Invalid ID") {
      return res.status(400).send("Invalid ID");
    } else {
      return res.sendStatus(400);
    }
  }
});

/**
 * @swagger
 * /inventory/remove:
 *   post:
 *     tags:
 *       - Inventory
 *     description: Remove asset from user inventory
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: assetID
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of asset
 *     responses:
 *       200:
 *         description: Item successfully removed from user inventory
 */
router.post("/remove", async (req, res) => {
  try {
    //Check if user is authenticated
    const { uuid } = req.cookies;

    if (!(await isUserLoggedIn(uuid))) {
      throw new Error("Unauthorized");
    }

    // Get assetID param
    const { assetID } = req.body;

    if (!(await isAssetInDatabase(assetID))) {
      throw new Error("Invalid ID");
    }

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
    } else if (e.message === "Invalid ID") {
      return res.status(400).send("Invalid ID");
    } else {
      return res.sendStatus(400);
    }
  }
});

/**
 * @swagger
 * /inventory/upload:
 *   post:
 *     tags:
 *       - Inventory
 *     description: Make user created item public
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: assetID
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of asset
 *     responses:
 *       200:
 *         description: Item successfully made public
 */
router.post("/upload", async (req, res) => {
  try {
    //Check if user is authenticated
    const { uuid } = req.cookies;

    if (!(await isUserLoggedIn(uuid))) {
      throw new Error("Unauthorized");
    }

    // Get assetID param
    console.log(req.body);
    const { assetID } = req.body;

    console.log("AssetID: " + assetID);

    if (!(await isAssetInDatabase(assetID))) {
      throw new Error("Invalid ID");
    }

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
    } else if (e.message === "Invalid ID") {
      return res.status(400).send("Invalid ID");
    } else {
      return res.sendStatus(400);
    }
  }
});

/**
 * @swagger
 * /inventory/private:
 *   post:
 *     tags:
 *       - Inventory
 *     description: Make user created item private
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: assetID
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of asset
 *     responses:
 *       200:
 *         description: Item successfully made private
 */
router.post("/private", async (req, res) => {
  try {
    //Check if user is authenticated
    const { uuid } = req.cookies;
    if (!(await isUserLoggedIn(uuid))) {
      throw new Error("Unauthorized");
    }

    // Get assetID param
    const { assetID } = req.body;
    if (!(await isAssetInDatabase(assetID))) {
      throw new Error("Invalid ID");
    }

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
    } else if (e.message === "Invalid ID") {
      return res.status(400).send("Invalid ID");
    } else {
      return res.sendStatus(400);
    }
  }
});

router.get("/test", async (req, res) => {
  try {
    const { uuid } = req.cookies;
    if (!(await isUserLoggedIn(uuid))) {
      throw new Error("Unauthorized");
    }

    // Give relations
    InventoryItems.hasMany(Assets);
    Assets.belongsTo(InventoryItems);

    //Get folders and items for user
    let folders = await InventoryFolders.findAll({
      where: {
        agentID: uuid,
      },
      attributes: ["folderName", "folderID", "agentID", "parentFolderID"],
    });

    let items = await InventoryItems.findAll({
      where: { avatarID: uuid },
      order: [["InventoryName", "ASC"]],
      attributes: [
        "assetID",
        "assetType",
        "InventoryName",
        "InvType",
        "parentFolderID",
        "creationDate",
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

    for (const invItem of items) {
      invItem.dataValues.isCreator = invItem.assets[0].CreatorID === uuid;
    }

    let root = folders.find(
      (folder) =>
        folder.dataValues.parentFolderID ===
        "00000000-0000-0000-0000-000000000000"
    );

    root.dataValues["folders"] = constructFolders(
      folders,
      items,
      root.dataValues.folderID
    );
    root.dataValues["items"] = items.filter(
      (item) => item.dataValues.parentFolderID === root.dataValues.folderID
    );

    /*
    let response = await InventoryItems.findAll({
      where: {
        avatarID: uuid,
      },
    });
    */
    res.send(root);
  } catch (e) {
    console.log(e);
    if (e.message === "Unauthorized") {
      return res.sendStatus(401);
    } else if (e.message === "Forbidden") {
      return res.sendStatus(403);
    } else if (e.message === "Invalid ID") {
      return res.status(400).send("Invalid ID");
    } else {
      return res.sendStatus(400);
    }
  }
});

function constructFolders(folders, items, parentFolderID) {
  let localFolders = folders.filter(
    (folder) => folder.dataValues.parentFolderID === parentFolderID
  );

  localFolders.forEach((f) =>
    folders.splice(
      folders.findIndex(
        (e) => e.dataValues.parentFolderID === f.dataValues.parentFolderID
      ),
      1
    )
  );

  //console.log(localFolders);

  for (let i = 0; i < localFolders.length; i++) {
    localFolders[i].dataValues["folders"] = constructFolders(
      folders,
      items,
      localFolders[i].dataValues.folderID
    );

    localFolders[i].dataValues["items"] = items.filter(
      (item) =>
        item.dataValues.parentFolderID === localFolders[i].dataValues.folderID
    );
    /*
    items.forEach((f) =>
      items.splice(
        items.findIndex(
          (e) => e.dataValues.parentFolderID === f.dataValues.parentFolderID
        ),
        1
      )
    );
    */
  }
  return localFolders;
}

module.exports = router;
