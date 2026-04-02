const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  student:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  exam:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Exam"
  },
  score:Number
});

module.exports = mongoose.model("Result",resultSchema);