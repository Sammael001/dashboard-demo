
const mongoose = require("mongoose");

const repSchema = new mongoose.Schema({
  region: {
    type: String,
    required: true
  },
  repName: {
    type: String,
    required: true
  },
  repPhone: {
    type: String,
    required: true
  },
  repEmail: {
    type: String,
    required: true
  }
});

const Rep = mongoose.model("Rep", repSchema, "demoReps");

module.exports = Rep;
// export this model so it can be used in other files
