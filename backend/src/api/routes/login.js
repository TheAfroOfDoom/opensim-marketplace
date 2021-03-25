const express = require("express");
const router = express.Router();
const sequelize = require("../../config/database");
const Auth = require("../../models/Auth");
const UserAccounts = require("../../models/UserAccounts");
const md5 = require("md5");

/**
 * @swagger
 * /login:
 *   get:
 *     tags:
 *       - Login
 *     description: Authenticate user
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: firstName
 *         schema:
 *           type: string
 *         required: true
 *         description: First Name of user
 *       - in: query
 *         name: lastName
 *         schema:
 *           type: string
 *         required: true
 *         description: Last Name of user
 *       - in: query
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *         description: Password of user
 *     responses:
 *       200:
 *         description: Successfully authenticated user
 */
router.get("/", async (req, res) => {
  try {
    //Check if user is authenticated
    const { uuid } = req.cookies;
    if (uuid !== undefined) throw new Error("Already Authorized");

    //Get Query params
    const { firstName, lastName, password } = req.query;

    // Give relations
    Auth.hasMany(UserAccounts);
    UserAccounts.belongsTo(Auth);

    //Get array of logins
    const loginInfo = await Auth.findAll({
      attributes: ["UUID", "passwordHash", "passwordSalt"],
      include: [
        {
          model: UserAccounts,
          attributes: [],
          required: true,
          where: {
            FirstName: firstName.trim(),
            LastName: lastName.trim(),
          },
          on: {
            col1: sequelize.where(
              sequelize.col("auth.UUID"),
              "=",
              sequelize.col("useraccounts.PrincipalID")
            ),
          },
        },
      ],
      required: true,
    });

    // Code sometimes doesnt return (I have no idea why). THis is to stop a double return.
    responseSent = false;

    for (let user of loginInfo) {
      //Hash Password
      let hashedPassword = md5(
        md5(password) + ":" + user.dataValues.passwordSalt
      );

      //Check if password is correct
      if (hashedPassword === user.dataValues.passwordHash) {
        responseSent = true;
        return res
          .status(201)
          .cookie("uuid", user.dataValues.UUID.toString(), { overwrite: true })
          .send("Success");
        break;
      }
    }

    if (!responseSent) {
      // User/Pass is not correct
      return res.status(400).send("Failure");
    }
  } catch (e) {
    return returnError(e, res);
  }
});

module.exports = router;
