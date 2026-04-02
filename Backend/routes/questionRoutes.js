const express = require("express");

const Question = require("../models/Question");

const router = express.Router();

router.post("/add", async (req, res) => {

  const question = new Question(req.body);

  await question.save();

  res.json(question);

});

router.get("/:examId", async (req, res) => {

  const questions = await Question.find({
    examId: req.params.examId
  });

  res.json(questions);

});

module.exports = router;