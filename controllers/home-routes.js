const router = require("express").Router();
const sequelize = require("../config/connection");
const chalk = require('chalk');
const { Employee, Admin } = require("../models");
const log = console.log;

const err = chalk.bold.red;
const withAuth = require("../utils/auth");


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

router.get("/admin-login", (req, res) => {
  if (req.session.loggedIn) {
    res.render("dashboard");
    return;
  } 
  res.render("admin-login");
});

router.get("/admin-dashboard", withAuth, (req, res) => {
  if (req.session.loggedIn) {
    res.render("admin-dashboard");
    return;
  }

  res.render("admin-login");
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
router.get("/employee-info/:id", (req, res) => {
  log(chalk.green('We go here!'))
  // console.log("We got here!")
  Employee.findOne({
    where: {
      id: req.params.id
    },
    attributes: ["id", "username", "email", "role", "pto", "holiday", "sick"],
  })
    .then((dbUserData) => {
      console.log("dbUserData")
      console.log(dbUserData)
      const my_employee = dbUserData.get({ plain: true });
       res.render('single-employee', {
        employee: my_employee,
        loggedIn: req.session.loggedIn
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.get("/edit/:id", (req, res) => {
  Employee.findByPk(req.params.id)
    .then(dbUserData => {
        const edit_employee = dbUserData.get({ plain: true });
        
        res.render("edit-employee", {
          employee: edit_employee,
          loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
// Find one employee for Employee View of their hours
router.get("/single-info/:id", (req, res) => {
  Employee.findOne({
    where: {
      id: req.session.user_id
    },
    attributes: ["id", "username", "email", "role", "pto", "holiday", "sick"],
  })
    .then((dbUserData) => {
      console.log("dbUserData")
      console.log(dbUserData)
      const my_employee = dbUserData.get({ plain: true });
       res.render('single-employee', {
        employee: my_employee,
        loggedIn: req.session.loggedIn
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;
