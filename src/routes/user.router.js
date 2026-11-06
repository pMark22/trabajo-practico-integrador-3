import { Router } from "express";

import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

import {
  userIdValidation,
  updateUserValidation,
} from "../middlewares/validations/user.validation.js";

import { validateRequest } from "../middlewares/validate.middleware.js";

export const userRouter = Router();

// Consultar todos los usuarios (solo administradores).
userRouter.get("/users", authMiddleware, adminMiddleware, getAllUsers);

// Consultar un usuario por ID (solo administradores).
userRouter.get(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  userIdValidation,
  validateRequest,
  getUserById,
);

// Actualizar un usuario (solo administradores).
userRouter.put(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  updateUserValidation,
  validateRequest,
  updateUser,
);

// Eliminar un usuario (solo administradores).
userRouter.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  userIdValidation,
  validateRequest,
  deleteUser,
);
