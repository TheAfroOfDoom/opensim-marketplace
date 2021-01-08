const Assets = require("../models/Assets");
const UserAccounts = require("../models/UserAccounts");
const _ = require("lodash");
const openjpeg = require("../openjpeg.js");
const cache = require("../config/cache.js");

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

async function setCacheItem(assetKey, data) {
  try {
    return await cache.set(assetKey, data);
  } catch (e) {
    console.error(`Problem setting cache item at KEY=${assetKey}`);
  }
}

async function getCacheItem(assetKey) {
  try {
    return await cache.get(assetKey);
  } catch (e) {
    console.error(`Problem getting cache item at KEY=${assetKey}`);
  }
}

async function convertImage(assetType, data) {
  if (assetType === 0) {
    let arr = Array.prototype.slice.call(data, 0);
    try {
      let j2k = openjpeg.openjpeg(arr, "j2k");
      return j2k;
    } catch (e) {
      console.log(`Error: ${e}`);
      return { Error: "error" };
    }
  }
}

module.exports = {
  isUserLoggedIn,
  isAssetInDatabase,
  openjpeg: openjpeg.openjpeg,
  setCacheItem: setCacheItem,
  getCacheItem: getCacheItem,
  convertImage,
};
