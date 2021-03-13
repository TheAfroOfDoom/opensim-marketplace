/*
const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  db_username: process.env.DB_USERNAME,
  db_password: process.env.DB_PASSWORD,
  db_name: process.env.DB_NAME,
  uuid: process.env.TEST_UUID,
  region_user: process.env.REGION_USER,
  region_pass: process.env.REGION_PASS,
  opensim_address: process.env.OPENSIM_ADDRESS,
  opensim_port: process.env.OPENSIM_PORT,
};
*/

const fs = require("fs");
const ini = require("ini");
const path = require("path");
const config = ini.parse(
  fs.readFileSync(path.join(__dirname, "./config.ini"), "utf-8")
);
module.exports = {
  port: config.server.PORT,
  db_url: config.database.DB_URL,
  db_username: config.database.DB_USERNAME,
  db_password: config.database.DB_PASSWORD,
  db_name: config.database.DB_NAME,
  uuid: config.testing.TEST_UUID,
  region_user: config.region.REGION_USER,
  region_pass: config.region.REGION_PASS,
  opensim_address: config.opensim.OPENSIM_ADDRESS,
  opensim_port: config.opensim.OPENSIM_PORT,
  marketplace_add_location: config.opensim.MARKETPLACE_ADD_LOCATION,
  regions_ini: config.region.INI_LOCATION,
};
