const userModel = require('../models/userModel');

// LOGIN callback
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

// REGISTER callback
const registerController = async (req, res) => {
  try {
    console.log("📥 Register request body:", req.body);
    const newUser = new userModel(req.body);
    await newUser.save();

    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    console.error("❌ Register error:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// SET BUDGET
const setBudgetController = async (req, res) => {
  const { userId, budget } = req.body;
  try {
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).send("User not found");

    user.budget = budget;
    await user.save();

    res.status(200).json({
      success: true,
      message: "✅ Budget updated successfully",
      budget,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "❌ Error updating budget",
      error,
    });
  }
};

// GET BUDGET
const getBudgetController = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).send("User not found");

    res.status(200).json({
      success: true,
      budget: user.budget || 0,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "❌ Error fetching budget",
      error,
    });
  }
};

module.exports = {
  loginController,
  registerController,
  setBudgetController,
  getBudgetController,
};
