const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
// const passport = require("passport");

    // models
const User = require("../models/User");

// custom middleware
const stateStuff = require("../public/js/stateList");
const { findTerr, states, provinces, countries, findRep } = stateStuff;

    // welcome page

router.get("/", (req, res) => {
  res.render("main/welcome");
});

router.get("/home", ensureAuthenticated, (req, res) => {
  res.render("main/home", {user : req.user});
});

router.get("/sales", ensureAuthenticated, (req, res) => {
  res.render("sales/sales", {user : req.user});
});

router.get("/sales-us", ensureAuthenticated, (req, res) => {
  res.render("sales/sales-us", {user: req.user, states: states, provinces: provinces });
});

router.get("/sales-intl", ensureAuthenticated, (req, res) => {
  res.render("sales/sales-int", { user: req.user, countries: countries });
});

router.post("/sales", ensureAuthenticated, (req, res) => {
  console.log(req.body);
  const { stateChosen, region, dom } = req.body;
  let territory;
  let myRep;
  let contactString;
  if (stateChosen) { // if a state was chosen, we're on the domestic branch
    territory = findTerr(stateChosen); // set the territory to the return value of calling findTerr with stateChosen
    myRep = findRep(territory); // set myRep to the return value of calling findRep with territory
    contactString = `For Netscout sales in the ${territory} territory, please contact ${myRep.name} at ${myRep.phone} or ${myRep.email}`;
  } else { // if NO state was chosen, we're on the int'l branch
    myRep = findRep(region); // set myRep to the return value of calling findRep with region
    if (region === "N/A") {
      contactString = `For questions regarding international sales, please contact ${myRep.name} at ${myRep.phone} or ${myRep.email}`;
    } else {
      contactString = `For Netscout sales in ${dom}, please contact ${myRep.name} at ${myRep.phone} or ${myRep.email}`;
    }
  }
  console.log(contactString);
  res.render("sales/sales-results", { user: req.user, contactString });
});

module.exports = router;
