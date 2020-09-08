const router = require('express').Router();
const sequelize = require('../config/connection');
const { Employee, Admin } = require('../models');

// get info for homepage
router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard"); 
     return;
     }
       res.render("homepage");
     });

router.get('/login', (req, res) => {
        if (req.session.loggedIn) {
          res.redirect('/');
          return;
        }
      
        res.render('login');
});

  module.exports = router;