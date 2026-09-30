import Event from "../models/Event.js";

export const createEvent = async (eventData) => {
    return await Event.create(eventData);
};
