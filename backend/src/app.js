const express = require("express");
var mysql = require("mysql");
const app = express();
const port = 5000;
const md5 = require("md5");
const uuid = require("uuid");
const now = require("performance-now");
const { db_url } = require("./config");
const FileType = require("file-type");
var Readable = require("stream").Readable;
const { openjpeg } = require("./openjpeg");

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
}); /*
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
*/

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

app.get("/login", (req, res) => {
  //Destructure Username and Password params
  const { email, password } = req.query;
  // Attempt SQL Query
  opensim.query(
    `SELECT auth.UUID, auth.passwordHash, auth.passwordSalt, auth.webLoginKey FROM auth INNER JOIN useraccounts ON useraccounts.PrincipalID=auth.UUID WHERE Email="${email}";`,
    (err, result, fields) => {
      //Check to see if password matches
      for (let i = 0; i < result.length; i++) {
        user = result[i];
        console.log(user);
        let hashedPassword = md5(md5(password) + ":" + user.passwordSalt);
        if (hashedPassword === user.passwordHash) {
          let obj;
          return res.send({ UUID: user.UUID, webLoginKey: user.webLoginKey });
        }
      }

      return res.send("Name/Password Does not match");
    }
  );
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
