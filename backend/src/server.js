const app = require("./app");
const http = require("http");

const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
