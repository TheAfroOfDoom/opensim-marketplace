const app = require("./app");
const http = require("http");
const { port } = require("./config");

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
