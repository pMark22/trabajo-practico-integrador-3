import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

export const userRouter = Router();

// Ruta para traer todos los usuarios
userRouter.get("/users", getAllUsers);

// Ruta para traer un usuario por ID
userRouter.get("/users/:id", getUserById);

// Ruta para actualizar un usuario
userRouter.put("/users/:id", updateUser);

// Ruta para eliminar un usuario
userRouter.delete("/users/:id", deleteUser);
