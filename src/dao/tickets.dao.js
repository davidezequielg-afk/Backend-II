import TicketModel from '../models/Ticket.js';
import { isValidObjectId } from "mongoose";

class TicketDAO {
    async create(ticketData) {
    if (!isValidObjectId(ticketData.user) || !isValidObjectId(ticketData.event)) {
        return null; }
    const ticket = new TicketModel(ticketData);
    return await ticket.save();
};
    async findById(ticketId) {
    if (!isValidObjectId(ticketId)) {
        return null;
    }
    return await TicketModel.findById(ticketId);
};
    async findOne(filter) {
    return await TicketModel.findOne(filter);
};
    async find(filter, populate) {
    const query = TicketModel.find(filter);
    if (populate) {
        query.populate(populate);
    }
    return await query;
};
    async update(ticketId, data) {
    if (!isValidObjectId(ticketId)) {
        return null;
    }
    return await TicketModel.findByIdAndUpdate(ticketId, data, { new: true });
};
    async aggregate(pipeline) {
    return await TicketModel.aggregate(pipeline);
};
}

export default new TicketDAO()