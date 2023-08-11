const express = require("express");

// Import controller functions
const {
  loginUser,
  signupUser,
  getAllUsers,
  editUser,
  deleteUser,
} = require("../controllers/usersController");

const router = express.Router();

// Login route
router.post("/login", loginUser);

// Signup route
router.post("/signup", signupUser);

// Get all users route
router.get("/", getAllUsers);

// Edit user route
router.patch("/:id", editUser);

// Delete user route
router.delete("/:id", deleteUser);

module.exports = router;
