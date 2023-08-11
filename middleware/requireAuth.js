const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Middleware function to require authentication for protected routes.
const requireAuth = async (req, res, next) => {
  // Verify if the user is authenticated
  const { authorization } = req.headers;

  // Check if authorization header is present
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  // Extract the token from the authorization header
  const token = authorization.split(" ")[1];

  try {
    // Verify the token using the secret key
    const payload = jwt.verify(token, process.env.SECRET);

    // Find the user based on the user ID in the payload
    req.user = await User.findOne({ _id: payload.userId }).select("_id");

    // Call the next middleware function
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
