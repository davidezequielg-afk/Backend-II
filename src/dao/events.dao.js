import Event from "../models/Event.js";
import { isValidObjectId } from "mongoose";

class EventDAO {
    async create(eventData) {
        return await Event.create(eventData);
    }
    async findById(id) {
        if (!isValidObjectId(id)) return null;
        return await Event.findById(id);
    }
    async update(id, data) {
        return await Event.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }
    async find(filter, sort, skip, limit) {
        return await Event.find(filter).sort(sort).skip(skip).limit(limit);
    }
    async count(filter) {
        return await Event.countDocuments(filter);
    }
}

export default new EventDAO();