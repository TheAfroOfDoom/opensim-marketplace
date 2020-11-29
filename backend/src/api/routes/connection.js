const express = require("express");
const router = express.Router();
const sequelize = require("../../config/database");

/**
 * @swagger
 * /connection:
 *   get:
 *     tags:
 *       - Connection
 *     description: Test Connection to Database
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return connection status
 */
router.get("/", async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    return res.send("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return res.send("Unable to connect to the database:", error);
  }
});

module.exports = router;
