import Event from "../models/Event.js";

export const createEventController = async (req, res, next) => {
  try {
    const { title, description, date, location } = req.body;
    const event = await Event.create({
      title,
      description,
      date,
      location,
      organizer: req.user.id
    });
    res.status(201).json({ "status": "success", "payload": event });
  } catch (error) {
   next(error);
  }
};

export const eventsController = (req, res) => {
  res.status(200).json({ "status": "success", "payload": [] });
};

export const updateEventController = async (req, res,next) => {
  try {
    const findEventUpdate = await Event.findById(req.params.id);
    if (!findEventUpdate) {
      return res.status(404).json({ "status": "error", "message": "No se encuentra el evento" });
    }
    const userRole = req.user.role;
    if (
      req.user.id !== findEventUpdate.organizer.toString() &&
      userRole !== 'admin'
    ) {
      return res.status(403).json({ "status": "error", "message": "No tienes permiso para actualizar este evento" });
    }
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ "status": "success", "payload": updatedEvent });
  } catch (error) {
    next(error);
  }
};