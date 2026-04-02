const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  examId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Exam"
  },
  question:String,
  options:[String],
  correctAnswer:String
});

module.exports = mongoose.model("Question",questionSchema);