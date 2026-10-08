import TicketModel from '../models/Ticket.js';
import { isValidObjectId, Types } from "mongoose";

export const createTicket = async (ticketData) => {
    if (!isValidObjectId(ticketData.user) || !isValidObjectId(ticketData.event)) {
        return null; }
    const ticket = new TicketModel(ticketData);
    return await ticket.save();
};

export const findTicketById = async (ticketId) => {
    if (!isValidObjectId(ticketId)) {
        return null;
    }
    return await TicketModel.findById(ticketId);
};

export const findTicketsByUser = async (userId) => {
    if (!isValidObjectId(userId)) {
        return [];
    }
    return await TicketModel.find({ user: userId }).populate('event', 'title date location');
};

export const findTicketsByEvent = async (eventId) => {
    if (!isValidObjectId(eventId)) {
        return [];
    }
    return await TicketModel.find({ event: eventId }).populate('user', 'first_name last_name email');
};

export const findActiveTicket = async (userId, eventId) => {
    if (!isValidObjectId(userId) || !isValidObjectId(eventId)) {
        return null;
    }
    return await TicketModel.findOne({ user: userId, event: eventId, status: { $ne: 'cancelled' } });
};

export const countOccupiedTickets = async (eventId) => {
    if (!isValidObjectId(eventId)) {
        return 0;
    }
    const result = await TicketModel.aggregate([
        { $match: { event: new Types.ObjectId(eventId), status: { $ne: 'cancelled' } } },
        { $group: { _id: null, occupiedTickets: { $sum: `$quantity` } } }
    ]);
    return result.length > 0 ? result[0].occupiedTickets : 0;
};

export const updateTicketById = async (ticketId, data) => {
    if (!isValidObjectId(ticketId)) {
        return null;
    }
    return await TicketModel.findByIdAndUpdate(ticketId, data, { new: true });
};