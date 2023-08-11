require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const mongoose = require("mongoose");
const ticketsRoutes = require("./routes/ticketsRoutes");
const usersRoutes = require("./routes/usersRoutes");
const helmet = require("helmet");

// Create an instance of the Express application
const app = express();

// Middleware
app.use(express.json()); // Parse incoming requests with JSON payloads

// Enable Helmet middleware for enhanced security
app.use(helmet());

// Middleware to log the path and method of each incoming request
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/tickets", ticketsRoutes); // Use ticketsRoutes for '/api/tickets' endpoint
app.use("/api/users", usersRoutes); // Use usersRoutes for '/api/users' endpoint

// Connect to the database
mongoose
  .connect(process.env.MONGO_URI) // Use the MONGO_URI environment variable to connect to the MongoDB database
  .then(() => {
    console.log("Connected to database");
    // Start the server and listen for incoming requests
    app.listen(process.env.PORT || 4000, () => {
      console.log("Listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
