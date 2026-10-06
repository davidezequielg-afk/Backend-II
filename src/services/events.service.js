import { saveEvent, getEventById, editEvent } from "../repositories/events.repository.js";

const fail = (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

const validateEventData = ({ date, capacity, price }, { checkPastDate = false } = {}) => {
    if (date !== undefined) {
        const eventDate = new Date(date);
        if (Number.isNaN(eventDate.getTime())) throw fail(400, "Fecha invalida");
        if (checkPastDate && eventDate < new Date()) {
            throw fail(400, "El evento no puede tener una fecha anterior a la actual");
        }
    }
    if (capacity !== undefined && (!Number.isInteger(Number(capacity)) || Number(capacity) <= 0)) {
        throw fail(400, "La capacidad debe ser un numero entero mayor a 0");
    }
    if (price !== undefined && (Number.isNaN(Number(price)) || Number(price) < 0)) {
        throw fail(400, "El precio no puede ser negativo");
    }
};

export const createEvent = async (eventData, organizerId) => {
    validateEventData(eventData, { checkPastDate: true });
    return await saveEvent({ ...eventData, organizer: organizerId });
};

const EDITABLE_FIELDS = ['title', 'description', 'category', 'date', 'location', 'capacity', 'price'];

export const updateEvent = async (id, body, user) => {
    const event = await getEventById(id);
    if (!event) throw fail(404, "No se encuentra el evento");
    if (user.role !== 'admin' && event.organizer.toString() !== user.id) {
        throw fail(403, "No tienes permiso para actualizar este evento");
    }
    if (event.status === 'cancelled') throw fail(400, "Un evento cancelado no puede modificarse");
    const data = Object.fromEntries(Object.entries(body).filter(([key]) => EDITABLE_FIELDS.includes(key)));
    validateEventData(data, { checkPastDate: true });
    return await editEvent(id, data);
};
