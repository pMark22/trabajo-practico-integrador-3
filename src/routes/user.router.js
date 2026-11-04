import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import {
  userIdValidation,
  updateUserValidation,
} from "../middlewares/validations/user.validation.js";
import { validateRequest } from "../middlewares/validate.middleware.js";

export const userRouter = Router();

// Ruta para traer todos los usuarios
userRouter.get("/users", getAllUsers);

// Ruta para traer un usuario por ID
userRouter.get("/users/:id", userIdValidation, validateRequest, getUserById);

// Ruta para actualizar un usuario
userRouter.put("/users/:id", updateUserValidation, validateRequest, updateUser);

// Ruta para eliminar un usuario
userRouter.delete("/users/:id", userIdValidation, validateRequest, deleteUser);
