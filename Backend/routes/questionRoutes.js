const express = require("express");
const router = express.Router();

const Question = require("../models/Question");
// const authMiddleware = require("../middleware/authMiddleware");
// const adminMiddleware = require("../middleware/adminMiddleware");


// ➕ Add Question (Admin only)
router.post("/add", async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();

    res.json({ message: "Question added", question });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 📥 Get all questions of an exam (with optional subject filter)
router.get("/:examId", async (req, res) => {
  try {
    const { subject } = req.query;

    let filter = { examId: req.params.examId };

    if (subject) {
      filter.subject = subject;
    }

    const questions = await Question.find(filter);

    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ❌ Delete Question
router.delete("/:id", async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);

    res.json({ message: "Question deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✏️ Update Question
router.put("/:id", async (req, res) => {
  try {
    const updated = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;