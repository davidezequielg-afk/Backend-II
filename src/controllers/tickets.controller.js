import { createTicket, getEventTickets, cancelTicket, getMyTickets } from "../services/tickets.service.js";
import { TicketDTO } from "../dto/ticket.dto.js";

export const createTicketController = async (req, res, next) => {
    try {
        const { quantity } = req.body;
        const { eventId } = req.params;
        const user = req.user;
        const ticket = await createTicket(eventId, user, quantity);
        res.status(201).json(new TicketDTO(ticket));
    } catch (error) {
        next(error);
    }
};

export const getEventTicketsController = async (req, res, next) => {
    try {
        const { eventId } = req.params;
        const user = req.user;
        const tickets = await getEventTickets(eventId, user);
        res.status(200).json(tickets.map(ticket => new TicketDTO(ticket)));
    } catch (error) {
        next(error);
    }
};

export const cancelTicketController = async (req, res, next) => {
    try {
        const { ticketId } = req.params;
        const user = req.user;
        const ticket = await cancelTicket(ticketId, user);
        res.status(200).json(new TicketDTO(ticket));
    } catch (error) {
        next(error);
    }
};

export const getMyTicketsController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const tickets = await getMyTickets(userId);
        res.status(200).json(tickets.map(ticket => new TicketDTO(ticket)));
    } catch (error) {
        next(error);
    }
};