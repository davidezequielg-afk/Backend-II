import Event from "../models/Event.js";

export const createEventController = async (req, res) => {
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
