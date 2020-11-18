// Install Express
const express = require("express");
const app = express();

// Ability to parse cookies
const cookieParser = require("cookie-parser");

// Ability to parse body for POST requests
var bodyParser = require("body-parser");

// Compression reduces file sizes of transactions making them faster
const compression = require("compression");

const path = require("path");

// Set static folder
app.use(
  express.static(path.resolve(__dirname, "../../opensim-marketplace/build"))
);

// Middleware
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

//Database
const sequelize = require("./config/database");

/* Endpoints */
/*
app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../opensim-marketplace/build/index.html")
  );
});
*/

app.use("/api/test", require("./api/routes/test"));

app.use("/api/login", require("./api/routes/login"));

app.use("/api/item", require("./api/routes/item"));

app.use("/api/search", require("./api/routes/search"));

app.use("/api/inventory", require("./api/routes/inventory"));

app.get("/", (req, res) => {
  console.log("Request: " + req);
  res.sendFile(
    path.resolve(__dirname, "../../opensim-marketplace/build", "index.html")
  );
});

module.exports = app;
