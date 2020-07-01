
const mongoose = require("mongoose");

const partSchema = new mongoose.Schema({
  serverType: {
    type: String,
    required: true
  },
  partType: {
    type: String,
    required: true
  },
  itemNum: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: true
  },
});

const Part = mongoose.model("Part", partSchema, "demoParts");

module.exports = Part;
// export this model so it can be used in other files
