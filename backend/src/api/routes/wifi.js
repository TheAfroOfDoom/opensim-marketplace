const express = require("express");
const router = express.Router();
const sequelize = require("../../config/database");
const axios = require("axios");
const xml = require("xml");
const qs = require("qs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

router.post("/login", async (req, res) => {
  try {
    const { firstname, lastname, password } = req.body;
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
        firstname: "Wifi",
        lastname: "Admin",
        password: "kenny123",
        METHOD: "login",
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    const dom = new JSDOM(response.data);
    const value = dom.window.document.querySelector("a").href.split("?sid=")[1];
    console.log(value);
    res.set("Content-Type", "text/json");
    res.cookie("sid", value).send("cookie returned");
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

router.get("/map", async (req, res) => {
  try {
    const { x, y, zoom } = req.query;
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
    return res.sendStatus(400);
  }
});
module.exports = router;
