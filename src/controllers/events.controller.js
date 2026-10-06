import Event from "../models/Event.js";
import { createEvent, updateEvent, getEvent } from "../services/events.service.js";

export const eventsController = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(200).json({ status: 'success', payload: events });
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