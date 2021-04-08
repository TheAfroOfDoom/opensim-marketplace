const express = require("express");
const router = express.Router();
const sequelize = require("../../config/database");
const axios = require("axios");
const xml = require("xml");
const qs = require("qs");
const ChildProcess = require("child_process");
const jsdom = require("jsdom");
const UserAccounts = require("../../models/UserAccounts");
const GridUser = require("../../models/GridUser");
const Tokens = require("../../models/Tokens");
const Regions = require("../../models/Regions");
const {
  regionConsoles,
  setConsole,
  uuidRegex,
  returnError,
  checkAuth,
} = require("../util");

fs = require("fs");
const lineReader = require("line-reader");

const { isUserLoggedIn } = require("../util.js");

const { bin_location } = require("../../config");

router.get("/name", checkAuth, async (req, res) => {
  try {
    const { sid } = req.cookies;
    const uuidFromToken = await Tokens.findOne({
      attributes: ["uuid"],
      where: { token: sid },
    });

    const name = await UserAccounts.findOne({
      where: { PrincipalID: uuidFromToken.dataValues.uuid },
      attributes: ["FirstName", "LastName"],
    });

    res.send(name);
  } catch (e) {
    return returnError(e, res);
  }
});

router.get("/region", checkAuth, async (req, res) => {
  try {
    const { sid } = req.cookies;
    const uuidFromToken = await Tokens.findOne({
      attributes: ["uuid"],
      where: { token: sid },
    });

    const gridUser = await GridUser.findOne({
      where: { UserID: uuidFromToken.dataValues.uuid },
    });

    const currentRegion = await Regions.findOne({
      where: { uuid: gridUser.dataValues.LastRegionID },
      attributes: ["regionName"],
    });
    res.json(currentRegion);
  } catch (e) {
    return returnError(e, res);
  }
});

module.exports = router;

/**/
