const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question"
  },
  selectedAnswer: String,
  correctAnswer: String,
  isCorrect: Boolean,
  timeTaken: Number // seconds per question
});

const resultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam"
  },

  totalQuestions: Number,
  attempted: Number,
  correct: Number,
  wrong: Number,
  skipped: Number,

  score: Number,
  percentage: Number,

  totalTime: Number, // total exam duration
  timeTaken: Number, // actual time user used

  subjectWiseAnalysis: [
    {
      subject: String,
      correct: Number,
      wrong: Number,
      skipped: Number
    }
  ],

  answers: [answerSchema], // full answer tracking

  status: {
    type: String,
    enum: ["PASS", "FAIL"],
    default: "FAIL"
  }

}, { timestamps: true });

module.exports = mongoose.model("Result", resultSchema);