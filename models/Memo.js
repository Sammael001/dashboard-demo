
const mongoose = require("mongoose");

const memoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  memoBody: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  authorID: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  modified: {
    type: Boolean,
    default: false
  },
  modAuthor: {
    type: String
  },
  modDate: {
    type: String
  },
});

// default: Date.now means the value stored by default will be the current date
// when creating a new Memo (( const newMemo = new Memo({}); )), we don't need to define the "date" field. It will be defined for us

const Memo = mongoose.model("Memo", memoSchema, "demoMemos");

module.exports = Memo;
