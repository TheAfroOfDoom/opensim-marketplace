const express = require("express");
const router = express.Router();
const sequelize = require("../../config/database");
const axios = require("axios");
const xml = require("xml");
const qs = require("qs");

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
        firstname,
        lastname,
        password,
        METHOD: "login",
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    res.set("Content-Type", "text/html");
    res.send(response.data);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

module.exports = router;
