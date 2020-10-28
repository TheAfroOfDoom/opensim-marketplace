const express = require("express");
var mysql = require("mysql");
const app = express();
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

app.use(compression());

app.use("/test", require("./api/routes/test"));

app.use("/login", require("./api/routes/login"));

app.use("/item", require("./api/routes/item"));

app.use("/search", require("./api/routes/search"));

module.exports = app;
