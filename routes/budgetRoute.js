const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");

// Set budget
router.post("/set-budget", async (req, res) => {
  try {
    const { userid, budget } = req.body;
    const user = await userModel.findById(userid);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    user.budget = budget;
    await user.save();
    res.status(200).json({ success: true, message: "Budget updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get budget
router.post("/get-budget", async (req, res) => {
  try {
    const { userid } = req.body;
    const user = await userModel.findById(userid);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, budget: user.budget || 0 });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
