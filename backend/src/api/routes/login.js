const express = require("express");
const router = express.Router();
const sequelize = require("../../config/database");
const Auth = require("../../models/Auth");
const UserAccounts = require("../../models/UserAccounts");
const md5 = require("md5");

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
            FirstName: firstName,
            LastName: lastName,
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
    //console.log(error);
    if (e.message === "Already Authorized") {
      return res.status(400).send("Already Authorized");
    } else {
      return res.status(400).send("Failure");
    }
  }
});

module.exports = router;
