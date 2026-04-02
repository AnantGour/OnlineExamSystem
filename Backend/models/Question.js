const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true
  },

  subject: {
    type: String, // Physics, Chemistry, Math
    required: true
  },

  category: {
    type: String, // Easy, Medium, Hard OR Section A/B
    default: "General"
  },

  question: {
    type: String,
    required: true
  },

  options: [
    {
      text: String,
      isCorrect: Boolean
    }
  ],

  marks: {
    type: Number,
    default: 1
  },

  negativeMarks: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);