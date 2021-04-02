const Assets = require("../models/Assets.js");
const Tokens = require("../models/Tokens.js");
const Regions = require("../models/Regions.js");
const _ = require("lodash");
const ini = require("ini");
const path = require("path");
const { createCanvas } = require("canvas");

const openjpeg = require("../openjpeg.js");
const cache = require("../config/cache.js");
const ConsoleSession = require("./consoleSession.js");
const { regions_ini } = require("../config");

async function isUserLoggedIn(sid) {
  if (sid === undefined || sid === null) {
    return false;
  }

  let sidInDatabase = await Tokens.findOne({
    attributes: ["token"],
    where: { token: sid },
  });

  if (_.isEmpty(sidInDatabase)) return false;
  return true;
}

async function checkAuth(req, res, next) {
  const { sid } = req.cookies;

  if (sid === undefined || sid === null) {
    return res.sendStatus(401);
  }

  let sidInDatabase = await Tokens.findOne({
    attributes: ["token"],
    where: { token: sid },
  });

  if (_.isEmpty(sidInDatabase)) return res.sendStatus(401);
  else return next();
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
    try {
      let arr = Array.prototype.slice.call(data, 0);
      let j2k = openjpeg.openjpeg(arr, "j2k");

      //let img_data = "";

      component_size = j2k.width * j2k.height;
      //let img_data = new Array(component_size);

      const canvas = createCanvas(j2k.width, j2k.height);
      const ctx = canvas.getContext("2d");
      var image = ctx.getImageData(0, 0, canvas.width, canvas.height);

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

          image.data[base + 0] = red;
          image.data[base + 1] = green;
          image.data[base + 2] = blue;
          image.data[base + 3] = 255; //the alpha part..
          /*
          let color =
            (Math.floor(red / 32) << 5) +
            (Math.floor(green / 32) << 2) +
            Math.floor(blue / 64);
          img_data += String.fromCharCode(color);
          */
        }
      }
      ctx.putImageData(image, 0, 0);
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

      return {
        width: j2k.width,
        height: j2k.height,
        data: canvas.toDataURL("image/jpeg"),
      };

      //return canvas.toDataURL("image/jpeg");
    } catch (e) {
      console.log(`Error: ${e}`);
      return { Error: "error" };
    }
  }
}

function objectFilter(obj, predicate) {
  let result = {},
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key) && predicate(obj[key])) {
      result[key] = obj[key];
    }
  }
  return result;
}

const regionConsolePorts = new Set();

const regionConsoles = [];

setConsole = (port) => {
  console.log("Creating new port");
  regionConsoles[port] = new ConsoleSession(port);
};

closeConsole = async (port) => {
  try {
    await regionConsoles[8002].closeConsole();
    await regionConsoles[9000].closeConsole();
  } catch (e) {
    console.log(e.message);
  }
};

initializeConsoles = async () => {
  const regions = await Regions.findAll({ attributes: ["serverHttpPort"] });
  regionConsolePorts.add(8002);
  for (let i = 0; i < regions.length; i++) {
    regionConsolePorts.add(regions[i].dataValues.serverHttpPort);
  }
  for (regionPort of regionConsolePorts) {
    setConsole(regionPort);
  }
};

uuidRegex =
  "[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}";

function returnError(e, res) {
  console.log(e);
  let status = 400;
  if (e.message === "Unauthorized") {
    status = 401;
  } else if (e.message === "Forbidden") {
    status = 403;
  } else if (e.message === "Invalid ID") {
    status = 400;
  }
  return res.status(status).send(e.message);
  //return { status, error: e.message };
}

module.exports = {
  isUserLoggedIn,
  isAssetInDatabase,
  openjpeg: openjpeg.openjpeg,
  setCacheItem: setCacheItem,
  getCacheItem: getCacheItem,
  convertImage,
  objectFilter,
  regionConsoles,
  setConsole,
  closeConsole,
  uuidRegex,
  initializeConsoles,
  returnError,
  checkAuth,
};
