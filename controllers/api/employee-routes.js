const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Admin, Employee } = require("../../models");

router.get("/", (req, res) => {
  Employee.findAll({
    attributes: ["id", "username", "email", "role", "pto", "holiday", "sick"],
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//login
router.post("/login", (req, res) => {
  Employee.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "No account found with that email!" });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    req.session.save(() => {
      req.session.userId = dbUserData.id;
      req.session.email = dbUserData.email;
      req.session.loggedIn = true;

      res.json({
        user: dbUserData,
        message: "You are now logged in!",
      });
    });
  });
});

//Logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    res.json({ message: "You are now logged out!" });
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
