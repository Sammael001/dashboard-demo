const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// load User model
const User = require("../models/User");
// bringing in User.js, which is OUTSIDE the current (config) folder, which is why we preface with ../

// exporting strategy so it can be used elsewhere
module.exports = function(passport) { // this function takes in passport (from app.js)
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    // this strategy takes in the destructured req.body.email, req.body.password, and also 'done'
      // match the email
      User.findOne({ email: email })
        .then(user => { // this promise returns either the user, or NULL
          if (!user) { // if no user found...
            // done() has 3 params: error, user, and options
            return done(null, false, { message: "That email is not registered" });
            // here we're setting error: null, user: false, and passing in a message for the options
          }
          // match the plaintext password with the hashed password
          // we're still inside .then(), so we have access to the returned user
          bcrypt.compare(password, user.password, (err, isMatch) => {
            // bcrypt.compare returns a cb with an err and a boolean "isMatch", which is TRUE if the user's hashed pw matches the pw stored in our database
            if (err) throw err;
            if (isMatch) { // if isMatch is TRUE, and the passwords matched
              return done(null, user); // return error: null and the USER
            } else {
              return done(null, false, { message: "The password is incorrect" });
            }
          });
        })
        .catch(err => console.log(err));
    }) // end of new LocalStrategy({})
  ); // end of passport.use()

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

} // end of the function we're going to export
