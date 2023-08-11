// Import the Mongoose library
const mongoose = require("mongoose");

// Create a new Mongoose Schema
const Schema = mongoose.Schema;

// Define the schema for the Ticket collection
const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    tech: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

// Export the Mongoose model for the Ticket collection
module.exports = mongoose.model("Ticket", ticketSchema);
