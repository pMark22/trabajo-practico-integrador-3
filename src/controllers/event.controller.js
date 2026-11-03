import EventModel from "../models/event.model.js";
import { CategoryModel } from "../models/category.model.js";

// Crear un evento
export const createEvent = async (req, res) => {
  try {
    const { categories, ...eventData } = req.body;

    // Verificar que las categorias existan
    if (categories && categories.length > 0) {
      const existingCategories = await CategoryModel.find({
        _id: { $in: categories },
      });

      if (existingCategories.length !== categories.length) {
        return res.status(400).json({
          msg: "Una o mas categorias no existen",
        });
      }
    }

    const event = await EventModel.create({
      ...eventData,
      categories: categories || [],
      organizer: req.user._id,
    });

    return res.status(201).json({
      msg: "Evento creado correctamente",
      data: event,
    });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return res.status(409).json({
        msg: "Ya existe un evento con ese titulo",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        msg: "Los datos del evento no son validos",
        errors: error.message,
      });
    }

    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

// Obtener todos los eventos
export const getAllEvents = async (req, res) => {
  try {
    const events = await EventModel.find()
      .populate("organizer", "username email")
      .populate("categories", "name");

    return res.status(200).json({
      data: events,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

// Obtener un evento por ID
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await EventModel.findById(id)
      .populate("organizer", "username email")
      .populate("categories", "name");

    if (!event) {
      return res.status(404).json({
        msg: "Evento no encontrado",
      });
    }

    return res.status(200).json({
      data: event,
    });
  } catch (error) {
    console.log(error);

    if (error.name === "CastError") {
      return res.status(400).json({
        msg: "El ID del evento no es valido",
      });
    }

    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

// Actualizar un evento
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { categories, organizer, ...eventData } = req.body;

    // Verificar que las categorias existan
    if (categories && categories.length > 0) {
      const existingCategories = await CategoryModel.find({
        _id: { $in: categories },
      });

      if (existingCategories.length !== categories.length) {
        return res.status(400).json({
          msg: "Una o mas categorias no existen",
        });
      }
    }

    const updateData = { ...eventData };

    if (categories !== undefined) {
      updateData.categories = categories;
    }

    const event = await EventModel.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!event) {
      return res.status(404).json({
        msg: "Evento no encontrado",
      });
    }

    return res.status(200).json({
      msg: "Evento actualizado correctamente",
      data: event,
    });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return res.status(409).json({
        msg: "Ya existe un evento con ese titulo",
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        msg: "El ID del evento no es valido",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        msg: "Los datos del evento no son validos",
        errors: error.message,
      });
    }

    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

// Eliminar un evento
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await EventModel.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({
        msg: "Evento no encontrado",
      });
    }

    return res.status(200).json({
      msg: "Evento eliminado correctamente",
    });
  } catch (error) {
    console.log(error);

    if (error.name === "CastError") {
      return res.status(400).json({
        msg: "El ID del evento no es valido",
      });
    }

    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};
