module.exports = {
  MongoURI: "mongodb+srv://NewAdmin:UEclm0ebsRBtmGXU@cluster0-cfetv.mongodb.net/fruDB"
}

// connection string stored in config/keys.js
// will be accessed in app.js via the below line:
// const db = require("./config/keys").MongoURI;

// is this file optional? We've already stored the MongoURI in our .env file
