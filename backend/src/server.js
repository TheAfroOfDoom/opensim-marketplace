const app = require("./app");
const http = require("http");
const { port } = require("./config");

const server = http.createServer(app);

server.listen(port || 5000, () => {
  console.log(`Backend listening at port ${port}`);
});
