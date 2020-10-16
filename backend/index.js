const express = require("express");
var mysql = require("mysql");
const app = express();
const port = 5000;
const md5 = require("md5");
const uuid = require("uuid");
const now = require("performance-now");
const util = require("./util");

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

/* Endpoints */

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/test", (req, res) => {
  //Attempt Database Connection
  marketplace.connect((err) => {
    if (err) res.send("Not Connected");

    marketplace.query("SELECT * FROM test_table", (err, result, fields) => {
      console.log(fields);
      res.send({ fields, result });
    });
  });
});

app.get("/login", (req, res) => {
  //Destructure Username and Password params
  const { firstName, lastName, password } = req.query;
  console.log(firstName, lastName, password);

  //Attempt Database Connection
  opensim.connect((err) => {
    if (err) return res.send("Not Connected");

    // Attempt SQL Query
    opensim.query(
      `SELECT auth.UUID, auth.passwordHash, auth.passwordSalt FROM auth INNER JOIN useraccounts ON useraccounts.PrincipalID=auth.UUID WHERE LastName="${lastName}" and FirstName="${firstName}";`,
      (err, result, fields) => {
        //Check to see if password matches
        console.log(result[0]);
        let hashedPassword = md5(md5(password) + ":" + result[0].passwordSalt);
        if (hashedPassword === result[0].passwordHash)
          return res.send("User Authenticated");
        return res.send("Name/Password Does not match");
      }
    );
  });
});

app.get("/item", (req, res) => {
  /*
  marketplace.query("SELECT * from auth", (err, result, fields) => {
    res.send(result);
  });
  */
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
