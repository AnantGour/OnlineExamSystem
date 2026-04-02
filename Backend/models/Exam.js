const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  title:String,
  description:String,
  duration:Number,
  totalMarks:Number,
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
});

module.exports = mongoose.model("Exam",examSchema);