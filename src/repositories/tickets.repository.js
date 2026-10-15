import TicketDAO from '../dao/tickets.dao.js';
import { Types } from "mongoose";

class TicketRepository {
    async create(ticketData) {
        return await TicketDAO.create(ticketData);
    }
    async findActiveByUserAndEvent(userId, eventId) {
        const ticket = await TicketDAO.findOne({ user: userId, event: eventId, status: { $ne: 'cancelled' } });
        return ticket;
    }
    async findByUser(userId) {
        const tickets = await TicketDAO.find({ user: userId }, { path: 'event', select: 'title date location' });
        return tickets;
    }
    async findById(ticketId) {
        return await TicketDAO.findById(ticketId);
    }
    async findByEvent(eventId) {
        const tickets = await TicketDAO.find({ event: eventId }, { path: 'user', select: 'first_name last_name email' });
        return tickets;
    }
    async countActiveTickets(eventId) {
        const pipeline = [
            { $match: { event: new Types.ObjectId(eventId), status: { $ne: 'cancelled' } } },
            { $group: { _id: null, activeTickets: { $sum: '$quantity' } } }
        ];
        const result = await TicketDAO.aggregate(pipeline);
        return result.length > 0 ? result[0].activeTickets : 0;
    }
    async cancelTicket(ticketId) {
        const ticketCancelled = await TicketDAO.update(ticketId, { status: 'cancelled', cancelledAt: new Date() });
        return ticketCancelled;
    }
}

export default new TicketRepository();