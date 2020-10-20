const express = require("express");
var mysql = require("mysql");
const app = express();
const port = 5000;
const md5 = require("md5");
const uuid = require("uuid");
const now = require("performance-now");

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

app.get("/item", (req, res) => {
  marketplace.query("SELECT * from assets", (err, result, fields) => {
    return res.send(result);
  });
}); /*
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
*/

module.exports = app;
