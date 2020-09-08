const router = require("express").Router();
const sequelize = require("../config/connection");
const { Employee, Admin } = require("../models");

router.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.render("dashboard");
    return;
  }
  res.render("homepage");
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.render("dashboard");
    return;
  }
  res.render("homepage");
});

router.get("/dashboard", (req, res) => {
  if (req.session.loggedIn) {
    res.render("dashboard");
    return;
  }

  res.render("login");
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
