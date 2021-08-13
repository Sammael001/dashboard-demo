const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
// const passport = require("passport");

    // models
const User = require("../models/User");


    // welcome page

router.get("/", (req, res) => {
  res.render("main/welcome");
});

router.get("/home", ensureAuthenticated, (req, res) => {
  res.render("main/home", {user : req.user});
});


module.exports = router;
