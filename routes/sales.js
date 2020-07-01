const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

    // models
const User = require("../models/User");
const Rep = require("../models/Rep");

// custom middleware
const stateStuff = require("../public/js/stateList");
const { states, provinces, countries } = stateStuff;

    // sales routes

router.get("/home", ensureAuthenticated, (req, res) => {
  res.render("sales/home", { user : req.user, states, provinces, countries });
});

router.post("/search", ensureAuthenticated, (req, res) => {
  console.log(req.body.region);
  let [myState, myRegion] = req.body.region.split("|");
  console.log(`Selected: ${myState}`);
  console.log(`Region: ${myRegion}`);
  // once the reps are uploaded, query the Reps by region and return the correct document

  Rep.findOne({ region: myRegion }, (err, foundRep) => {
    if (err) { console.log(err);
    } else {
      console.log(foundRep);
      const { repName, repPhone, repEmail } = foundRep;
      let messageString = `For product sales in ${myState}, please contact ${repName} at ${repPhone} or ${repEmail}`;
      res.render("sales/sales-results", { user: req.user, messageString });
      // res.redirect("/sales/home");
    }
  })

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

  Rep.findOne({ region: region }, (err, foundRep) => {
    if (err) { console.log(err);
    } else {
      foundRep.repName = repName; // foundRep.repName = req.body.repName;
      foundRep.repPhone = repPhone;
      foundRep.repEmail = repEmail;
      console.log(foundRep);
      foundRep.save()
        .then(user => {
          req.flash("success_msg", "Sales rep info has been updated successfully");
          res.redirect("/sales/update");
        })
        .catch(err => console.log(err));
    }
  })

});

module.exports = router;
