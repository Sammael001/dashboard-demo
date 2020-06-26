// this file holds our mongoose schemas and models

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
});

// default: Date.now means the value stored by default will be the current date
// when creating a new User (( const newUser = new User({}); )), we don't need to define the "date" field. It will be defined for us

const User = mongoose.model("User", userSchema, "demoUsers");

module.exports = User;
// export this model so it can be used in other files
