const express = require("express");
const router = express.Router();
const sequelize = require("../../config/database");
const axios = require("axios");
const xml = require("xml");
const qs = require("qs");
const jsdom = require("jsdom");
const Regions = require("../../models/Regions");
const { JSDOM } = jsdom;
const { regionConsoles, setConsole, uuidRegex } = require("../util");

const { isUserLoggedIn } = require("../util.js");

router.post("/login", async (req, res) => {
  try {
    const { firstname, lastname, password } = req.body;

    for (const property in req.body) {
      if (
        typeof req.body[property] === "object" &&
        req.body[property] !== null
      ) {
        throw new Error("Incorrect params");
      }
    }

    /*
    const response = await axios.post("http://25.5.144.194:8002/wifi/login", {
      firstname: firstname,
      lastname: lastname,
      password: password,
      METHOD: "login",
    });
    */
    console.log(req.body);
    console.log(firstname, lastname, password);

    const response = await axios({
      method: "post",
      url: "http://25.5.144.194:8002/wifi/login",
      data: qs.stringify({
        firstname,
        lastname,
        password,
        METHOD: "login",
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    const dom = new JSDOM(response.data);
    const value = dom.window.document.querySelector("a").href.split("?sid=")[1];
    console.log(value);
    if (value === undefined) {
      throw new Error("Incorrect params");
    }
    res.set("Content-Type", "text/json");
    res.cookie("sid", value).send("cookie returned");
  } catch (e) {
    console.log(e);
    if (e.message == "Incorrect params") {
      return res.status(400).send("Incorrect params");
    } else {
      return res.sendStatus(400);
    }
  }
});

router.get("/map", async (req, res) => {
  try {
    //Check if user is authenticated
    const { uuid } = req.cookies;

    if (!(await isUserLoggedIn(uuid))) {
      throw new Error("Unauthorized");
    }

    const { x, y, zoom } = req.query;
    console.log(x, y, zoom);
    if (x === undefined) {
      throw new Error("Incorrect params");
    }
    if (y === undefined) {
      throw new Error("Incorrect params");
    }
    if (zoom === undefined) {
      throw new Error("Incorrect params");
    }
    console.log(req.query);
    /*
    let response = await axios({
      method: "get",
      url: `http://25.5.144.194:8002/map-${zoom}-${x}-${y}-objects.jpg`,
    });
    */
    //console.log(response.data);
    res.writeHead(200, { "Content-Type": "image/jpeg" });

    let response = await axios
      .get(`http://25.5.144.194:8002/map-${zoom}-${x}-${y}-objects.jpg`, {
        responseType: "arraybuffer",
      })
      .then(function (response) {
        return Buffer.from(response.data, "binary").toString("base64");
      });
    return res.end("data:image/jpeg;base64," + response);
  } catch (e) {
    console.log(e);
    if (e.message == "Unauthorized") {
      return res.status(401).send("Unauthorized");
    } else if (e.message == "Incorrect params") {
      return res.status(400).send("Incorrect params");
    } else {
      return res.sendStatus(400);
    }
  }
});

router.get("/consoletest", async (req, res) => {
  try {
    if (regionConsoles[9000] == null) {
      setConsole(9000);
    }
    console.log(regionConsoles[9000]);
    res.json("Something didnt fucked up");
  } catch (e) {
    console.log(e);
    res.json("something fucked up");
  }
});

router.get("/getregions", async (req, res) => {
  try {
    //Check if user is authenticated
    const { uuid } = req.cookies;

    if (!(await isUserLoggedIn(uuid))) {
      throw new Error("Unauthorized");
    }

    let { wifi } = req.query;

    if (wifi === undefined) {
      wifi = false;
    }

    let response;

    if (wifi) {
      /*
      const consoleSession = regionConsoles[8002];

      const response2 = await axios({
        method: "post",
        url: consoleSession.getFullAddress() + "/SessionCommand/",
        data: qs.stringify({
          ID: consoleSession.consoleID,
          COMMAND: "show regions",
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });
      const response = axios({
        method: "post",
        url:
          consoleSession.getFullAddress() +
          "/ReadResponses/" +
          consoleSession.consoleID,
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });

      res.send(await response.data);
      */

      let test_string =
        "1363:normal:Name ID Position Owner ID Flags cis499server c78c5e0c-fc23-4501-8235-f28192bccad3 1000,1000 f577aa90-7db9-4a77-afc2-6daee8916c3e RegionOnline cis499server1 c78c5e0c-fc23-4501-8235-f28192bccad4 1001,1000 f577aa90-7db9-4a77-afc2-6daee8916c3e RegionOnline cis499server2 c78c5e0c-fc23-4501-8235-f28192bccad5 1000,1001 f577aa90-7db9-4a77-afc2-6daee8916c3e RegionOnline cis499server3 c78c5e0c-fc23-4501-8235-f28192bccad6 1001,1001 f577aa90-7db9-4a77-afc2-6daee8916c3e RegionOnline ";

      // Prepare String for parsing
      test_string = test_string.replace(
        test_string.substring(0, test_string.indexOf("Name")),
        ""
      );
      response = [];

      // Extract Headers
      let headers = test_string
        .substring(0, test_string.indexOf("Flags") + 5)
        .split(" ");
      test_string = test_string.replace(headers.join(" ") + " ", "");

      //Start Loop here
      while (test_string !== "") {
        let charIndex = test_string.search(uuidRegex);
        let name = test_string.substring(0, charIndex - 1);
        test_string = test_string.replace(name + " ", "");
        let id = test_string.substring(0, test_string.indexOf(" "));
        test_string = test_string.replace(id + " ", "");
        let coords = test_string.substring(0, test_string.indexOf(" "));
        test_string = test_string.replace(coords + " ", "");
        let ownerID = test_string.substring(0, test_string.indexOf(" "));
        test_string = test_string.replace(ownerID + " ", "");
        let flags = test_string.substring(0, test_string.indexOf(" "));
        test_string = test_string.replace(flags + " ", "");
        let region = {
          name,
          id,
          coords,
          ownerID,
          flags,
        };
        response.push(region);
      }
    } else {
      response = await Regions.findAll({
        attributes: [
          "regionName",
          "owner_uuid",
          "serverHttpPort",
          "serverURI",
          "serverPort",
          "locX",
          "locY",
          "sizeX",
          "sizeY",
        ],
      });
    }

    // Find Name

    res.json(response);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});
module.exports = router;
