
const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  itemNum: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  siteCode: {
    type: String,
    required: true
  },
  wareCity: {
    type: String,
    required: true
  },
  wareCountry: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }

});

const Inventory = mongoose.model("Inventory", inventorySchema, "demoInventory");
// (model name, schema name, collection name)


module.exports = Inventory;
