import { saveEvent, getEventById, editEvent, listEvents } from "../repositories/events.repository.js";

const STATUS_VALUES = ['draft', 'published', 'cancelled', 'finished'];
const EDITABLE_FIELDS = ['title', 'description', 'category', 'date', 'location', 'capacity', 'price'];


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
    };
    if (capacity !== undefined && (!Number.isInteger(Number(capacity)) || Number(capacity) <= 0)) {
        throw fail(400, "La capacidad debe ser un numero entero mayor a 0");
    };
    if (price !== undefined && (Number.isNaN(Number(price)) || Number(price) < 0)) {
        throw fail(400, "El precio no puede ser negativo");
    };
};

export const createEvent = async (eventData, organizerId) => {
    validateEventData(eventData, { checkPastDate: true });
    return await saveEvent({ ...eventData, organizer: organizerId });
};


export const updateEvent = async (id, body, user) => {
    const event = await getEventById(id);
    if (!event) throw fail(404, "No se encuentra el evento");
    if (user.role !== 'admin' && event.organizer.toString() !== user.id) {
        throw fail(403, "No tienes permiso para actualizar este evento");
    };
    if (event.status === 'cancelled') throw fail(400, "Un evento cancelado no puede modificarse");
    const data = Object.fromEntries(Object.entries(body).filter(([key]) => EDITABLE_FIELDS.includes(key)));
    validateEventData(data, { checkPastDate: true });
    return await editEvent(id, data);
};

export const getEvent = async (id) => {
    const event = await getEventById(id);
    if (!event) 
        throw fail(404, "No se encuentra el evento");
    return event;
};

export const updateEventStatus = async (id, status, user) => {
    const event = await getEventById(id);
    if (!event) throw fail(404, "No se encuentra el evento");
    if (user.role !== 'admin' && event.organizer.toString() !== user.id) {
        throw fail(403, "No tienes permiso para actualizar este evento");
    };
    if (event.status === 'cancelled') throw fail(400, "Un evento cancelado no puede modificarse");
    if (!STATUS_VALUES.includes(status)) {
        throw fail(400, "Estado de evento no válido");
    };
    if(status === 'published' && event.status !== 'draft') {
        throw fail(400, "Un evento solo puede publicarse si está en borrador");
    };
    if(status === 'finished' && event.status !== 'published') {
        throw fail(400, "Un evento solo puede marcarse como finalizado si está publicado");
    };
    if(status === 'cancelled' && event.status === 'finished') {
        throw fail(400, "Un evento finalizado no puede ser cancelado");
    };
    if(status === 'draft' && event.status !== 'draft') {
        throw fail(400, "Un evento solo puede volver a borrador si no fue publicado o finalizado");
    };
    return await editEvent(id, { status });
};

export const getEvents = async ( { page, limit, status, category, location,dateFrom,dateTo, sort } ) => {
    if (page === undefined) page = 1;
    page = Number(page);
    if (!Number.isInteger(page) || page < 1) {
        throw fail(400, "La página debe ser un numero entero mayor o igual a 1");
    };
    if (limit === undefined) limit = 10;
    limit = Number(limit);
    if (!Number.isInteger(limit) || limit < 1 || limit > 50) {
        throw fail(400, "El límite debe ser un numero entero entre 1 y 50");
    };
    const filter = {};
    if (status) {filter.status = status;};
    if (category) {filter.category = category;};
    if (location) {filter.location = location;};
    if (dateFrom) {
        const from = new Date(dateFrom);
        if (Number.isNaN(from.getTime())) throw fail(400, "La fecha desde debe ser una fecha válida");
        filter.date = { $gte: from };
    };
    if (dateTo) {
        const to = new Date(dateTo);
        if (Number.isNaN(to.getTime())) throw fail(400, "La fecha hasta debe ser una fecha válida");
        filter.date = filter.date || {};
        filter.date.$lte = to;
    };
    sort = sort ? { [sort]: 1 } : {};
    const skip = (page - 1) * limit;
    
    const { events, total } = await listEvents(filter, sort, skip, limit);
    const totalPages = Math.ceil(total / limit);
    return { data: events, page, limit, total, totalPages };
}; 