require('dotenv').config();

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

// user model
const User = require("../models/User");

// Login page
router.get("/login", (req, res) => {
  res.render("main/login");
});

// Register page
router.get("/register", (req, res) => {
  res.render("main/register");
});

// Registration handler -- registration DISABLED in DEMO version

// router.post("/register", (req, res) => {
//   const { name, email, token, password, password2 } = req.body;
//
//   let errors = []; // initialize empty array to hold validation errors
//
//   // check required fields
//   if (!name || !email || !password || !password2 || !token) { // if any field is blank...
//     errors.push({ msg: "Please fill in all fields" }); // .. push an error OBJECT into errors array
//   }
//   if (token !== process.env.MY_TOKEN) {
//     errors.push({ msg: "Your token is incorrect, please try again" });
//   }
//   // check that passwords match
//   if (password !== password2) {
//     errors.push({ msg: "Please check that both passwords match" }); //
//   }
//   // check that password is at least 6 characters long
//   if (password.length < 6) {
//     errors.push({ msg: "Password should be at least 6 characters" }); //
//   }
//
//   if (errors.length > 0) { // if there ARE any errors stored in the errors array
//     res.render("register", {
//       errors, // because we have destructured above, we don't have to write "name: name" and so on
//       token,
//       name,
//       email,
//       password,
//       password2
//     });
//
//   } else {
//     // validation passed
//     User.findOne({ email: email }) // find a User in the database whose email matches req.body.email
//       .then(user => { // this returns a promise with the found user
//         if (user) { // if there were any users found...
//           errors.push({ msg: "That email address is already registered" });
//           res.render("register", { errors, token, name, password, password2 });
//         } else {
//           // otherwise, create a new user with the given info
//           const newUser = new User({
//             name, // because we have destructured above, we don't have to write "name: name" and so on
//             email,
//             password
//           }); // we don't need to add in the "date" field, this is added by DEFAULT
//
//           // hash the password
//           bcrypt.genSalt(10, (err, salt) => {
//           // bcrypt.genSalt() takes in # of salt rounds, and returns a callback with the generated salt
//             bcrypt.hash(newUser.password, salt, (err, hash) => {
//             // bcrypt.hash() takes in the password to be hashed, the salt, and returns a cb with the hashed password
//               if (err) throw err;
//               newUser.password = hash; // set newUser's password to the hashed result of bcrypt.hash()
//               newUser.save() // .save() returns a promise
//                 .then(user => {
//                   // STEP 5) after saving a new user, call req.flash() with the message, and define the message text (STEP 6 is in messages.ejs)
//                   req.flash("success_msg", "You are now registered and can login");
//                   res.redirect("/users/login"); // once newUser.save() has executed, redirect
//                 })
//                 .catch(err => console.log(err));
//             });
//           });
//
//         }
//
//       }); // end of User.findOne().then()
//   }
// }); // end of router.post()

// login Handler
// this implements the local strategy we defined in our passport.js file
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

// Logout Handler
router.get("/logout", (req, res) => {
  req.logout(); // logs out of session -- this is a passport method
  req.flash("success_msg", "You have successfully logged out."); // display flash message
  res.redirect("/users/login");
});



// reset password Handler

router.get("/reset", (req, res) => {
  res.render("main/reset");
});

// DEMO version -- disabled password reset functionality

// router.post("/reset", (req, res) => {
//   const { email, token, password, password2 } = req.body;
//
//   let errors = []; // initialize empty array to hold validation errors
//
//   // check required fields
//   if (!email || !password || !password2 || !token) { // if any field is blank...
//     errors.push({ msg: "Please fill in all fields" }); // .. push an error OBJECT into errors array
//   }
//   if (token !== process.env.MY_TOKEN) {
//     errors.push({ msg: "Your token is incorrect, please try again" });
//   }
//   // check that passwords match
//   if (password !== password2) {
//     errors.push({ msg: "Please check that both passwords match" }); //
//   }
//   // check that password is at least 6 characters long
//   if (password.length < 6) {
//     errors.push({ msg: "Password should be at least 6 characters" }); //
//   }
//
//   if (errors.length > 0) { // if there ARE any errors stored in the errors array
//     res.render("reset", {
//       errors, // because we have destructured above, we don't have to write "email:email" and so on
//       token,
//       email,
//       password,
//       password2
//     });
//
//   } else {
//     // validation passed
//     User.findOne({ email: email }) // find a User in the database whose email matches req.body.email
//       .then(user => { // this returns a promise with the found user
//         if (user) { // if there were any users found...
//           // reset user's password
//
//           // hash the password
//           bcrypt.genSalt(10, (err, salt) => {
//           // bcrypt.genSalt() takes in # of salt rounds, and returns a callback with the generated salt
//             bcrypt.hash(password, salt, (err, hash) => {
//             // bcrypt.hash() takes in the password to be hashed, the salt, and returns a cb with the hashed password
//               if (err) throw err;
//               user.password = hash; // set the found User's password to the hashed result of bcrypt.hash()
//               user.save() // .save() returns a promise
//                 .then(user => {
//                   // STEP 5) after saving a new user, call req.flash() with the message, and define the message text (STEP 6 is in messages.ejs)
//                   req.flash("success_msg", "Password reset successful, please login again");
//                   res.redirect("/users/login"); // once user.save() has executed, redirect
//                 })
//                 .catch(err => console.log(err));
//             });
//           }); // end of bcrypt.genSalt
//
//         } else {
//           // push error that the email does not exist
//           errors.push({ msg: "That email address is not yet registered" });
//           res.render("reset", { errors, email, token, password, password2 });
//         }
//       }); // end of User.findOne().then()
//   }
// }); // end of router.post()

module.exports = router;
