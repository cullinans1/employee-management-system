const router = require('express').Router();
const sequelize = require('../config/connection');
const { Employee, Admin } = require('../models');

// get info for homepage
router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/"); 
     return;
     }
       res.render("homepage");
     });

router.get('/login', (req, res) => {
        if (req.session.loggedIn) {
          res.redirect("dashboard");
          return;
        }
      
        res.render('login'); 
});

router.get('/dashboard', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("dashboard");
    return;
  }

  res.render('login');  
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