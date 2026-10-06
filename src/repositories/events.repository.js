import { createEvent, findEventById, updateEventById, findEvents } from "../dao/events.dao.js";

export const saveEvent = async (eventData) => {
    return await createEvent(eventData);
};

export const getEventById = async (id) => {
    return await findEventById(id);
};

export const editEvent = async (id, data) => {
    return await updateEventById(id, data);
};

export const listEvents = async (filter, sort, skip, limit) => {
    return await findEvents(filter, sort, skip, limit);
};
