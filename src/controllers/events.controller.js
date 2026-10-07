import { createEvent, updateEvent, getEvent, updateEventStatus, getEvents } from "../services/events.service.js";

export const eventsController = async (req, res, next) => {
  try {
    const events = await getEvents(req.query);
    res.status(200).json({ status: 'success', payload: { page: events.page, limit: events.limit, total: events.total, totalPages: events.totalPages, data: events.data } });
  } catch (error) {
    next(error);
  }
};

export const createEventController = async (req, res, next) => {
  try {
    const { title, description, category, date, location, capacity, price } = req.body;
    const event = await createEvent({ title, description, category, date, location, capacity, price }, req.user.id);
    res.status(201).json({ status: 'success', payload: event });
  } catch (error) {
    next(error);
  }
};

export const updateEventController = async (req, res, next) => {
  try {
    const updatedEvent = await updateEvent(req.params.id, req.body, req.user);
    res.status(200).json({ status: 'success', message: 'Evento actualizado', payload: updatedEvent });
  } catch (error) {
    next(error);
  }
};

export const getEventController = async (req, res, next) => {
  try {
    const event = await getEvent(req.params.id);
    res.status(200).json({ status: 'success', message: 'Se encontró el evento buscado', payload: event });
  } catch (error) {
    next(error);
  }
};

export const updateEventStatusController = async (req, res, next) => {
  try {
    const updatedEvent = await updateEventStatus(req.params.id, req.body.status, req.user);
    res.status(200).json({ status: 'success', message: 'El estado del evento ha sido actualizado  ', payload: updatedEvent });
  } catch (error) {
    next(error);
  }
};