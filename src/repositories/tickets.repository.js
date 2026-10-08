import { createTicket, findTicketById, findTicketsByUser, findTicketsByEvent, findActiveTicket, countOccupiedTickets, updateTicketById } from '../dao/tickets.dao.js';

export const saveTicket = async (ticketData) => {
    return await createTicket(ticketData);
};

export const getTicketById = async (ticketId) => {
    return await findTicketById(ticketId);
};

export const getTicketsByUser = async (userId) => {
    return await findTicketsByUser(userId);
};

export const getTicketsByEvent = async (eventId) => {
    return await findTicketsByEvent(eventId);
};

export const getActiveTicket = async (userId, eventId) => {
    return await findActiveTicket(userId, eventId);
};

export const getOccupiedTicketsCount = async (eventId) => {
    return await countOccupiedTickets(eventId);
};

export const updateTicket = async (ticketId, data) => {
    return await updateTicketById(ticketId, data);
};