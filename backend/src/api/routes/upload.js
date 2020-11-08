const express = require("express");
const router = express.Router();
const sequelize = require("../../config/database");
const Assets = require("../../models/Assets");

router.get("/", async (req, res) => {
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
