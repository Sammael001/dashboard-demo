require('dotenv').config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

// FLASH MESSAGES: these are stored in the SESSION, which is necessary to display messages after redirecting
// STEP 1) after installing, require needed packages
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");


const app = express();

// passport config
// requiring the Local Passport strategy we defined in passport.js in the config folder
require("./config/passport")(passport);

// specified to resolve deprecation warning in console
mongoose.set('useFindAndModify', false);

// Connect to Mongo Atlas via process.env.MONGO_URI
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("MongoDB connected..."))
.catch(err => console.log(err));

// EJS
app.use(express.static("public")); // necessary to serve up css/js from public folder
app.use(expressLayouts); // this line goes above
app.set("view engine", "ejs"); // this line goes below

// BodyParser - now a part of EJS and does not need to be npm installed
// app.use(express.urlencoded({ extended: false }));

// These lines below fixed error regarding "PayloadTooLargeError: request entity too large" when uploading JSON to db
// https://stackoverflow.com/questions/19917401/error-request-entity-too-large
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

// Express-session
// STEP 2) use express-session middleware
app.use(session({
  secret: process.env.MY_SECRET,
  resave: true,
  saveUninitialized: true,
}));

// PassportJS middleware
// this goes AFTER express-session middleware
app.use(passport.initialize());
app.use(passport.session());

// connect-flash
// STEP 3) use flash middleware
app.use(flash());

// STEP 4) declare custom middleware with global vars (STEP 5 is in users.js)
// use format "app.use((req, res, next) => {});" to set your own middleware
app.use((req, res, next) => { // declaring our own middleware to set different colors of flash messages
res.locals.success_msg = req.flash("success_msg"); // declaring "res.locals.<whatever>" will set global variables
res.locals.error_msg = req.flash("error_msg");
res.locals.error = req.flash("error"); // this is passport's default error message, returned from login with invalid username/password
next();
});


// ROUTES

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users")); 
app.use("/inv", require("./routes/inv"));
app.use("/mango", require("./routes/mango"));

// PORT and listen

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
