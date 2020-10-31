// Install Express
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

// Compression reduces file sizes of transactions making them faster
const compression = require("compression");

// Middleware
app.use(compression());
app.use(cookieParser());

//Database
const sequelize = require("./config/database");

/* Endpoints */

app.get("/", (req, res) => {
  console.log(req.cookies);
  return res.status(200).send("Hello, World!");
});

app.use("/test", require("./api/routes/test"));

app.use("/login", require("./api/routes/login"));

app.use("/item", require("./api/routes/item"));

app.use("/search", require("./api/routes/search"));

app.use("/inventory", require("./api/routes/inventory"));

module.exports = app;
