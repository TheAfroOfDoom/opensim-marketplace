router.get("/login", (req, res) => {
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
