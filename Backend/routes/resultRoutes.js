const express = require("express");
const Result = require("../models/Result");

const router = express.Router();

// ================= SUBMIT RESULT =================
router.post("/submit", async (req, res) => {
  try {
    const {
      student,
      exam,
      answers,
      totalTime,
      timeTaken
    } = req.body;

    let correct = 0;
    let wrong = 0;
    let skipped = 0;

    answers.forEach(ans => {
      if (!ans.selectedAnswer) {
        skipped++;
      } else if (ans.selectedAnswer === ans.correctAnswer) {
        correct++;
      } else {
        wrong++;
      }
    });

    const totalQuestions = answers.length;
    const attempted = correct + wrong;
    const score = correct; // simple scoring
    const percentage = (score / totalQuestions) * 100;

    const result = new Result({
      student,
      exam,
      answers,
      totalQuestions,
      attempted,
      correct,
      wrong,
      skipped,
      score,
      percentage,
      totalTime,
      timeTaken,
      status: percentage >= 40 ? "PASS" : "FAIL"
    });

    await result.save();

    res.json({ message: "Result submitted", result });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= GET ALL RESULTS =================
router.get("/", async (req, res) => {
  try {
    const results = await Result.find()
      .populate("student", "name email")
      .populate("exam", "title");

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= GET RESULT BY USER =================
router.get("/user/:userId", async (req, res) => {
  try {
    const results = await Result.find({ student: req.params.userId })
      .populate("exam", "title");

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= GET SINGLE RESULT =================
router.get("/:id", async (req, res) => {
  try {
    const result = await Result.findById(req.params.id)
      .populate("student")
      .populate("exam")
      .populate("answers.questionId");

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;