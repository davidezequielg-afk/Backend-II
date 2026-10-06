import Event from "../models/Event.js";
import { isValidObjectId } from "mongoose";

export const createEvent = async (eventData) => {
    return await Event.create(eventData);
};

export const findEventById = async (id) => {
    if (!isValidObjectId(id)) return null;
    return await Event.findById(id);
};

export const updateEventById = async (id, data) => {
    return await Event.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

export const findEvents = async (filter, sort, skip, limit) => {
    const events = await Event.find(filter).sort(sort).skip(skip).limit(limit);
    const count = await Event.countDocuments(filter);
    return { events, count };
};