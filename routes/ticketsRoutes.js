const express = require("express");

// Import the ticket controller functions
const {
  getClosedTickets,
  getOpenTickets,
  createTicket,
  getTickets,
  getTicket,
  deleteTicket,
  updateTicket,
} = require("../controllers/ticketsControllers");

// Create a new router instance
const router = express.Router();

// Route to get all tickets
router.get("/", getTickets);

// Route to get open tickets
router.get("/open", getOpenTickets);

// Route to get closed tickets
router.get("/closed", getClosedTickets);

// Route to get a single ticket by ID
router.get("/:id", getTicket);

// Route to create a new ticket
router.post("/", createTicket);

// Route to delete a ticket by ID
router.delete("/:id", deleteTicket);

// Route to update a ticket by ID
router.put("/:id", updateTicket);

// Export the router
module.exports = router;
