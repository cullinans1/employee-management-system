const router = require("express").Router();
// const sequelize = require('../../config/connection');
const chalk = require('chalk');
const log = console.log;
const { Admin, Employee } = require("../../models");

const err = chalk.bold.red;

router.get("/view", (req, res) => {
  Employee.findAll({
    attributes: ["id", "username", "email", "role", "pto", "holiday", "sick"],
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  //   } else {
  //     res.status(404).end();
  //   }
});

//Find a specific employee
router.get("/:id", (req, res) => {
  Employee.findOne({
    where: {
      id: req.body.id,
    },
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
      req.session.user_id = dbUserData.id;  //was userId
      req.session.email = dbUserData.email;
      req.session.loggedIn = true;

      res.json({
        user: dbUserData,
        message: "You are now logged in!",
      });
    });
  });
});

module.exports = router;
