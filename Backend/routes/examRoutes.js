const express = require("express");

const Exam = require("../models/Exam");

const router = express.Router();

router.post("/create", async (req, res) => {

  const exam = new Exam(req.body);

  await exam.save();

  res.json(exam);

});

router.get("/", async (req, res) => {

  const exams = await Exam.find();

  res.json(exams);

});

module.exports = router;