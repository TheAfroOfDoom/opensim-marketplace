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

const server = http.createServer(app);
const serverSecure = https.createServer(app);

// Code to run when server is shutdown
process.on("exit", () => {
  console.log("Server stopping at " + new Date());
  process.exit(0); // if you don't close yourself this will run forever
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

server.listen(port || 5000, () => {
  console.log(`Backend listening at port ${port}`);
  //setConsole(8002);
  //setConsole(9000);
  initializeConsoles();
});

serverSecure.listen(443, () => {
  console.log(`Backend listening at port ${port}`);
});
