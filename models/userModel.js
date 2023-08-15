// Import required modules
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

// Get the Schema class from Mongoose
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Tech",
    enum: ["Tech", "Admin"],
  },
  active: {
    type: String,
    default: "Active",
    enum: ["Inactive", "Active"],
  },
});

/**
 * Static method for user signup.
 * Creates a new user document in the database with the provided email, password, first name, last name, and role.
 * Performs validation checks on the input fields before creating the user.
 * Hashes the password using bcrypt before storing it in the database.
 */
userSchema.statics.signup = async function (
  email,
  password,
  firstName,
  lastName,
  role
) {
  // Check if email already exists
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Create the user document
  const user = await this.create({
    email,
    password: hash,
    firstName,
    lastName,
    role,
  });

  return user;
};

/**
 * Static method for user login.
 * Finds a user document in the database with the provided email.
 * Compares the provided password with the hashed password stored in the database using bcrypt.
 * Returns the user document and role if the login is successful.
 */
userSchema.statics.login = async function (email, password, role) {
  // Validation checks
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  // Find the user document with the provided email
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  // Compare the passwords
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return { user, role };
};

// Export the User model
module.exports = mongoose.model("User", userSchema);
