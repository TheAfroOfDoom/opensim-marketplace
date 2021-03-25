const express = require("express");
const router = express.Router();
const sequelize = require("../../config/database");
const InventoryItems = require("../../models/InventoryItems");
const InventoryFolders = require("../../models/InventoryFolders");
const Assets = require("../../models/Assets");
const UserAccounts = require("../../models/UserAccounts");
const Tokens = require("../../models/Tokens");
const _ = require("lodash");
const axios = require("axios");
const qs = require("qs");
const path = require("path");
const {
  isUserLoggedIn,
  isAssetInDatabase,
  regionConsoles,
  returnError,
} = require("../util.js");
fs = require("fs");
const { marketplace_add_location } = require("../../config");

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
    const { sid } = req.cookies;

    if (!(await isUserLoggedIn(sid))) {
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
    return returnError(e, res);
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
    const { sid } = req.cookies;

    if (!(await isUserLoggedIn(sid))) {
      throw new Error("Unauthorized");
    }

    // Get assetID param
    const { assetID, port } = req.body;

    if (!(await isAssetInDatabase(assetID))) {
      throw new Error("Invalid ID");
    }

    let uuidFromToken = await Tokens.findOne({
      attributes: ["uuid"],
      where: { token: sid },
    });

    //Run SP
    const info = await sequelize.query(
      `CALL marketplaceDownloadAsset(:userID, :assetID, @error, @inventoryID);`,
      {
        replacements: {
          userID: uuidFromToken.dataValues.uuid,
          assetID: assetID,
        },
      }
    );

    //Query error code
    const [sel] = await sequelize.query(
      "SELECT @error as error, @inventoryID as inventoryID;",
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
    console.log("Add to inventory error: " + JSON.stringify(sel));

    /*REFRESH FIRESTORM USING IARs*/

    let asset = await Assets.findOne({
      attributes: ["name"],
      where: { id: assetID },
    });

    const consoleSession = regionConsoles[port || 9000];

    if (sel.error !== 1)
      await setTimeout(async function () {
        let x = await axios({
          method: "post",
          url: `${consoleSession.getFullAddress()}/SessionCommand/`,
          data: qs.stringify({
            ID: consoleID,
            COMMAND: `save iar --noassets Wifi Admin "Marketplace Downloads/${asset.dataValues.name}" kenny123 marketplace_add/${uuid}_add.iar`,
          }),
          headers: {
            "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        });
        setTimeout(async function () {
          let y = await axios({
            method: "post",
            url: `${consoleSession.getFullAddress()}/SessionCommand/`,
            data: qs.stringify({
              ID: consoleID,
              COMMAND: `load iar -m Wifi Admin "Marketplace Downloads" kenny123 marketplace_add/${uuid}_add.iar`,
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

    return res.status(200).send({ error: sel.error });
  } catch (e) {
    return returnError(e, res);
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
    const { sid } = req.cookies;

    if (!(await isUserLoggedIn(sid))) {
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

    let uuidFromToken = await Tokens.findOne({
      attributes: ["uuid"],
      where: { token: sid },
    });

    let uuid = uuidFromToken.dataValues.uuid;

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
    return returnError(e, res);
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
    const { sid } = req.cookies;

    if (!(await isUserLoggedIn(sid))) {
      throw new Error("Unauthorized");
    }

    // Get assetID param
    const { assetID } = req.body;

    if (!(await isAssetInDatabase(assetID))) {
      throw new Error("Invalid ID");
    }

    let uuidFromToken = await Tokens.findOne({
      attributes: ["uuid"],
      where: { token: sid },
    });

    let uuid = uuidFromToken.dataValues.uuid;

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
    return returnError(e, res);
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
    const { sid } = req.cookies;
    if (!(await isUserLoggedIn(sid))) {
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

    let uuidFromToken = await Tokens.findOne({
      attributes: ["uuid"],
      where: { token: sid },
    });

    let uuid = uuidFromToken.dataValues.uuid;

    if (creatorID.CreatorID !== uuid) throw new Error("Forbidden");

    //Update database
    const info = await Assets.update({ public: 0 }, { where: { id: assetID } });

    //Returns rows updated
    return res.status(200).send(info);
  } catch (e) {
    return returnError(e, res);
  }
});

router.get("/test", async (req, res) => {
  try {
    const { sid } = req.cookies;
    if (!(await isUserLoggedIn(sid))) {
      throw new Error("Unauthorized");
    }

    let uuidFromToken = await Tokens.findOne({
      attributes: ["uuid"],
      where: { token: sid },
    });

    let uuid = uuidFromToken.dataValues.uuid;

    // Give relations
    InventoryItems.hasMany(Assets);
    Assets.belongsTo(InventoryItems);

    //Get folders and items for user
    let folders = await InventoryFolders.findAll({
      where: {
        agentID: uuid,
      },

      order: [["folderName", "ASC"]],
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
        "creationDate",
        "InventoryID",
        "parentFolderID",
        "creationDate",
        "inventoryID",
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
    return returnError(e, res);
  }
});

router.get("/download", async (req, res) => {
  try {
    //Check if user is authenticated
    const { sid } = req.cookies;

    if (!(await isUserLoggedIn(sid))) {
      throw new Error("Unauthorized");
    }

    const { inventorypath, assetID, inventoryName, isFile, port } = req.query;

    const consoleSession = regionConsoles[port || 9000];
    let command;
    if (isFile === "true") {
      if (!(await isAssetInDatabase(assetID))) {
        throw new Error("Invalid ID");
      }
      command = `save iar Wifi Admin "${inventorypath}${inventoryName}" kenny123 "${marketplace_add_location}/${sid}_dl.iar"`;
    } else {
      command = `save iar Wifi Admin "${inventorypath}" kenny123 "${marketplace_add_location}/${sid}_dl.iar"`;
    }
    // Save IAR
    await axios({
      method: "post",
      url: consoleSession.getFullAddress() + "/SessionCommand/",
      data: qs.stringify({
        ID: consoleSession.consoleID,
        COMMAND: command,
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    let filename = `${sid}_dl.iar`;
    let file = `${marketplace_add_location}/${filename}`;

    // Prompt user for file download
    let success = await checkFileExists(file);

    if (success) await res.download(file);
    else console.log("Error accessing saved IAR file from /bin");
    await deleteTemporaryFolder(`${inventorypath}${inventoryName}`);
  } catch (e) {
    return returnError(e, res);
  }
});

router.get("/downloadMulti", async (req, res) => {
  try {
    //Check if user is authenticated
    const { sid } = req.cookies;

    if (!(await isUserLoggedIn(sid))) {
      throw new Error("Unauthorized");
    }

    let uuidFromToken = await Tokens.findOne({
      attributes: ["uuid"],
      where: { token: sid },
    });

    const {
      rootFolderID,
      folderIDs,
      inventoryIDs,
      keepStructure,
      port,
    } = req.query;

    const consoleSession = regionConsoles[port || 9000];

    //Run export SP
    info = await sequelize.query(
      `CALL marketplaceExportAssets(
        :rootFolderID
      , :userID
      , :folderIDs
      , :inventoryIDs
      , :keepStructure
      , @error
      , @temporaryFolderID
      , @temporaryFolderName
      );`,
      {
        replacements: {
          rootFolderID: rootFolderID,
          userID: uuidFromToken.dataValues.uuid,
          folderIDs: folderIDs,
          inventoryIDs: inventoryIDs,
          keepStructure: keepStructure,
        },
      }
    );

    //Query outputs
    [sel] = await sequelize.query(
      `SELECT @error as error
            , @temporaryFolderID as temporaryFolderID
            , @temporaryFolderName as temporaryFolderName
            ;`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
    let error = sel["error"];
    let temporaryFolderID = sel["temporaryFolderID"];
    let temporaryFolderName = sel["temporaryFolderName"];
    if (error) console.log("Export error: " + JSON.stringify(sel[0]));
    console.log(temporaryFolderID, temporaryFolderName);

    let command;

    let filename = `${sid}_dl.iar`;
    let file = `${marketplace_add_location}/${filename}`;
    command = `save iar Wifi Admin "${temporaryFolderName}" kenny123 "${file}"`;
    console.log("Getting Folder: " + command);

    // Save IAR
    let x = await axios({
      method: "post",
      url: consoleSession.getFullAddress() + "/SessionCommand/",
      data: qs.stringify({
        ID: consoleSession.consoleID,
        COMMAND: command,
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    // Prompt user for file download
    let success = await checkFileExists(file);

    if (success) await res.download(file);
    else console.log("Error accessing saved IAR file from /bin");
    await deleteTemporaryFolder(temporaryFolderID);
  } catch (e) {
    const { status, error } = returnError(e, res);
    return res.status(status).send(error);
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

async function deleteTemporaryFolder(temporaryFolderID) {
  // Delete temp folder in OpenSim user inventory after download finishes
  info = await sequelize.query(
    `CALL marketplaceDeleteFolder(
      :temporaryFolderID
    , @error
    );`,
    {
      replacements: {
        temporaryFolderID: temporaryFolderID,
      },
    }
  );

  //Query outputs
  [sel] = await sequelize.query(`SELECT @error as error;`, {
    type: sequelize.QueryTypes.SELECT,
  });
  error = sel["error"];
  if (error) console.log("Delete folder error: " + JSON.stringify(sel[0]));

  return;
}

async function checkFileExists(file) {
  let count = 0;
  let previousLength = 0;
  let currentLength = 0;
  return await new Promise((resolve) => {
    const interval = setInterval(() => {
      // Abort if count is too high
      if (count >= 10) {
        resolve(false);
        clearInterval(interval);
      }

      console.log("p: ", previousLength);
      console.log(file);
      if (fs.existsSync(file)) {
        currentLength = fs.readFileSync(file).length;
        console.log("c: ", currentLength);
        if (currentLength !== 0 && currentLength === previousLength) {
          resolve(true);
          clearInterval(interval);
        } else {
          previousLength = currentLength;
        }
      }
      count += 1;
    }, 1000);
  });
}

async function ReadSession(consoleSession) {
  const { consoleID } = consoleSession;
  const address = consoleSession.getFullAddress();
  // Save IAR
  const response = await axios({
    method: "post",
    url: address + "/ReadResponses/" + consoleID,
  });
  return response.data;
}

module.exports = router;
