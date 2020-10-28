// Install Express
const express = require("express");
const app = express();

// Compression reduces file sizes of transactions making them faster
const compression = require("compression");
app.use(compression());

//Database
const sequelize = require("./config/database");

/* Endpoints */
app.use("/test", require("./api/routes/test"));

app.use("/login", require("./api/routes/login"));

app.use("/item", require("./api/routes/item"));

app.use("/search", require("./api/routes/search"));

module.exports = app;
