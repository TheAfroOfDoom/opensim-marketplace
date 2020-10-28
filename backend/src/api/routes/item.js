const express = require("express");
const router = express.Router();
const sequelize = require("../../config/database");
const Assets = require("../../models/Assets");

router.get("/", async (req, res) => {
  const { id } = req.query;
  const itemInfo = await Assets.findAll({ where: { id: id } });
  return res.send(itemInfo);
});

module.exports = router;

/*
app.get("/item", (req, res) => {
  const { id } = req.query;
  console.log(id);
  opensim.query(
    `SELECT * FROM assets WHERE id="${id}";`,
    (err, result, fields) => {

      let arr = [];

      for (let i = 0; i < result[0].data.length; i++) {
        arr.push(result[0].data[i]);
      }
      let j2k = openjpeg(arr, "j2k");
      var endString = "";
      for (var i = 0; i < j2k.data.length; i++) {
        endString += String.fromCharCode(parseInt(j2k.data[i], 2));
      }

      return res.send({ result, j2k, endString });

      return res.send({ result });
    }
  );
});
*/
