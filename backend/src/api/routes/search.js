const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const sequelize = require("../../config/database");
const Assets = require("../../models/Assets");

router.get("/", async (req, res) => {
  const { searchString, assetType } = req.query;
  const searchInfo = await Assets.findAll({
    where: { name: { [Op.like]: `%${searchString}%` } },
    attributes: ["name", "description", "assetType", "id"],
  });
  return res.send(searchInfo);
});

router.get("/");

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
