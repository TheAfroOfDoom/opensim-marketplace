const app = require("./app");
const http = require("http");
const https = require("https");
const { port } = require("./config");
const {
  setConsole,
  closeConsole,
  regionConsoles,
  initializeConsoles,
} = require("./api/util");
const path = require("path");

// Set Up Secure Server
const options = {
  key: fs.readFileSync(path.resolve(__dirname, "./certs/key.pem")),
  cert: fs.readFileSync(path.resolve(__dirname, "./certs/cert.pem")),
};
const serverSecure = https.createServer(options, app);

// Code to run when server is shutdown
process.on("exit", () => {
  console.log("Server stopping at " + new Date());
  process.exit(0);
});

process.on("SIGINT", () => {
  closeConsole().finally(() => {
    process.exit();
  });
});

process.on("SIGTERM", () => {
  closeConsole().finally(() => {
    process.exit();
  });
});

// Have Server Listen on Secure Port
serverSecure.listen(port, () => {
  console.log(`Backend listening at port ${port}`);
  initializeConsoles();
});
