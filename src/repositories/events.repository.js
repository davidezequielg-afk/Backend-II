import { createEvent } from "../dao/events.dao.js";

export const saveEvent = async (eventData) => {
    return await createEvent(eventData);
};

