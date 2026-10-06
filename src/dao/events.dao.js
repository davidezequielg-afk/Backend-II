import Event from "../models/Event.js";

export const createEvent = async (eventData) => {
    return await Event.create(eventData);
};

export const findEventById = async (id) => {
    return await Event.findById(id);
};

export const updateEventById = async (id, data) => {
    return await Event.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};
