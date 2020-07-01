const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

// models
const User = require("../models/User");
const Memo = require("../models/Memo");


    // ALL memos

router.get("/home", ensureAuthenticated, (req, res) => {
  Memo.find({}, (err, foundMemos) => { // .find() can return an ARRAY (if multiple matches found) .. unlike .findOne(), which returns an OBJECT (because it only finds ONE)
    if (err) {
      console.log(err);
    } else {
      res.render("memos/home", { user : req.user, memos: foundMemos, key: "All Memos" }); // rendering memos.ejs
    }
  });
});

  // memos by category

router.get("/pages/:categoryID", ensureAuthenticated, (req, res) => {
  const catID = req.params.categoryID;
  Memo.find({category: catID}, (err, foundMemos) => {
    if (err) {
      console.log(err);
    } else {
      res.render("memos/home", { user : req.user, memos: foundMemos, key: catID });
    }
  });
});

    // User's individually authored memos

router.get("/myMemos", ensureAuthenticated, (req, res) => {
  myID = req.user._id;
  Memo.find({authorID: myID}, (err, foundMemos) => {
    if (err) {
      console.log(err);
    } else {
      res.render("memos/home", { user : req.user, memos: foundMemos, key: "My Memos" });
    }
  });
});

    // SEARCH routes

router.get("/search", ensureAuthenticated, (req, res) => {
  res.render("memos/search", {user : req.user, key: "Search"});
});


router.post("/search", ensureAuthenticated, (req, res) => {
  const { searchKey, category } = req.body;
  let query;
  let searchObj;
  let myKey;

  if (category === "all") {
    searchObj = { memoBody: { $regex: searchKey, $options: "i" } };
    query = `"${searchKey}" in all categories`;
    myKey = `Search results for ${query}`;
  } else {
    searchObj = { memoBody: { $regex: searchKey, $options: "i" }, category: category };
    query = `"${searchKey}" in ${category} category`;
    myKey = `Search results for ${query}`;
  };

  Memo.find(searchObj, (err, foundMemos) => {
    if (err) { console.log(err);
    } else {
      res.render("memos/results", { user : req.user, memos: foundMemos, key: myKey, query: query });
    }
  });

});



    // routes for individual memo entries

router.get("/memopage/:memoID", ensureAuthenticated, (req, res) => {
  // take in the route parameter and set it to requestedID
  // route param "memoID" should already be the memo._id, because we generated hrefs pointing to memo._id in memos.ejs
  const requestedID = req.params.memoID;

  // loop through all memos in collection to find a match for requestedID
  // 1st param of .findOne() is filter object, 2nd is cb with 2 params: err and foundObject
  Memo.findOne({_id: requestedID}, (err, foundMemo) => {
    if (err) {
      console.log(err);
    } else {

      const createDay = new Date(foundMemo.date).toDateString();
      const modDay = new Date(foundMemo.modDate).toDateString();

      res.render("memos/memopage", { user : req.user, memo: foundMemo, createDay: createDay, modDay: modDay, key: foundMemo.title });
    }
  });
});


  // COMPOSE route for creating new memos

router.get("/compose", ensureAuthenticated, (req, res) => {
  res.render("memos/compose", { user : req.user, key: "Compose" }); // rendering compose.ejs
});

router.post("/compose", ensureAuthenticated, (req, res) => {
  const { title, memoBody, category } = req.body;

  const newMemo = new Memo({
    title,
    memoBody,
    category,
    author: req.user.name,
    authorID: req.user._id
  }); // we don't need to add in the "date" field, this is added by DEFAULT
  newMemo.save() // .save() returns a promise
    .then(user => {
      req.flash("success_msg", "New memo was saved successfully");
      res.redirect(`memopage/${newMemo.id}`); // once newMemo.save() has executed, redirect to THAT MEMO's personal page
    })
    .catch(err => console.log(err));

});


    // route to EDIT an existing memo

router.post("/edit", ensureAuthenticated, (req, res) => {
  const { title, memoBody, category, memoID } = req.body;
  const today = new Date();

  const updatedMemo = {
    title,
    memoBody,
    category,
    modAuthor: req.user.name,
    modDate: today,
    modified: true
  }

  Memo.findByIdAndUpdate(memoID, updatedMemo, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Updated memo with ID ${memoID}.`);
      req.flash("success_msg", "Memo was edited successfully");
      res.redirect(`memopage/${memoID}`); // after editing, redirect to THAT MEMO's personal page
      };
  });

});


    // route to DELETE an existing memo

router.post("/delete", ensureAuthenticated, (req, res) => {
  const toBeDeleted = req.body.memoID;
  console.log(`To be deleted: ${toBeDeleted}`);

  Memo.findByIdAndDelete(toBeDeleted, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Deleted one memo with ID ${toBeDeleted}.`);
      req.flash("success_msg", "Memo has been deleted");
      res.redirect("home");
      };
  }); // callback is mandatory or .findByIdAndDelete() will not succeed

});



module.exports = router;
