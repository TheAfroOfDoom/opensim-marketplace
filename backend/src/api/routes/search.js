const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const sequelize = require("../../config/database");
const Assets = require("../../models/Assets");

router.get("/", async (req, res) => {
  try {
    const { uuid } = req.cookies;
    if (uuid == undefined) throw new Error();
    let { searchString, assetType } = req.query;
    if (searchString == undefined) {
      searchString = "";
    }
    let searchInfo;
    if (assetType == undefined) {
      searchInfo = await Assets.findAll({
        where: {
          name: { [Op.like]: `%${searchString}%` },
          [Op.or]: [{ public: 1 }, { builtin: 1 }],
        },
        attributes: ["name", "description", "assetType", "id", "create_time"],
      });
    } else {
      searchInfo = await Assets.findAll({
        where: {
          name: { [Op.like]: `%${searchString}%` },
          [Op.or]: [{ public: 1 }, { builtin: 1 }],
          assetType: assetType,
        },
        attributes: ["name", "description", "assetType", "id", "create_time"],
      });
    }
    console.log(searchInfo);
    return res.send(searchInfo);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.get("/public", async (req, res) => {
  try {
    const { uuid } = req.cookies;
    if (uuid == undefined) throw new Error();
    let { searchString, assetType } = req.query;
    if (searchString == undefined) {
      searchString = "";
    }
    let searchInfo;
    if (assetType == undefined) {
      searchInfo = await Assets.findAll({
        where: {
          name: { [Op.like]: `%${searchString}%` },
          public: 1,
        },
        attributes: ["name", "description", "assetType", "id", "create_time"],
      });
    } else {
      searchInfo = await Assets.findAll({
        where: {
          name: { [Op.like]: `%${searchString}%` },
          public: 1,
          assetType: assetType,
        },
        attributes: ["name", "description", "assetType", "id", "create_time"],
      });
    }

    return res.send(searchInfo);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.get("/builtin", async (req, res) => {
  try {
    const { uuid } = req.cookies;
    if (uuid == undefined) throw new Error();
    let { searchString, assetType } = req.query;
    if (searchString == undefined) {
      searchString = "";
    }
    let searchInfo;
    if (assetType == undefined) {
      searchInfo = await Assets.findAll({
        where: {
          name: { [Op.like]: `%${searchString}%` },
          builtin: 1,
        },
        attributes: ["name", "description", "assetType", "id", "create_time"],
      });
    } else {
      searchInfo = await Assets.findAll({
        where: {
          name: { [Op.like]: `%${searchString}%` },
          builtin: 1,
          assetType: assetType,
        },
        attributes: ["name", "description", "assetType", "id", "create_time"],
      });
    }
    return res.send(searchInfo);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

module.exports = router;

/*app.get("/search", (req, res) => {
  const { searchString, assetType } = req.query;
  //console.log(assetType);
  if (assetType === undefined) {
    opensim.query(
      `SELECT name, assetType, id FROM assets WHERE name LIKE '%${searchString}%'`,
      (err, result, fields) => {
        return res.send(result);
      }
    );
  } else {
    opensim.query(
      `SELECT name, assetType FROM assets WHERE name LIKE '%${searchString}%' AND assetType='${assetType}'`,
      (err, result, fields) => {
        console.log(result);
        return res.send(result);
      }
    );
  }
});*/
