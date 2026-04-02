const express = require("express");
const Exam = require("../models/Exam");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// ✅ Create Exam (Admin only)
router.post("/create", auth, admin, async (req, res) => {
  try {
    const exam = new Exam({
      ...req.body,
      createdBy: req.user.id
    });

    await exam.save();
    res.json(exam);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get All Exams (Student Dashboard)
router.get("/", auth, async (req, res) => {
  const exams = await Exam.find({ isPublished: true });
  res.json(exams);
});

// ✅ Publish Exam
router.put("/publish/:id", auth, admin, async (req, res) => {
  const exam = await Exam.findByIdAndUpdate(
    req.params.id,
    { isPublished: true },
    { new: true }
  );

  res.json(exam);
});

module.exports = router;