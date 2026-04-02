const express = require("express");

const Result = require("../models/Result");

const router = express.Router();

router.post("/submit", async (req, res) => {

  const result = new Result(req.body);

  await result.save();

  res.json(result);

});

router.get("/", async (req, res) => {

  const results = await Result.find()
    .populate("student")
    .populate("exam");

  res.json(results);

});

module.exports = router;