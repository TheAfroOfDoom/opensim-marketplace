const express = require("express");
const router = express.Router();
const sequelize = require("../../config/database");
const axios = require("axios");
const xml = require("xml");
const qs = require("qs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { regionConsoles, setConsole } = require("../util");

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
    const response = await axios.post("http://25.1.197.128:8002/wifi/login", {
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
      url: "http://25.1.197.128:8002/wifi/login",
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
      url: `http://25.1.197.128:8002/map-${zoom}-${x}-${y}-objects.jpg`,
    });
    */
    //console.log(response.data);
    res.writeHead(200, { "Content-Type": "image/jpeg" });

    let response = await axios
      .get(`http://25.1.197.128:8002/map-${zoom}-${x}-${y}-objects.jpg`, {
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
module.exports = router;
