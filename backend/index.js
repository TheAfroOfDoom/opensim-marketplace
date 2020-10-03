const express = require("express");
var mysql = require("mysql");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

var con = mysql.createConnection({
  host: "25.1.197.128",
  user: "ryanw",
  password: "2EvXhxnn",
  database: "opensim_marketplace",
});

app.get("/test", (req, res) => {
  //res.send("success");

  con.connect(function (err) {
    if (err) res.send("Not Connected");
    con.query("SELECT * FROM test_table", (err, result, fields) => {
      console.log(fields);
      res.send({ fields, result });
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
