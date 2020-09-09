const router = require("express").Router();
const sequelize = require("../config/connection");
const { Employee, Admin } = require("../models");

router.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.render("homepage");
    return;
  }
  res.render("homepage");
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.render("dashboard");
    return;
  }
  res.render("login");
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

// Findall employees
router.get("/view", (req, res) => {
  Employee.findAll({
    attributes: ["id", "username", "email", "role", "pto", "holiday", "sick"],
  })
    .then((dbUserData)=> {
      const employees = dbUserData.map(employee => employee.get({ plain: true }));

      res.render('view-employees', {
        employees,
        loggedIn: req.session.loggedIn
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Find one employee
router.get("/employee/:id", (req, res) => {
  Employee.findOne({
    where: {
      id: req.params.id
    },
    attributes: ["id", "username", "email", "role", "pto", "holiday", "sick"],
  })
    .then((dbUserData)=> {
      const employees = dbUserData.map(employee => employee.get({ plain: true }));

      res.render('single-employee', {
        employee,
        loggedIn: req.session.loggedIn
      });
      console.log(employees);
      console.log(employee);
      console.log(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});



module.exports = router;
