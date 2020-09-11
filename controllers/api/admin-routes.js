const router = require("express").Router();
const { Admin, Employee } = require("../../models");
const chalk = require('chalk');
const err = chalk.bold.red;
const log = console.log;

// const sequelize = require("../../config/connection");
// const withAuth = require("../../utils/auth");

// Find all admins
router.get('/', (req, res) => { // moved from employee route to be able to find admins; tested in insomnia
  Admin.findAll({
      attributes: [
          'id',
          'username',
          'email',
          'role',
      ]
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

//Create an admin
router.post("/", (req, res) => {
  Admin.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  })
    .then((dbUserData) => {
      req.session.save(() => {

        req.session.adminId = dbUserData.id;
        req.session.email = dbUserData.email;
        
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//login
router.post("/login", (req, res) => {
  log(chalk.green('in admin login'))
  // console.log("in admin login")
  Admin.findOne({
    where: {
      email: req.body.email,
    }
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "No admin account found!" });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    req.session.save(() => {

      req.session.admin_Id = dbUserData.id;
      req.session.email = dbUserData.email;

      req.session.loggedIn = true;

      res.json({
        user: dbUserData,
        message: "You are now logged in as Admin!",
      });
    });
  });
});

//Create Employee
router.post("/newEmployee", (req, res) => {
  Employee.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    role: req.body.role,
    pto: req.body.pto,
    holiday: req.body.holiday,
    sick: req.body.sick,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//edit employee
router.put("/edit/:id", (req, res) => {
  Employee.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(affectedRows => {
      if (affectedRows > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//Delete an employee
router.delete("/:id", (req, res) => {
  Employee.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No employee found with that id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
