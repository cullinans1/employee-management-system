const router = require('express').Router();
const sequelize = require('../config/connection');
const { Employee, Admin } = require('../models');
const withAuth = require('../utils/auth');

// get info for dashboard
router.get('/', withAuth, (req, res) => {
    console.log(req.session.loggedIn);
    console.log('======================');
    Employee.findAll({
       attributes: [
        'username',
        'email',
        'role',
        'pto',
        'holiday',
        'sick',
      ]
    })
      .then(dbUserData => {
       res.json(dbUserData);
    //    res.render('dashboard', { employee, loggedIn: true });
       res.render("dashboard");  // serves the html file
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });