import EventModel from "../models/event.model.js";

export const createEvent = async (req, res) => {
  try {
    const event = await EventModel.create(req.body);

    return res.status(201).json({
      msg: "Evento creado correctamente",
      data: event,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await EventModel.find();

    return res.status(200).json({ data: events });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await EventModel.findById(id);

    if (!event) {
      return res.status(404).json({ msg: "Evento no encontrado" });
    }

    return res.status(200).json({ data: event });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await EventModel.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
    });

    if (!event) {
      return res.status(404).json({ msg: "Evento no encontrado" });
    }

    return res.status(200).json({ data: event });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await EventModel.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({ msg: "Evento no encontrado" });
    }

    return res.status(200).json({ msg: "Evento eliminado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
