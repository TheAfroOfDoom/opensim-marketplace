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

module.exports = router;
