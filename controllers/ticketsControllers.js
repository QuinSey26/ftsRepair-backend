const Ticket = require("../models/ticketModel");
const mongoose = require("mongoose");

// Retrieves all tickets from the database.
// The tickets are sorted in descending order based on their creation date.
const getTickets = async (req, res) => {
  const tickets = await Ticket.find({}).sort({ createdAt: -1 });

  res.status(200).json(tickets);
};

// Retrieves a single ticket from the database based on the provided ID.
const getTicket = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such ticket" });
  }

  const ticket = await Ticket.findById(id);

  if (!ticket) {
    return res.status(404).json({ error: "No such ticket" });
  }

  res.status(200).json(ticket);
};

// Creates a new ticket in the database.
const createTicket = async (req, res) => {
  const { title, text, tech, status } = req.body;

  try {
    const ticket = await Ticket.create({ title, text, tech, status });
    res.status(200).json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Retrieves all open tickets from the database.
// The tickets are sorted in descending order based on their creation date.
const getOpenTickets = async (req, res) => {
  const tickets = await Ticket.find({ status: "open" }).sort({ createdAt: -1 });

  res.status(200).json(tickets);
};

// Retrieves all closed tickets from the database.
// The tickets are sorted in descending order based on their creation date.
const getClosedTickets = async (req, res) => {
  const tickets = await Ticket.find({ status: "closed" }).sort({
    createdAt: -1,
  });

  res.status(200).json(tickets);
};

// Deletes a ticket from the database based on the provided ID.
const deleteTicket = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such ticket" });
  }

  const ticket = await Ticket.findOneAndDelete({ _id: id });

  if (!ticket) {
    return res.status(400).json({ error: "No such ticket" });
  }

  res.status(200).json(ticket);
};

// Updates a ticket in the database based on the provided ID.
const updateTicket = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such ticket" });
  }

  const ticket = await Ticket.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!ticket) {
    return res.status(400).json({ error: "No such ticket" });
  }

  res.status(200).json(ticket);
};

module.exports = {
  getClosedTickets,
  getOpenTickets,
  getTicket,
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
};
