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

//Setup Swagger for documentation
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "OpenSim Marketplace",
      description: "API for OpenSim Marketplace",
      servers: ["http://localhost:5000"],
    },
    host: "localhost:5000",
    basePath: "/api/",
  },
  apis: ["src/api/routes/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Set static folder
app.use(
  express.static(path.resolve(__dirname, "../../opensim-marketplace/build"))
);
app.use(
  "/marketplace",
  express.static(path.resolve(__dirname, "../../opensim-marketplace/build"))
);

// Middleware
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/connection", require("./api/routes/connection"));

app.use("/api/login", require("./api/routes/login"));

app.use("/api/item", require("./api/routes/item"));

app.use("/api/search", require("./api/routes/search"));

app.use("/api/inventory", require("./api/routes/inventory"));

app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "../../opensim-marketplace/build", "index.html")
  );
});

module.exports = app;
