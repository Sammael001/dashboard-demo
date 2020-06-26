const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
// const passport = require("passport");

// models
const User = require("../models/User");
// const Part = require("../models/Part");
const Inventory = require("../models/Inventory");

// custom middleware
// const myTally = require("../public/js/reporter-int");
const objMaker = require("../public/js/objMaker");
const siteFinder = require("../public/js/siteFinder");
// these routes are OUTSIDE the current (routes) folder, which is why we preface with ../


    ///////////       INVENTORY routes       ///////////


    // Inventory - Search route

router.get("/search", ensureAuthenticated, (req, res) => {
  res.render("inv/inventory", { user : req.user, title: "Parts Inventory", key: "Search" });
});

router.post("/search", ensureAuthenticated, (req, res) => {
  const { itemNum, searchType, warehouse, description } = req.body;
  let newItemNum;
  if (itemNum) {
    newItemNum = itemNum.toUpperCase();
  }
  console.log(`Capitalized Item Num: ${newItemNum}`); // either Item # or undefined (!itemNum)
  console.log(`description: ${description}`); // either a description keyword or undefined
  console.log(`Search Type: ${searchType}`); // either "byItem", "byDesc" or "fullInv"
  console.log(`Warehouse: ${warehouse}`); // either full warehouse name or Domestic/India


  const searchObj = objMaker(searchType, warehouse, newItemNum, description); // set searchObj to the return value of calling objMaker with searchType, warehouse + itemNum

  const mySearch = (searchType) => {
    if (searchType === "fullInv") {
      return `All items`;
    } else if (searchType === "byDesc") {
      return `description: "${description}"`;
    } else {
      return `P/N ${itemNum}`;
    }
  };

  const subkey = `${mySearch(searchType)} in ${warehouse} inventory stock`;
  const title = 'Search Results';

  Inventory.find(searchObj, (err, foundParts) => {
    if (err) { console.log(err);
    } else {
      res.render("inv/results", { user : req.user, parts: foundParts, title: title, key: subkey });
    }
  });

});


    // Inventory - pages for individual inventory entries

router.get("/page/:itemID", ensureAuthenticated, (req, res) => {
  // take in the route parameter and set it to itemID
  // route param "itemID" should already be the ._id for that collection entry, because we generated hrefs pointing to that ._id in inventory.ejs
  const itemID = req.params.itemID;
  // loop through all parts in collection to find a match for partID
  // 1st param of .findOne() is filter object, 2nd is cb with 2 params: err and foundObject
  Inventory.findOne({_id: itemID}, (err, foundPart) => {
    if (err) { console.log(err);
    } else {
      const subkey = `P/N ${foundPart.itemNum} in ${foundPart.siteName} warehouse`;
      res.render("inv/inventorypage", { user : req.user, part: foundPart, title: "Parts Inventory", key: subkey });
    }
  });
});




      // Inventory - ADD route for creating new inventory entries

router.get("/add", ensureAuthenticated, (req, res) => {
  res.render("inv/addInv", { user : req.user, title: "Parts Inventory", key: "Add New" }); // rendering addInv.ejs
});

router.post("/add", ensureAuthenticated, (req, res) => {
  const { itemNum, description, siteName } = req.body;

  // TO DO -- take in 4-character siteName and use it to return the warehouse
  const mySite = siteFinder(siteName);

  const newInventory = new Inventory({
    itemNum,
    description,
    siteName,
    warehouse: mySite
  });


  console.log(newInventory);

  newInventory.save() // .save() returns a promise
  .then(user => {
    req.flash("success_msg", "New inventory entry was saved successfully");
    res.redirect(`/inv/page/${newInventory.id}`); // once .save() has executed, redirect to entry we just created
  })
  .catch(err => console.log(err));

});


      // Inventory - route to EDIT an existing inventory entry

router.post("/edit", ensureAuthenticated, (req, res) => {
  const { itemNum, description, siteName } = req.body;

  // TO DO -- take in 4-character siteName and use it to return the warehouse
  const mySite = siteFinder(siteName);

  const updatedInventory = {
    itemNum,
    description,
    siteName,
    warehouse: mySite
  };

  Inventory.findByIdAndUpdate(partID, updatedInventory, (err) => {
    if (err) { console.log(err);
    } else {
      console.log(`Updated entry with ID ${partID}.`);
      req.flash("success_msg", "Inventory entry was updated successfully");
      res.redirect(`/inv/page/${partID}`); // redirecting to the individual page we just edited
    };
  });

});


      // Inventory - route to DELETE an existing inventory entry

router.post("/delete", ensureAuthenticated, (req, res) => {
  const toBeDeleted = req.body.partID;
  console.log(`To be deleted: ${toBeDeleted}`);

  Inventory.findByIdAndDelete(toBeDeleted, (err) => {
    if (err) { console.log(err);
    } else {
      console.log(`Deleted one entry with ID ${toBeDeleted}.`);
      req.flash("success_msg", "That entry has been deleted from Parts Inventory");
      res.redirect("/inv/search");
    };
  }); // callback is mandatory or .findByIdAndDelete() will not succeed

});



  // Inventory - route to allow bulk uploads of inventory data in JSON format

router.get("/upload", ensureAuthenticated, (req, res) => {
  res.render("inv/upload", { user : req.user, title: "Parts Inventory", key: "Bulk Upload Inventory Report" });
});

router.post("/upload", ensureAuthenticated, (req, res) => {
  // take in text field from upload form
  const jsonData = req.body.jsonData;
  // console.log(jsonData);
  // parse the text from the upload form
  const toInsert = JSON.parse(jsonData);

  // delete current contents of database
  Inventory.deleteMany({}, (err) => {
    if (err) { console.log(err);
    } else {
      // once we're through deleting, insert the parsed JSON from the upload form
      Inventory.insertMany(toInsert, (err, docs) => {
        if (err) { console.log(err);
        } else {
          req.flash("success_msg", "Successfully uploaded new inventory data.");
          res.redirect("/inv/upload");
        }
      });
    }
  });

});


// experimental route to compress all entries by quantity

// router.get("/report", ensureAuthenticated, (req, res) => {
// Inventory.find({}, (err, foundParts) => {
// if (err) { console.log(err);
// } else {
//
// let newArray = myTally(foundParts); // retain myTally here, for running report + JSON-formatting it
//
// res.render("inv/report", { user : req.user, parts: newArray, title: "Parts Inventory", key: "CSV Report"});
// }
// });
// });



// Okay, so it SEEMS the issue with Inventory.find() returning null was that the schema for the Inventory model didn't match the data in the inventorys collection.
// Modified Model >> const Inventory = mongoose.model("Inventory", inventorySchema, "fixedinventory");
      //(model name, schema name, collection name)
// Modified JSON file >> "itemNum": "119738600"   .... before it was "itemNum": 119738600
    // this was probably the issue: itemNum was a String in the Model, but an integer in the DB

// converted all itemNums in JSON file to strings
// Achieved this by unchecking "parse numbers" and "parse JSON" on https://www.csvjson.com/csv2json


module.exports = router;
