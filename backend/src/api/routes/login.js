const express = require("express");
const router = express.Router();
const sequelize = require("../../config/database");
const Auth = require("../../models/Auth");
const UserAccounts = require("../../models/UserAccounts");
const md5 = require("md5");
const uuid = require("uuid");

router.get("/", async (req, res) => {
  const { firstName, lastName, password } = req.query;
  Auth.hasMany(UserAccounts);
  UserAccounts.belongsTo(Auth);

  try {
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

    for (let i = 0; i < loginInfo.length; i++) {
      user = loginInfo[i];
      console.log(user);
      let hashedPassword = md5(
        md5(password) + ":" + user.dataValues.passwordSalt
      );
      if (hashedPassword === user.dataValues.passwordHash) {
        let obj;
        return res.send({
          UUID: user.dataValues.UUID,
        });
        break;
      }
    }

    return res.send("Name/Password Does not match");
  } catch (error) {
    console.log(error);
    return res.send("Name/Password Does not match");
  }
});

module.exports = router;

/*
router.get("/", (req, res) => {
  //Destructure Username and Password params
  const { email, password } = req.query;
  // Attempt SQL Query
  opensim.query(
    `SELECT auth.UUID, auth.passwordHash, auth.passwordSalt, auth.webLoginKey FROM auth INNER JOIN useraccounts ON useraccounts.PrincipalID=auth.UUID WHERE Email="${email}";`,
    (err, result, fields) => {
      //Check to see if password matches
      for (let i = 0; i < result.length; i++) {
        user = result[i];
        console.log(user);
        let hashedPassword = md5(md5(password) + ":" + user.passwordSalt);
        if (hashedPassword === user.passwordHash) {
          let obj;
          return res.send({ UUID: user.UUID, webLoginKey: user.webLoginKey });
        }
      }

      return res.send("Name/Password Does not match");
    }
  );
});
*/
