import { saveEvent } from "../repositories/events.repository.js";

export const createEvent = async (eventData) => {
    const eventDate = new Date(eventData.date);
    const nowDate = new Date();
    if (eventDate < nowDate) {
        throw new Error("El evento no puede tener una fecha anterior a la actual");
    }
    return await saveEvent(eventData);
};