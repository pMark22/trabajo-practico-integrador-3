import { Router } from "express";

import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ownerOrAdminMiddleware } from "../middlewares/owner-or-admin.middleware.js";

import {
  createEventValidation,
  updateEventValidation,
  eventIdValidation,
} from "../middlewares/validations/event.validation.js";

import { validateRequest } from "../middlewares/validate.middleware.js";

export const eventRouter = Router();

// Crear un evento (requiere autenticación).
eventRouter.post(
  "/events",
  authMiddleware,
  createEventValidation,
  validateRequest,
  createEvent,
);

// Consultar todos los eventos (público).
eventRouter.get("/events", getAllEvents);

// Consultar un evento por ID (público).
eventRouter.get(
  "/events/:id",
  eventIdValidation,
  validateRequest,
  getEventById,
);

// Modificar un evento (organizador o administrador).
eventRouter.put(
  "/events/:id",
  authMiddleware,
  updateEventValidation,
  validateRequest,
  ownerOrAdminMiddleware,
  updateEvent,
);

// Eliminar un evento (organizador o administrador).
eventRouter.delete(
  "/events/:id",
  authMiddleware,
  eventIdValidation,
  validateRequest,
  ownerOrAdminMiddleware,
  deleteEvent,
);
