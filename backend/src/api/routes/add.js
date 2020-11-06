const express = require("express");
const router = express.Router();
const sequelize = require("../../config/database");

router.get("/", async (req, res) => {
  try {
    const { uuid } = req.cookies;
    let { assetID } = req.query;
    let error = 0;
    const info = await sequelize.query(
      `CALL marketplaceDownloadAsset(:userID, :assetID, @error)`,
      {
        replacements: { userID: uuid, assetID: assetID },
      }
    );
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

module.exports = router;
