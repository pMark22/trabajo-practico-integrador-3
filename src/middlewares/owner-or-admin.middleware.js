import EventModel from "../models/event.model.js";

// Comprueba si el usuario es el organizador del evento o administrador.
export const ownerOrAdminMiddleware = async (req, res, next) => {
  try {
    // Buscamos el evento mediante el ID recibido en la ruta.
    const event = await EventModel.findById(req.params.id);

    // Si el evento no existe, devolvemos un error.
    if (!event) {
      return res.status(404).json({
        msg: "Evento no encontrado",
      });
    }

    // Comprobamos si el usuario es administrador.
    const isAdmin = req.user.role === "admin";

    // Comprobamos si el usuario es el organizador del evento.
    const isOwner = event.organizer.toString() === req.user._id.toString();

    // Si no cumple ninguna de las dos condiciones, denegamos el acceso.
    if (!isAdmin && !isOwner) {
      return res.status(403).json({
        msg: "No tienes permisos para modificar este evento",
      });
    }

    // Guardamos el evento para poder utilizarlo después.
    req.event = event;

    next();
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error al comprobar los permisos del evento",
    });
  }
};
