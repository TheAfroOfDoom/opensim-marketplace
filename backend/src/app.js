const express = require("express");
var mysql = require("mysql");
const app = express();
const port = 5000;
const md5 = require("md5");
const uuid = require("uuid");
const now = require("performance-now");
const { db_url } = require("./config");

/* Different MySQL Database Connections */

const opensim = mysql.createConnection({
  host: "25.1.197.128",
  user: "ryanw",
  password: "2EvXhxnn",
  database: "opensim",
});

const marketplace = mysql.createConnection({
  host: "25.1.197.128",
  user: "ryanw",
  password: "2EvXhxnn",
  database: "opensim_marketplace",
});

marketplace.connect();
opensim.connect();

/* Endpoints */

app.get("/", (req, res) => {
  /*
  res.status(200).json({
    message: "Hello, World!",
  });
  */
  res.send("Hello, World");
});

app.get("/test", (req, res) => {
  marketplace.query("SELECT * FROM test_table", (err, result, fields) => {
    console.log(fields);
    return res.send({ fields, result });
  });
});

app.get("/item", (req, res) => {
  marketplace.query("SELECT * from assets", (err, result, fields) => {
    return res.send(result);
  });
}); /*
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
*/

app.get("/search", (req, res) => {
  const { searchString, assetType } = req.query;
  console.log(assetType);

  if (assetType === undefined) {
    opensim.query(
      `SELECT name, assetType FROM assets WHERE name LIKE '%${searchString}%'`,
      (err, result, fields) => {
        return res.send(result);
      }
    );
  } else {
    opensim.query(
      `SELECT name, assetType FROM assets WHERE name LIKE '%${searchString}%' AND assetType='${assetType}'`,
      (err, result, fields) => {
        return res.send(result);
      }
    );
  }
});

module.exports = app;
