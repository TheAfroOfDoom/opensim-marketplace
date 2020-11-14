// Install Express
const express = require("express");
const app = express();

// Ability to parse cookies
const cookieParser = require("cookie-parser");

// Compression reduces file sizes of transactions making them faster
const compression = require("compression");

// Middleware
app.use(compression());
app.use(cookieParser());

//Database
const sequelize = require("./config/database");

/* Endpoints */

app.get("/api/", (req, res) => {
  console.log(req.cookies);
  return res.status(200).send("Hello, World!");
});

app.use("/api/test", require("./api/routes/test"));

app.use("/api/login", require("./api/routes/login"));

app.use("/api/item", require("./api/routes/item"));

app.use("/api/search", require("./api/routes/search"));

app.use("/api/inventory", require("./api/routes/inventory"));

module.exports = app;
