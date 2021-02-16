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
