const app = require("./app");
const http = require("http");
const https = require("https");
const { port } = require("./config");
const securePort = 443;
const {
  setConsole,
  closeConsole,
  regionConsoles,
  initializeConsoles,
} = require("./api/util");
const path = require("path");

// Certificate
const options = {
  key: fs.readFileSync(path.resolve(__dirname, "./certs/key.pem")),
  cert: fs.readFileSync(path.resolve(__dirname, "./certs/cert.pem")),
};
const serverSecure = https.createServer(options, app);

//const server = http.createServer(app);

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

/*
server.listen(port || 5000, () => {
  console.log(`Backend listening at port ${port}`);
  //setConsole(8002);
  //setConsole(9000);

});
*/

serverSecure.listen(securePort, () => {
  console.log(`Backend listening at port ${securePort}`);
  initializeConsoles();
});
