const Assets = require("../models/Assets");
const UserAccounts = require("../models/UserAccounts");
const _ = require("lodash");
const openjpeg = require("../openjpeg.js");

async function isUserLoggedIn(uuid) {
  if (uuid === undefined || uuid === null) {
    return false;
  }

  let uuidInDatabase = await UserAccounts.findOne({
    attributes: ["PrincipalID"],
    where: { PrincipalID: uuid },
  });

  if (_.isEmpty(uuidInDatabase)) return false;
  return true;
}

async function isAssetInDatabase(assetID) {
  if (assetID === undefined || assetID === null) return false;

  if (!(typeof assetID === "string" || assetID instanceof String)) {
    return false;
  }

  let asset = await Assets.findOne({
    attributes: ["id"],
    where: { id: assetID },
  });

  console.log(asset);
  if (_.isEmpty(asset)) return false;

  return true;
}

module.exports = {
  isUserLoggedIn,
  isAssetInDatabase,
  openjpeg: openjpeg.openjpeg,
};
