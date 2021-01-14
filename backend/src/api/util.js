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

      let img_data = "";

      component_size = j2k.width * j2k.height;
      //let img_data = new Array(component_size);
      for (let y = 0; y < j2k.height; y++) {
        for (let x = 0; x < j2k.width; x++) {
          let value = j2k.data[y * j2k.width + x] * 4;
          let base = (y * j2k.width + x) * 4;
          /*
          img_data[base + 0] = j2k.data[0 * component_size + y * j2k.width + x];
          img_data[base + 1] = j2k.data[1 * component_size + y * j2k.width + x];
          img_data[base + 2] = j2k.data[2 * component_size + y * j2k.width + x];
          img_data[base + 3] = 255;
*/

          let red = j2k.data[0 * component_size + y * j2k.width + x];
          let green = j2k.data[1 * component_size + y * j2k.width + x];
          let blue = j2k.data[2 * component_size + y * j2k.width + x];
          // https://stackoverflow.com/a/25258278/10605458
          let color =
            (Math.floor(red / 32) << 5) +
            (Math.floor(green / 32) << 2) +
            Math.floor(blue / 64);
          img_data += String.fromCharCode(color);
        }
      }
      /*
      let img_data = [];
      component_size = j2k.width * j2k.height;
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      for (let i = 0, j = ; i < j2k.data.length; i += 24) {
        let red = j2k.data.slice(i, i + 8);
        let green = j2k.data.slice(i + 8, i + 16);
        let blue = j2k.data.slice(i + 16, i + 24);
        let red_avg = red.reduce(reducer) / red.length;
        let green_avg = green.reduce(reducer) / green.length;
        let blue_avg = blue.reduce(reducer) / blue.length;
        let a = 255;
      }
      */
      return { width: j2k.width, height: j2k.height, data: img_data };
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
