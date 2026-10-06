import { createEvent, findEventById, updateEventById } from "../dao/events.dao.js";

export const saveEvent = async (eventData) => {
    return await createEvent(eventData);
};

export const getEventById = async (id) => {
    return await findEventById(id);
};

export const editEvent = async (id, data) => {
    return await updateEventById(id, data);
};
