import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";

export const eventRouter = Router();

// Ruta para crear un evento
eventRouter.post("/events", createEvent);

// Ruta para traer todos los eventos
eventRouter.get("/events", getAllEvents);

// Ruta para traer un evento por id
eventRouter.get("/events/:id", getEventById);

// Ruta para actualizar un evento
eventRouter.put("/events/:id", updateEvent);

// Ruta para eliminar un evento
eventRouter.delete("/events/:id", deleteEvent);
