const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,

  duration: { type: Number, required: true }, // minutes
  totalMarks: Number,

  totalQuestions: Number,

  startTime: Date,
  endTime: Date,

  isPublished: {
    type: Boolean,
    default: false
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true });

module.exports = mongoose.model("Exam", examSchema);