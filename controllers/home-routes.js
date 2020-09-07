const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Vote } = require('../models');

// get info for homepage
router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
     return;
     }
       res.render("homepage");
     });

  module.exports = router;