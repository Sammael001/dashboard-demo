const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

    // models
const User = require("../models/User");
const Rep = require("../models/Rep");

// custom middleware
const stateStuff = require("../public/js/stateList");
const { newStates, newProvinces, newCountries } = stateStuff;

    // sales routes

router.get("/home", ensureAuthenticated, (req, res) => {
  res.render("sales/home", { user : req.user, states: newStates, provinces: newProvinces, countries: newCountries });
});

router.post("/search", ensureAuthenticated, (req, res) => {
  console.log(req.body.region);
  let [myState, myRegion] = req.body.region.split("|");
  console.log(`Selected: ${myState}`);
  console.log(`Region: ${myRegion}`);


  res.redirect("/sales/home");
  // res.render("sales/sales-results", { user: req.user, contactString });
});

router.get("/update", ensureAuthenticated, (req, res) => {
  res.render("sales/update", { user: req.user });
});

router.post("/update", ensureAuthenticated, (req, res) => {
  const { region, repName, repPhone, repEmail } = req.body;
  console.log(`region: ${region}`);
  console.log(`repName: ${repName}`);
  console.log(`repPhone: ${repPhone}`);
  console.log(`repEmail: ${repEmail}`);

  // take the above info and create new Reps and store them to the Rep repository
  // once all reps are filled out, edit the router.get("/update") route to Rep.findOne({_id: requestedID} .. )
  // then edit the router.post("/update") route to Rep.findByIdAndUpdate

  res.redirect("/sales/update");
});

module.exports = router;
