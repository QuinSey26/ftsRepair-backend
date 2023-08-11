const mongoose = require("mongoose");
const { getTickets, createTicket } = require("../ticketControllers");
const Ticket = require("../models/ticketModel");

jest.mock("../models/ticketModel");

describe("getTickets", () => {
  it("should return all tickets", async () => {
    const mockTickets = [{ title: "Ticket 1" }, { title: "Ticket 2" }];
    Ticket.find.mockResolvedValue(mockTickets);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getTickets(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTickets);
  });
});

describe("createTicket", () => {
  it("should create a new ticket", async () => {
    const mockTicket = { title: "New Ticket" };
    const req = { body: { title: mockTicket.title } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createTicket(req, res);

    expect(Ticket.create).toHaveBeenCalledWith({ title: mockTicket.title, text: undefined, tech: undefined, status: undefined });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTicket);
  });

  it("should return an error if ticket creation fails", async () => {
    const errorMessage = "Ticket creation failed";
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Ticket.create.mockRejectedValue(new Error(errorMessage));

    await createTicket(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
