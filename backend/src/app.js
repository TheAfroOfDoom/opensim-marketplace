const express = require("express");
var mysql = require("mysql");
const app = express();
const port = 5000;
const md5 = require("md5");
const uuid = require("uuid");
const now = require("performance-now");
const { db_url } = require("./config");
const FileType = require("file-type");
const compression = require("compression");
const { openjpeg } = require("./openjpeg");

//Database
const sequelize = require("./config/database");

/* Different MySQL Database Connections */

const opensim = mysql.createConnection({
  host: "25.1.197.128",
  user: "ryanw",
  password: "2EvXhxnn",
  database: "opensim",
});

opensim.connect();

/* Endpoints */

app.get("/", (req, res) => {
  res.send("Hello, World");
});

app.use(compression());

/*
app.get("/test", async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    return res.send("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return res.send("Unable to connect to the database:", error);
  }
});
*/

app.use("/test", require("./api/routes/test"));

app.use("/login", require("./api/routes/login"));

app.get("/item", (req, res) => {
  const { id } = req.query;
  console.log(id);
  opensim.query(
    `SELECT * FROM assets WHERE id="${id}";`,
    (err, result, fields) => {
      /*
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
      */
      return res.send({ result });
    }
  );
});

app.get("/search", (req, res) => {
  const { searchString, assetType } = req.query;
  //console.log(assetType);
  if (assetType === undefined) {
    opensim.query(
      `SELECT name, assetType, id FROM assets WHERE name LIKE '%${searchString}%'`,
      (err, result, fields) => {
        return res.send(result);
      }
    );
  } else {
    opensim.query(
      `SELECT name, assetType FROM assets WHERE name LIKE '%${searchString}%' AND assetType='${assetType}'`,
      (err, result, fields) => {
        console.log(result);
        return res.send(result);
      }
    );
  }
});

app.get("/upload", (req, res) => {
  const {
    name,
    description,
    assetType,
    local,
    temporary,
    data,
    id,
    create_time,
    access_time,
    asset_flags,
    CreatorID,
  } = req.query;
  console.log(req.query);

  console.log("Name: " + name);

  opensim.query(
    `INSERT INTO assets(name, description, assetType, local, temporary, data, id, create_time, access_time, asset_flags, CreatorID)
VALUES
("${name}", "${description}", ${assetType}, ${local}, ${temporary}, "${data}", "${id}", UNIX_TIMESTAMP(NOW()), UNIX_TIMESTAMP(NOW()), ${asset_flags}, '${CreatorID}');`,
    (err, result, fields) => {
      if (err) return res.send(err);
      else return res.send(result);
    }
  );
});

module.exports = app;
