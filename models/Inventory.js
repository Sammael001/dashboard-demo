
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
  warehouse: {
    type: String,
    required: true
  },
  siteName: {
    type: String,
    required: true
  },

});

const Inventory = mongoose.model("Inventory", inventorySchema, "demoInventory");
// (model name, schema name, collection name)


module.exports = Inventory;
